'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamSchema=new Schema({
  name: {type: String, required: true},
  types: {type: Array, required: true},
  id: {type: String, required: true},
  img: {type: String, required: true}
})

const TeamModel=mongoose.model('Team', teamSchema);

module.exports = TeamModel;
