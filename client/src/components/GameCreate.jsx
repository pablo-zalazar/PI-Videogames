import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { postGame, getGenres } from "../actions/index";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  }
  if (!input.description) {
    errors.description = "Description is required";
  }
  if (input.rating < 0 || input.rating > 5) {
    errors.rating = "rating must be a number between 0 and 5";
  }

  return errors;
}

export default function GameCreate() {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);
  const history = useHistory();

  const [errors, setErrors] = useState({});
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
    // console.log(input);
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
      genres: input.genres.filter((g) => g !== el.target.innerText),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
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
      <Link to="/videogames">
        <button>return</button>
      </Link>
      <h1>Create Game</h1>
      <p>* Requires fields</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name* </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <label>Description* </label>
          <textarea
            value={input.description}
            name="description"
            cols="30"
            rows="5"
            onChange={(e) => handleChange(e)}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>
        <div>
          <label>Image (url) </label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Released </label>
          <input
            type="text"
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Rating (0-5) </label>
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
          <label>Platforms (ps4 ps5 etc) </label>
          <input
            type="text"
            value={input.platforms}
            name="platforms"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Genres </label>
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
              {g}
              <button onClick={(g) => handleDelete(g)}>X</button>
            </li>
          ))}
        </ul>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
