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
app.use("/api/animes", animeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
