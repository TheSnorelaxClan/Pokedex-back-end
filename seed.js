'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const Pokemon = require('./models/pokemon');

async function seed() {
  await Pokemon.create({
    name: 'Venusaur-EX',
    type: 'Grass',
    id: 'xy1-1',
    img: 'https://images.pokemontcg.io/xy1/1_hires.png'
  });

  await Pokemon.create({
    name: 'Charizard',
    type: 'Fire',
    id: 'swsh4-25',
    img: 'https://images.pokemontcg.io/swsh4/25_hires.png'
  });

  mongoose.disconnect();
}

seed();