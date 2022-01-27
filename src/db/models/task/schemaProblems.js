const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addProblemsSchema = new Schema({
  name: {type: String},
  doctor: {type: String},
  date: { type: Date},
  problem: {type: String}
})

module.exports = mongoose.model("problems", addProblemsSchema);



