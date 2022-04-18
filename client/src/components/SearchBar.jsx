import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameGame } from "../actions";

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
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => handlerInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
