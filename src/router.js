const express = require("express");
const router = express.Router();
const controller = require("./controllers/controller");

router.get("/", controller.getRandomPokemons);
router.get("/search/:name", controller.getPokemonByName);
router.get("/updatepokemon/:id", controller.updateCaptured);

router.param("name", (req, res, next, name) => {
  req.searchQuery = name;
  next();
});
router.param("id", (req, res, next, id) => {
  req.id = id;
  next();
});

module.exports = router;
