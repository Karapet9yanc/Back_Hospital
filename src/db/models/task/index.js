const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authorizationSchema = new Schema({
  login: {type: String},
  password: {type: String}
});

module.exports = mongoose.model("user", authorizationSchema);




