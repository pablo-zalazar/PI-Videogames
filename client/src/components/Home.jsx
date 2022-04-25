import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGames,
  getGenres,
  getPlatforms,
  setCurrentPage,
  filterBySource,
  filterByGenre,
  order,
} from "../actions";

import Cards from "./Cards";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";

import s from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  const allGenres = useSelector((state) => state.genres);
  const allPlatforms = useSelector((state) => state.platforms);
  const [orden, setOrden] = useState("");

  useEffect(async () => {
    dispatch(getGenres());
    await dispatch(getGames());
    dispatch(getPlatforms());
  }, []);

  function handleFilterSource(e) {
    e.preventDefault();
    dispatch(filterBySource(e.target.value));
    dispatch(setCurrentPage(1));
  }

  function handleFilterGenre(e) {
    e.preventDefault();
    dispatch(filterByGenre(e.target.value));
    dispatch(setCurrentPage(1));
  }

  function handleSortName(e) {
    e.preventDefault();
    dispatch(order(["name", e.target.value]));
    dispatch(setCurrentPage(1));
    setOrden(`Order by name: ${e.target.value}`);
  }

  function handleSortRating(e) {
    e.preventDefault();
    dispatch(order(["rating", e.target.value]));
    dispatch(setCurrentPage(1));
    setOrden(`Order by rating: ${e.target.value}`);
  }

  return (
    <div>
      <NavBar />
      <div className={s.main}>
        <div className={s.order_filter_search}>
          <div className={s.filter}>
            <h2>FILTER</h2>
            <div>
              <p>Genre</p>
              <select onChange={(e) => handleFilterGenre(e)}>
                <option value="all">All</option>
                {allGenres?.map((g) => (
                  <option value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <p>Platforms</p>
              <select onChange={(e) => handleFilterSource(e)} defaultValue="-">
                <option disabled>-</option>
                <option value="all">All</option>
                {allPlatforms?.map((p) => (
                  <option value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <p>Source</p>
              <select onChange={(e) => handleFilterSource(e)} defaultValue="-">
                <option disabled>-</option>
                <option value="all">All</option>
                <option value="api">API</option>
                <option value="created">CREATED</option>
              </select>
            </div>
          </div>

          <div className={s.order}>
            <h2>ORDER</h2>
            <div>
              <p>Order by name</p>
              <select onChange={(e) => handleSortName(e)} defaultValue="-">
                <option disabled>-</option>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
            </div>

            <div>
              <p>Order by rating</p>
              <select onChange={(e) => handleSortRating(e)} defaultValue="-">
                <option disabled>-</option>
                <option value="asc">Asc</option>
                <option value="desc">Des</option>
              </select>
            </div>
            {<p>{orden}</p>}
          </div>

          <div className={s.search}>
            <h2>SEARCH</h2>
            <SearchBar />
          </div>
        </div>

        <div className={s.gameList}>
          <Cards />
        </div>
      </div>
    </div>
  );
}
