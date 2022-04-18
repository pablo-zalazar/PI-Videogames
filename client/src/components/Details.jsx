import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";

export default function Details(props) {
  //   console.log(props);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetails(props.match.params.id));
  }, [dispatch]);

  const myGame = useSelector((state) => state.detail);

  return (
    <div>
      <Link to="/videogames">
        <button>Return</button>
      </Link>
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
          <p>{myGame.released}</p>
          <p>{myGame.rating}</p>
          <p>{myGame.platforms}</p>
          <p>{myGame.genres}</p>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
