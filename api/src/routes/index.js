const { Router } = require("express");
const router = Router();

// import routes y accede con /videogames
var videogamesRoutes = require("./videogames.js");
var genresRoutes = require("./Genre.js");

router.use("/videogames", videogamesRoutes);
router.use("/genres", genresRoutes);

module.exports = router;
