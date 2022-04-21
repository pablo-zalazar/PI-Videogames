import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { postGame, getGenres } from "../actions/index";

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

  return errors;
}

function disabledSubmit(errors) {
  if (Object.keys(errors).length > 0) return true;
  return false;
}

export default function GameCreate() {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);
  const history = useHistory();

  const [errors, setErrors] = useState({
    name: "Name is required",
    description: "Description is required",
  });

  const [inputDisabled, setInputDisabled] = useState(true);

  const [input, setInput] = useState({
    name: "",
    description: "",
    image: "",
    released: "",
    rating: 0,
    platforms: "",
    genres: [],
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
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  }

  function handleDelete(el) {
    setInput({
      ...input,
      genres: input.genres.filter((g) => g !== el.target.name),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    input.name =
      input.name.charAt(0).toUpperCase() +
      input.name.toLocaleLowerCase().slice(1);
    input.platforms = input.platforms.split(" ");
    dispatch(postGame(input));
    alert("Game Created");
    setInput({
      name: "",
      description: "",
      image: "",
      released: "",
      rating: 0,
      platforms: "",
      genres: [],
    });
    history.push("/videogames");
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
              type="text"
              value={input.released}
              name="released"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <p>Rating (0-5) </p>
            <input
              type="number"
              step={0.01}
              value={input.rating}
              name="rating"
              min="0"
              max="5"
              onChange={(e) => handleChange(e)}
            />
            {errors.rating && <p className="error">{errors.rating}</p>}
          </div>
          <div>
            <p>Platforms (ps4 ps5 etc) </p>
            <input
              type="text"
              value={input.platforms}
              name="platforms"
              onChange={(e) => handleChange(e)}
            />
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
