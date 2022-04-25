import axios from "axios";

export function getGenres() {
  return async function (dispatch) {
    try {
      console.log("a");
      let json = await axios.get("http://localhost:3001/genres");
      return dispatch({
        type: "GET_GENRES",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getGames() {
  return async function (dispatch) {
    try {
      console.log("b");
      let json = await axios.get("http://localhost:3001/videogames");
      return dispatch({
        type: "GET_GAMES",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getPlatforms() {
  console.log("c");
  return {
    type: "GET_PLATFORMS",
  };
}

export function setCurrentPage(payload) {
  return {
    type: "SET_CURRENT_PAGE",
    payload,
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

export function order(payload) {
  return {
    type: "ORDER",
    payload,
  };
}

export function getNameGame(payload) {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/videogames?name=" + payload)
      .then((json) => json.data)
      .then((json) => dispatch({ type: "GET_NAME_GAMES", payload: json }))
      .catch((e) =>
        dispatch({
          type: "GET_NAME_GAMES",
          payload: ["empty"],
        })
      );
  };

  // return async function (dispatch) {
  //   try {
  //     var json = await axios.get(
  //       "http://localhost:3001/videogames?name=" + payload
  //     );
  //     return dispatch({
  //       type: "GET_NAME_GAMES",
  //       payload: json.data,
  //     });
  //   } catch (e) {
  //     // console.log("json");
  //     // console.log(e);
  //     return dispatch({
  //       type: "GET_NAME_GAMES",
  //       payload: ["empty"],
  //     });
  //   }
  // };
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

export function resetDetail() {
  return {
    type: "RESET_DETAIL",
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

export function deleteGame(payload) {
  return async function () {
    try {
      const response = await axios.delete(
        "http://localhost:3001/videogames/delete/" + payload
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  };
}

export function updateGame(payload) {
  return async function () {
    try {
      const response = await axios.put(
        "http://localhost:3001/videogames/update",
        payload
      );
      return response;
    } catch (e) {
      console.log(e);
    }
  };
}
