'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const Team = require('./models/team');

async function seed() {
  await Team.create({
    name: 'Charmander',
    types: ['Fire'],
    id: 'det1-4',
    img: 'https://images.pokemontcg.io/det1/4_hires.png'
  });

  await Team.create({
    name: 'Squirtle',
    types: ['Water'],
    id: 'bw10-14',
    img: 'https://images.pokemontcg.io/bw10/14_hires.png'
  });

  await Team.create({
    name: 'Bulbasaur',
    types: ['Grass'],
    id: 'det1-1',
    img: 'https://images.pokemontcg.io/det1/1_hires.png'
  });

  await Team.create({
    name: 'Pidgey',
    types: ['Colorless'],
    id: 'pop4-12',
    img: 'https://images.pokemontcg.io/pop4/12_hires.png'
  });

  await Team.create({
    name: 'Caterpie',
    types: ['Grass'],
    id: 'mcd19-1',
    img: 'https://images.pokemontcg.io/mcd19/1_hires.png'
  });

  await Team.create({
    name: 'Pikachu',
    types: ['Lightning'],
    id: 'basep-1',
    img: 'https://images.pokemontcg.io/basep/1_hires.png'
  });

  mongoose.disconnect();
}

seed();