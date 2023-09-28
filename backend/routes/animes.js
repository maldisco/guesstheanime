const express = require("express");
const Anime = require("../models/anime");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/", (req, res, next) => {
  Anime.find().then(
    (data) => {
      res.status(200).json(data);
    },
    (err) => {
      res.json({ message: err.message });
    }
  );
});

router.get("/nomes", (req, res, next) => {
  Anime.find().then(
    (data) => {
      var nomes = [];
      var upperCasedCleanNomes = []
      data.forEach(element => {
        const cleanNome = element.nome.replace(/[^a-zA-Z ]/g, "").trim()

        if(! upperCasedCleanNomes.includes(cleanNome.toUpperCase())){
          upperCasedCleanNomes.push(cleanNome.toUpperCase())
          nomes.push(element.nome)
        }
        
        const cleanNome2 = element.nome2.replace(/[^a-zA-Z ]/g, "").trim()
        if(! upperCasedCleanNomes.includes(cleanNome2.toUpperCase()) && element.nome2){
          upperCasedCleanNomes.push(cleanNome2.toUpperCase())
          nomes.push(element.nome2)
        }
      });
      res.status(200).json(nomes);
    },
    (err) => {
      res.json({ message: err.message });
    }
  );
});

router.post("/aleatorio", (req, res, next) => {
  const excludedIds = req.body.excludedIds || [];
  const excludedObjIds = excludedIds.map((id) => {
    return new mongoose.Types.ObjectId(id);
  });
  /* return a random anime */
  Anime.aggregate([
    {
      $match: {
        _id: { $nin: excludedObjIds },
      },
    },
    { $sample: { size: 1 } },
  ]).then(
    (data) => {
      res.status(200).json(data[0]);
    },
    (err) => {
      res.json({ message: err.message });
    }
  );
});

router.get("/:id", (req, res, next) => {
  Anime.find({ _id: req.params.id }).then(
    (record) => {
      res
        .status(200)
        .json({ message: "Anime retornado com sucesso.", anime: record });
    },
    (err) => {
      res.json({ message: err.message });
    }
  );
});

module.exports = router;
