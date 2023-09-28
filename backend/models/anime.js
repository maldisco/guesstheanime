const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const animeSchema = mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  nome2: { type: String },
  desc: { type: String, required: true },
  studio: { type: String },
  generos: [{ type: String }],
  ano: { type: String },
  episodios: { type: Number },
  score: {
    Filipe: { type: String, default: '-' },
    Tuzzin: { type: String, default: '-' },
    Taboada: { type: String, default: '-' }
  },
  popularidade: { type: String },
  tags: [{ type: String }],
  resumo: { type: String },
  capa: { type: String },
});

animeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Anime", animeSchema);
