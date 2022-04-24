const { Router } = require("express");
const router = Router();

const axios = require("axios");
const { Genre } = require("../db");
const { APIKEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getGenres = async () => {
  // return await Genre.findAll({});
  let allGenres = Genre.findAll({ attributes: ["name"] });
  if (!allGenres.length) {
    apiResult = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`);
    allGenres = apiResult.data.results.map((g) => {
      Genre.findOrCreate({
        where: {
          name: g.name,
        },
      });
      return g.name;
    });
  }
  return allGenres;
};

router.get("/", async (req, res) => {
  const allGenres = await getGenres();
  res.json(allGenres);
});

module.exports = router;
