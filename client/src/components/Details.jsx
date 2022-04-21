import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";

import NavBar from "./NavBar";

import s from "./Details.module.css";

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
        <div className={s.main}>
          <div className={s.page}>
            <img src={myGame.image} alt="not found" className={s.image} />

            <div className={s.info}>
              <h2 className={s.name}>{myGame.name}</h2>
              <p>released: {myGame.released}</p>
              <p>Rating {myGame.rating}</p>
            </div>

            <div className={s.description}>
              <p>{myGame.description}</p>
            </div>

            <fieldset className={s.platforms}>
              <legend>platforms</legend>
              <ul>
                {myGame.platforms.map((g) => (
                  <li>-{g}</li>
                ))}
              </ul>
            </fieldset>

            <fieldset className={s.genres}>
              <legend>Genres</legend>
              <ul>
                {myGame.genres.map((g) => (
                  <li>-{g}</li>
                ))}
              </ul>
            </fieldset>
          </div>
        </div>
      ) : null}
    </div>
  );
}
