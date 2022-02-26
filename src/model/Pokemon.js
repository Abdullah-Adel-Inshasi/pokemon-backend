const Pokemon = function (
  id,
  name,
  types,
  hp,
  attack,
  defence,
  spAttack,
  spDefence,
  speed,
  moves,
  image,
  isCaptured
) {
  this.id = id;
  this.name = name;
  this.types = types;
  this.Stats = {
    'HP' : hp,
    'Attack' :attack,
    'Defence' : defence,
    'Sp. Attack' : spAttack,
    'Sp. Defence' : spDefence,
    'Speed' : speed,
  }
  this.moves = moves;
  this.image = image;
  this.isCaptured = isCaptured;
};



module.exports = Pokemon;

