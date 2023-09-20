const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const path = require("path");
const { fileUrlToPath } = require("url");

const animeRoutes = require("./routes/animes");
const authRoutes = require("./routes/auth");
const usuarioRoutes = require("./routes/usuarios");

const app = express();
const port = 3001;

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

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

app.use("/api/animes", animeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
