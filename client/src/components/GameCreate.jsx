import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  postGame,
  getGenres,
  getPlatforms,
  setFirstMount,
} from "../actions/index";

import NavBar from "./NavBar";

import s from "./GameCreate.module.css";

export default function GameCreate() {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);
  const allPlatforms = useSelector((state) => state.platforms);
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
    platforms: [],
    genres: [],
  });

  // useEffect(() => {
  //   dispatch(getGenres());
  //   dispatch(getPlatforms());
  // }, [dispatch]);

  useEffect(() => {
    const rename = /^[0-9a-zA-ZÁ-ÿ/.:-\s]{0,40}$/;
    const redescription = /^[0-9a-zA-ZÁ-ÿ/.:-\s]{0,300}$/;
    let errors = {};
    if (!input.name) errors.name = "Name is required";
    else if (!rename.exec(input.name)) {
      input.name.length > 40
        ? (errors.name = "Invalid Length")
        : (errors.name = "Invalid Characters");
    } else errors.name = "";

    if (!input.description) errors.description = "Description is required";
    else if (!redescription.exec(input.description)) {
      input.description.length > 300
        ? (errors.description = "Invalid Length")
        : (errors.description = "Invalid Characters");
    } else errors.description = "";

    if (input.platforms.length === 0)
      errors.platforms = "Platforms is required";
    else errors.platforms = "";

    errors.name === "" && errors.description === "" && errors.platforms === ""
      ? setInputDisabled(false)
      : setInputDisabled(true);

    setErrors(errors);
  }, [input.name, input.description, input.platforms]);

  // function validate() {
  //   let errors = {};
  //   if (!input.name) errors.name = "Name is required";
  //   else if (!re.exec(input.name)) errors.name = "Invalid Characters";
  //   else errors.name = "";

  //   if (!input.description) errors.description = "Description is required";
  //   else if (!re.exec(input.description))
  //     errors.description = "Invalid Characters";
  //   else errors.description = "";

  //   if (input.platforms.length === 0)
  //     errors.platforms = "Platforms is required";
  //   else errors.platforms = "";

  //   errors.name === "" && errors.description === "" && errors.platforms === ""
  //     ? setInputDisabled(false)
  //     : setInputDisabled(true);

  //   setErrors(errors);
  // }

  function validateRating() {
    if (Number(input.rating) || input.rating === "") {
      if (input.rating.length <= 4) {
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
    if (!Number(date[1]) || date[1] < 1 || date[1] > 12) {
      setReleasedError("Invalid Date");
      return 0;
    }
    if (!Number(date[2]) || date[2] < 1 || date[2] > 31) {
      setReleasedError("Invalid Date");
      return 0;
    }
    setReleasedError("");
    return 1;
  }

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelectPlatform(e) {
    e.preventDefault();
    if (input.platforms.indexOf(e.target.value) === -1) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      });
    }
  }

  function handleDeletePlatform(e) {
    e.preventDefault();
    setInput({
      ...input,
      platforms: input.platforms.filter((g) => g !== e.target.name),
    });
  }

  function handleSelectGenre(e) {
    e.preventDefault();
    if (input.genres.indexOf(e.target.value) === -1) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });
    }
  }

  function handleDeleteGenre(e) {
    e.preventDefault();
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== e.target.name),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const r = validateRating();
    const d = validateReleased();
    if (r && d) {
      dispatch(setFirstMount(true));
      dispatch(
        postGame({
          ...input,
          // name: input.name.charAt(0).toUpperCase() + input.name.slice(1),
          rating: input.rating === "" ? 0 : input.rating,
        })
      );
      alert("Game Created");
      // setInput({
      //   name: "",
      //   description: "",
      //   image: "",
      //   released: "2000-01-01",
      //   rating: "",
      //   platforms: [],
      //   genres: [],
      // });
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
            <p>Name* (max 40 characters)</p>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <span className={s.error}>{errors.name}</span>}
          </div>
          <div>
            <p>Description* (max 300 characters)</p>
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
            <p>Platforms* </p>
            <select onChange={(e) => handleSelectPlatform(e)}>
              <option selected disabled hidden>
                select platform
              </option>
              {allPlatforms?.map((g, i) => (
                <option key={i} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.platforms && (
              <span className={s.error}>{errors.platforms}</span>
            )}
          </div>

          <ul>
            {input.platforms.map((g, i) => (
              <li key={i}>
                <button
                  type="button"
                  name={g}
                  onClick={(g) => handleDeletePlatform(g)}
                >
                  X
                </button>
                <p>{g}</p>
              </li>
            ))}
          </ul>

          <div>
            <p>Genres </p>
            <select onChange={(e) => handleSelectGenre(e)}>
              <option selected disabled hidden>
                select genres
              </option>
              {allGenres?.map((g, i) => (
                <option key={i} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <ul>
            {input.genres.map((g, i) => (
              <li key={i}>
                <button
                  type="button"
                  name={g}
                  onClick={(g) => handleDeleteGenre(g)}
                >
                  X
                </button>
                <p>{g}</p>
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
