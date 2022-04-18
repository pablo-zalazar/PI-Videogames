import axios from "axios";

export function getGenres() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
}

export function getGames() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_GAMES",
      payload: json.data,
    });
  };
}

export function filterBySource(payload) {
  return {
    type: "GET_GAMES_SOURCE",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}
