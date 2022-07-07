'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Pokemon, pokemon, types } = require('./models/pokemon');
const Team = require('./models/team');


mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Mongoose is connected!');
});

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/',(req,res)=>{
  res.status(200).send('Welcome!');
})

app.get('/pokemon', getPokemon);
app.get('/team', getTeam);
app.post('/pokemon', postPokemon);
app.put('/pokemon/:id', putPokemon);
app.delete('/pokemon/:id', deletePokemon);
app.get('/getname/:name', getByName);
app.get('/gettype/:type', getByType);

async function getPokemon(req,res,next){
  try{
    let results=await Pokemon.find();
    res.status(200).send(results);
  }catch(error){
    next(error);
  }
}

async function getTeam(req,res,next){
  try{
    let results=await Team.find();
    res.status(200).send(results);
  }catch(error){
    next(error);
  }
}

async function postPokemon(req, res, next){
  try{
    let createdPokemon = await Pokemon.create(req.body);
    res.status(200).send(createdPokemon);
  } catch(error){
    next(error);
  }
}

async function putPokemon(req,res,next){
  let id=req.params.id;
  try{
    let data = req.body;
    let updatedPokemon = await Team.findByIdAndUpdate(id, data, { new: true, overwrite: true });
    res.status(200).send(updatedPokemon);
  }catch(error){
    next(error);
  }
}

async function deletePokemon(req,res,next){
  let id=req.params.id;
  try{
    await Pokemon.findByIdAndDelete(id);
    res.status(200).send('pokemon deleted');
  }catch(error){
    next(error);
  }
}

function getByName(req, res) {
  let name = req.params.name;
  pokemon(name)
    .then(summaries => res.send(summaries))
    .catch((error) => {
      console.error(error);
      res.status(500).send('Sorry. Can\'t find that pokemon!');
    });
}

function getByType(req, res) {
  let type = req.params.type;
  types(type)
    .then(summaries => res.send(summaries))
    .catch((error) => {
      console.error(error);
      res.status(500).send('Sorry, trouble finding that type!');
    });
}

app.get('*',(req,res)=>{
  res.status(404).send('Not available');
})

app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
