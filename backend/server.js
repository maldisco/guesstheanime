const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const path = require("path");
const { fileUrlToPath } = require("url");

const fs = require("fs");
const Anime = require("./models/anime"); // Replace with the actual path to your Anime model

const animeRoutes = require("./routes/animes");

const app = express();

dotenv.config();

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed.");
  });

/* const jsonFilePath = "animelistWebgados.json"; // Replace with the actual path to your JSON file

fs.readFile(jsonFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading JSON file: " + err);
    return;
  }

  const animeData = JSON.parse(data);

  // Assuming animeData is an array of anime objects, you can insert them all at once using insertMany
  Anime.insertMany(animeData);
}); */

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

function normalizeAndClean(str) {
  if (!str) return null;
  const normalized = str
    .replace(/[^a-zA-Z ]/g, "")
    .trim()
    .toLowerCase();
  // Replace "x" with " ", and remove multiple spaces
  return normalized.replace(/x/g, " ").replace(/ +/g, "");
}

app.get("/api/animes/nomes", (req, res, next) => {
  Anime.find().then(
    (data) => {
      var nomes = [];
      var uniqueNames = new Set(); // Use a Set to ensure uniqueness

      data.forEach((element) => {
        const cleanNome1 = normalizeAndClean(element.nome);
        const cleanNome2 = element.nome2
          ? normalizeAndClean(element.nome2)
          : null;

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

app.post("/api/animes/aleatorio", (req, res, next) => {
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

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
