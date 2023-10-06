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

function normalizeAndClean(str) {
  if (!str) return null;
  const normalized = str.replace(/[^a-zA-Z ]/g, "").trim().toLowerCase();
  // Replace "x" with " ", and remove multiple spaces
  return normalized.replace(/x/g, " ").replace(/ +/g, "");
}

router.get("/nomes", (req, res, next) => {
  Anime.find().then(
    (data) => {
      var nomes = [];
      var uniqueNames = new Set(); // Use a Set to ensure uniqueness
      
      data.forEach(element => {
        const cleanNome1 = normalizeAndClean(element.nome);
        const cleanNome2 = element.nome2 ? normalizeAndClean(element.nome2) : null;

        // Add cleanNome1 if it's unique
        if (cleanNome1 && !uniqueNames.has(cleanNome1)) {
          uniqueNames.add(cleanNome1);
          nomes.push(element.nome);
        }

        // Add cleanNome2 if it's unique
        if (cleanNome2 && !uniqueNames.has(cleanNome2)) {
          uniqueNames.add(cleanNome2);
          nomes.push(element.nome2);
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
