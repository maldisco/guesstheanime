const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const animeSchema = mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  studios: [{ type: String }],
  generos: [{ type: String }],
  ano: { type: Number },
  episodios: { type: Number },
  score: { type: Number },
  popularidade: { type: Number },
  tags: [{ type: String }],
  personagens: [{ type: String }],
  resumo: { type: String },
  capa: { type: String },
});

animeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Anime", animeSchema);
