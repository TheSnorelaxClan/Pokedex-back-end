'use strict';

const mongoose = require('mongoose');
const axios=require('axios');
let cache = require('./cache.js');

const { Schema } = mongoose;

const pokemonSchema=new Schema({
  name: {type: String, required: true},
  types: {type: Array, required: true},
  id: {type: String, required: true},
  img: {type: String, required: true}
})

const PokemonModel=mongoose.model('Pokemon', pokemonSchema);

async function getByName(name) {
  let objName = name;
  const key = 'pokemon: ' + objName;
  const url = `https://api.pokemontcg.io/v2/cards?X-Api-Key=${process.env.Pokemon_API_Key}&q=name:${objName}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 3600000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url)
      .then(response => parseResults(response.data));
  }
  return cache[key].data;
}

async function getByType(types) {
  let objTypes = types;
  const key = 'type: ' + objTypes;
  const url = `https://api.pokemontcg.io/v2/cards?X-Api-Key=${process.env.Pokemon_API_Key}&q=types:${objTypes}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 3600000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url)
      .then(response => parseResults(response.data));
  }
  return cache[key].data;
}

function parseResults(pokeData) {
  try {
    const pokeSummaries = pokeData.data.map(obj => {
      return new Pokemon(obj);
    });
    return Promise.resolve(pokeSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Pokemon {
  constructor(pokemon) {
    this.name = pokemon.name;
    this.types = pokemon.types;
    this.id = pokemon.id;
    this.img = pokemon.images.large;
  }
}

exports.Pokemon = PokemonModel;
exports.pokemon = getByName;
exports.types = getByType;