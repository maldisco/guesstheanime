const express = require("express");
const Anime = require("../models/anime");

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
      const nomes = data.map((anime) => anime.nome);
      res.status(200).json(nomes);
    },
    (err) => {
      res.json({ message: err.message });
    }
  );
});

router.post("/aleatorio", (req, res, next) => {
  const excludedIds = req.body.excludedIds || [];

  /* return a random anime */
  Anime.aggregate([
    {
      $match: {
        _id: { $nin: excludedIds },
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
