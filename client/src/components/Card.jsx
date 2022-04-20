import React from "react";

import s from "./Card.module.css";

export default function Card({ name, image, genres }) {
  return (
    <div className={s.card}>
      <img src={image} alt="not found" width="250px" height="125px" />
      <h3>{name}</h3>
      <p>{genres.join(", ")}</p>
    </div>
  );
}
