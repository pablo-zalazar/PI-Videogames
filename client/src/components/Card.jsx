import React from "react";

export default function Card({ name, image, genres }) {
  return (
    <div>
      <img src={image} alt="not found" width="250px" height="125px" />
      <h2>{name}</h2>
      <h3>{genres.join(", ")}</h3>
    </div>
  );
}
