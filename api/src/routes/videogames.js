var express = require("express");
var router = express.Router();

const axios = require("axios");
const { Videogame, Genre } = require("../db");

const { APIKEY } = process.env;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getAllApiGames = async () => {
  let games = [];
  for (let i = 1; i < 6; i++) {
    const pages = await axios.get(
      `https://api.rawg.io/api/games?key=${APIKEY}&page=${i}`
    );
    const pageGames = await pages.data.results.map((el) => {
      return {
        id: el.id,
        name: el.name,
        image: el.background_image,
        released: el.released,
        rating: el.rating,
        platforms: el.platforms.map((p) => p.platform.name),
        genres: el.genres.map((g) => g.name),
      };
    });
    games = games.concat(pageGames);
  }
  return games;
};

const getDbGames = async () => {
  let dbGames = await Videogame.findAll({
    // incluye el modelo genre para poder acceder al nombre y id de los distintos generos
    include: {
      model: Genre,
      // trae name y id (automaticamente)
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return dbGames.map((g) => {
    return {
      id: g.id,
      name: g.name,
      description: g.description,
      image: g.image,
      released: g.released,
      rating: g.rating,
      platforms: g.platforms,
      createdInDb: g.createdInDb,
      createdAt: g.createdAt,
      updatedAt: g.updatedAt,
      genres: g.genres.map((el) => el.name),
    };
  });
};

const getAllGames = async () => {
  const apiGames = await getAllApiGames();
  const dbGames = await getDbGames();
  const totalGames = apiGames.concat(dbGames);
  return totalGames;
};

// https://api.rawg.io/api/games/{id}
const getApiGameId = async (id) => {
  const game = await axios.get(
    `https://api.rawg.io/api/games/${id}?key=${APIKEY}`
  );
  return {
    name: game.data.name,
    description: game.data.description,
    image: game.data.background_image,
    released: game.data.released,
    rating: game.data.rating,
    platforms: game.data.platforms.map((p) => p.platform.name),
    genres: game.data.genres.map((p) => p.name),
  };
};

// 5286
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let game;
  if (Number(id)) {
    game = await getApiGameId(id);
  } else {
    game = (await getDbGames()).find((g) => g.id === id);
  }
  game.length !== 0
    ? res.status(200).send(game)
    : res.status(404).send("NOT FOUND");
});

router.get("/", async (req, res) => {
  let games = await getAllGames();
  const name = req.query.name;
  if (name) {
    games = await games.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  games.length
    ? res.status(200).send(games)
    : res.status(404).send("game not found");
});

router.post("/add", async (req, res) => {
  const { name, description, image, released, rating, platforms, genres } =
    req.body;

  let gameCreated = await Videogame.create({
    name,
    description,
    image,
    released,
    rating,
    platforms,
  });

  // busca en el modelo genre todos los que coincidan con los pasados por body
  let genreDb = await Genre.findAll({
    where: { name: genres },
  });

  // addNombreModelo es un metodo de sequelize que trae del modelo (genre) lo que se le pasa
  gameCreated.addGenre(genreDb);

  res.status(200).send("juego creado");
});

module.exports = router;
