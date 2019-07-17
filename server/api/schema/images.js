const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Images = new Schema({
  horizontal: {
    type: String,
    required: true
  },
  vertical: {
    type: String,
    required: true
  },
  hsmall: {
    type: String,
    required: true
  },
  gallery: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: () =>  Date.now()
  }

});


module.exports = mongoose.model("Images", Images);