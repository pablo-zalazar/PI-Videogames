let initialState = {
  genres: [],
  games: [],
  allGames: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };
    case "GET_GAMES":
      return {
        ...state,
        games: action.payload,
        allGames: action.payload,
      };
    case "GET_NAME_GAMES":
      return {
        ...state,
        games: action.payload,
      };
    case "GET_GAMES_SOURCE":
      const sourceFilter =
        action.payload === "api"
          ? state.allGames.filter((g) => !g.createdInDb)
          : state.allGames.filter((g) => g.createdInDb);
      return {
        ...state,
        games: action.payload === "all" ? state.allGames : sourceFilter,
      };
    case "ORDER_BY_NAME":
      let sortedName =
        action.payload === "asc"
          ? state.games.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.games.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        games: sortedName,
      };
    case "ORDER_BY_RATING":
      let sortedRating =
        action.payload === "asc"
          ? state.games.sort(function (a, b) {
              if (a.rating > b.rating) return 1;
              if (a.rating < b.rating) return -1;
              return 0;
            })
          : state.games.sort(function (a, b) {
              if (a.rating > b.rating) return -1;
              if (a.rating < b.rating) return 1;
              return 0;
            });
      return {
        ...state,
        games: sortedRating,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    case "POST_GAME":
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;
