import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { postGame, getGenres } from "../actions/index";

import NavBar from "./NavBar";

import s from "./GameCreate.module.css";

export default function GameCreate() {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);
  const history = useHistory();

  const [errors, setErrors] = useState({
    name: "Name is required",
    description: "Description is required",
    platforms: "Platforms are required",
  });

  const [inputDisabled, setInputDisabled] = useState(true);
  const [ratingError, setRatingError] = useState("");
  const [releasedError, setReleasedError] = useState("");

  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    released: "2000-01-01",
    rating: "",
    platforms: "",
    genres: [],
  });

  const re = /^[0-9a-zA-ZÁ-ÿ/.:-\s]{0,40}$/;

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    setInputDisabled(disabledSubmit(errors));
  }, [errors]);

  function validate(input) {
    let errors = {};
    if (!input.name) errors.name = "Name is required";
    else if (!re.exec(input.name)) errors.name = "Invalid Characters";

    if (!input.description) errors.description = "Description is required";
    else if (!re.exec(input.description))
      errors.description = "Invalid Characters";

    if (!input.platforms) errors.platforms = "Platforms is required";
    else if (!re.exec(input.platforms)) errors.platforms = "Invalid Characters";

    return errors;
  }

  function validateRating() {
    if (Number(input.rating) || input.rating === "") {
      if (input.rating.length < 4) {
        if (input.rating <= 5 && input.rating >= 0) {
          if (input.rating[0] !== ".") {
            setRatingError("");
            return 1;
          }
        }
      }
    }
    setRatingError("Invalid Value");
    return 0;
  }

  function validateReleased() {
    const date = input.released.split("-");
    if (
      date[0].length !== 4 ||
      !Number(date[0]) ||
      date[0] < 1900 ||
      date[0] > 2100
    ) {
      setReleasedError("Invalid Date");
      return 0;
    }
    if (!Number(date[1]) || date[1] < 1 || date[1] > 31) {
      setReleasedError("Invalid Date");
      return 0;
    }
    if (!Number(date[2]) || date[2] < 1 || date[2] > 12) {
      setReleasedError("Invalid Date");
      return 0;
    }
    setReleasedError("");
    return 1;
  }

  function disabledSubmit(errors) {
    if (Object.keys(errors).length > 0) return true;
    return false;
  }

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    e.preventDefault();
    if (input.genres.indexOf(e.target.value) === -1) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    }
  }

  function handleDelete(el) {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== el.target.name),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const r = validateRating();
    const d = validateReleased();
    if (r && d) {
      dispatch(
        postGame({
          ...input,
          platforms: input.platforms.split(" "),
          rating: input.rating === "" ? 0 : input.rating,
        })
      );
      alert("Game Created");
      setInput({
        name: "",
        description: "",
        image: "",
        released: "2000-01-01",
        rating: "",
        platforms: "",
        genres: [],
      });
      history.push("/videogames");
    }
  }

  return (
    <div>
      <NavBar />
      <div className={s.main}>
        <form onSubmit={(e) => handleSubmit(e)} className={s.form}>
          <h1>Create Game</h1>
          <div>
            <p>Name </p>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <span className={s.error}>{errors.name}</span>}
          </div>
          <div>
            <p>Description </p>
            <textarea
              value={input.description}
              name="description"
              cols="30"
              rows="5"
              onChange={(e) => handleChange(e)}
            />
            {errors.description && (
              <span className={s.error}>{errors.description}</span>
            )}
          </div>
          <div>
            <p>Image (url) </p>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <p>Released </p>
            <input
              type="date"
              value={input.released}
              name="released"
              onChange={(e) => handleChange(e)}
            />
            {releasedError !== "" ? (
              <span className={s.error}>{releasedError}</span>
            ) : null}
          </div>
          <div>
            <p>Rating (0-5 two decimals) </p>
            <input
              type="text"
              value={input.rating}
              name="rating"
              onChange={(e) => handleChange(e)}
            />
            {ratingError !== "" ? (
              <span className={s.error}>{ratingError}</span>
            ) : null}
          </div>
          <div>
            <p>Platforms (ps4 ps5 etc) </p>
            <input
              type="text"
              value={input.platforms}
              name="platforms"
              onChange={(e) => handleChange(e)}
            />
            {errors.platforms && (
              <span className={s.error}>{errors.platforms}</span>
            )}
          </div>
          <div>
            <p>Genres </p>
            <select onChange={(e) => handleSelect(e)}>
              <option selected disabled hidden>
                {" "}
                select genres{" "}
              </option>
              {allGenres?.map((g) => (
                <option value={g}>{g}</option>
              ))}
            </select>
          </div>

          <ul>
            {input.genres.map((g) => (
              <li>
                <p>{g}</p>
                <button type="button" name={g} onClick={(g) => handleDelete(g)}>
                  X
                </button>
              </li>
            ))}
          </ul>

          <button disabled={inputDisabled} type="submit" className={s.submit}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
