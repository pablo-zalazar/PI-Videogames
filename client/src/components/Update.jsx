import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getGenres, updateGame } from "../actions/index";

import NavBar from "./NavBar";

import s from "./GameCreate.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  }
  if (!input.description) {
    errors.description = "Description is required";
  }
  if (!input.platforms) {
    errors.platforms = "Platforms is required";
  }

  return errors;
}

function disabledSubmit(errors) {
  if (Object.keys(errors).length > 0) return true;
  return false;
}

export default function GameCreate() {
  const dispatch = useDispatch();
  const history = useHistory();

  const allGenres = useSelector((state) => state.genres);
  const myGame = useSelector((state) => state.detail);

  const [errors, setErrors] = useState({});

  const [inputDisabled, setInputDisabled] = useState(true);
  const [ratingError, setRatingError] = useState("");
  const [input, setInput] = useState({
    name: myGame.name,
    description: myGame.description,
    image: myGame.image,
    released: myGame.released,
    rating: myGame.rating.toString(),
    platforms: myGame.platforms.join(" "),
    genres: myGame.genres,
  });

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    setInputDisabled(disabledSubmit(errors));
  }, [errors]);

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
    // console.log(errors);
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
    if (Number(input.rating) || input.rating === "") {
      if (input.rating.length < 4) {
        if (input.rating <= 5 && input.rating >= 0) {
          if (input.rating[0] !== ".") {
            console.log(input);
            dispatch(
              updateGame({
                ...input,
                id: myGame.id,
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
          } else console.log("1");
        } else console.log("2");
      } else console.log("3");
    } else console.log("4");
    setRatingError("Invalid value");
  }

  return (
    <div>
      {console.log(myGame)}
      <NavBar />
      <div className={s.main}>
        <form onSubmit={(e) => handleSubmit(e)} className={s.form}>
          <h1>Create Update</h1>
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
