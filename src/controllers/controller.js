const fs = require("fs");
const Pokemon = require("../model/Pokemon");

function jsonReader(filePath, cb) {
  fs.readFile(filePath, "utf-8", (err, fileData) => {
    if (err) return cb && cb(err, null);

    try {
      const data = JSON.parse(fileData);
      return cb && cb(null, data);
    } catch (error) {
      return cb && cb(error);
    }
  });
}

exports.getRandomPokemons = (req, res) => {
  jsonReader("./pokemons.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let listOfPokemons = [];
      const random = Math.floor(Math.random() * 800);
      for (let i = random; i < random + 8; i++) {
        listOfPokemons.push(data[i]);
      }
      const pokemons = mapJsonToModel(listOfPokemons)
      res.send(pokemons);
    }
  });
};


exports.getPokemonByName = (req, res) => {
  jsonReader("./pokemons.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const searchResult = data.filter((pokemon) => {
        return pokemon.name.english.includes(req.searchQuery);
      });
      const pokemons = mapJsonToModel(searchResult)
      res.send(pokemons);
    }
  });
};

exports.updateCaptured = (req, res) => {
  jsonReader("./pokemons.json", (err, data) => {
    if (err) {
      console.log(err)
    } else {
      data[req.id].isCaptured = !data[req.id].isCaptured;
      fs.writeFile(
        "./pokemons.json",
        JSON.stringify(data, null, 2),
        (err) => {
          if(err) console.log(err)
        }
      );
      const pokemon = new Pokemon(
        data[req.id].id,
        data[req.id].name.english,
        data[req.id].type,
        data[req.id].base.HP,
        data[req.id].base.Attack,
        data[req.id].base.Defense,
        data[req.id].base["Sp. Attack"],
        data[req.id].base["Sp. Defense"],
        data[req.id].base.speed,
        data[req.id].moves,
        data[req.id].image,
        data[req.id].isCaptured
      );
      res.send(pokemon);
    }
  });
};


function mapJsonToModel(listOfPokemons){
  return listOfPokemons.map((pokemon) => {
    return new Pokemon(
      pokemon.id,
      pokemon.name.english,
      pokemon.type,
      pokemon.base.HP,
      pokemon.base.Attack,
      pokemon.base.Defense,
      pokemon.base["Sp. Attack"],
      pokemon.base["Sp. Defense"],
      pokemon.base.speed,
      pokemon.moves,
      pokemon.image,
      pokemon.isCaptured
    );
  });
}