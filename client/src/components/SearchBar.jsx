import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameGame } from "../actions";

import s from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handlerInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameGame(name));
    setName("");
  }

  return (
    <div className={s.search}>
      <input
        className={s.input}
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => handlerInputChange(e)}
      />
      <button
        className={s.button}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
