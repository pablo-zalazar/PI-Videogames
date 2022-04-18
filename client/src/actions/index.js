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

export function filterByGenre(payload) {
  return {
    type: "GET_GAMES_GENRE",
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

export function getNameGame(payload) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/videogames?name=" + payload
      );
      return dispatch({
        type: "GET_NAME_GAMES",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getDetails(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        "http://localhost:3001/videogames/" + payload
      );
      return dispatch({
        type: "GET_DETAILS",
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function postGame(payload) {
  // console.log(payload);
  return async function () {
    const response = await axios.post(
      "http://localhost:3001/videogames/add",
      payload
    );
    // console.log(response);
    return response;
  };
}
