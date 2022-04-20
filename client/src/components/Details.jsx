import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";

import NavBar from "./NavBar";

export default function Details(props) {
  //   console.log(props);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
  }, [dispatch]);

  const myGame = useSelector((state) => state.detail);

  return (
    <div>
      <NavBar />

      {Object.keys(myGame).length > 0 ? (
        <div>
          <h1>{myGame.name}</h1>
          <img
            src={myGame.image}
            alt="not found"
            width="250px"
            height="125px"
          />
          <p>{myGame.description}</p>
          <p>released: {myGame.released}</p>
          <p>Rating {myGame.rating}</p>
          <p>platforms</p>
          <ul>
            {myGame.platforms.map((g) => (
              <li>{g}</li>
            ))}
          </ul>
          <p>Genres</p>
          <ul>
            {myGame.genres.map((g) => (
              <li>{g}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
