import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGenres,
  getGames,
  filterBySource,
  orderByName,
  orderByRating,
} from "../actions";
import { Link } from "react-router-dom";

import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();

  const allGames = useSelector((state) => state.games);
  const allGenres = useSelector((state) => state.genres);

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(15);
  const [orden, setOrden] = useState("");

  const lastGameIndex = currentPage * gamesPerPage;
  const firstGameIndex = lastGameIndex - gamesPerPage;
  const currentGames = allGames.slice(firstGameIndex, lastGameIndex);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getGames());
    dispatch(getGenres());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getGames());
  }

  function handleFilterSource(e) {
    e.preventDefault();
    dispatch(filterBySource(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterGenre(e) {
    // e.preventDefault();
    // dispatch(filterBySource(e.target.value));
    // setCurrentPage(1);
  }

  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado nombre: ${e.target.value}`);
  }

  function handleSortRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado rating: ${e.target.value}`);
  }

  return (
    <div>
      <Link to="/videogames/add">
        <button>Add Game</button>
      </Link>
      <h1>All Games</h1>
      <button onClick={(e) => handleClick(e)}>Reload</button>
      <div>
        <span>Nombre</span>
        <select onChange={(e) => handleSortName(e)}>
          <option value="asc">Asc</option>
          <option value="desc">Des</option>
        </select>

        <span>Rating</span>
        <select onChange={(e) => handleSortRating(e)}>
          <option value="asc">Asc</option>
          <option value="desc">Des</option>
        </select>

        <select onChange={(e) => handleFilterSource(e)}>
          <option value="all">All</option>
          <option value="api">API</option>
          <option value="created">CREATED</option>
        </select>

        <select onChange={(e) => handleFilterGenre(e)}>
          {allGenres?.map((g) => (
            <option value={g}>{g}</option>
          ))}
        </select>

        <Paginado
          gamesPerPage={gamesPerPage}
          allGames={allGames.length}
          paginado={paginado}
        />

        <div className="GamesList">
          {currentGames?.map((g) => {
            return (
              <Fragment>
                <Link to={"/videogames/" + g.id}>
                  <Card
                    name={g.name}
                    image={g.image}
                    genres={g.genres}
                    key={g.id}
                  />
                </Link>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
