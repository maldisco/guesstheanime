const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const usuario = new Usuario({
        email: req.body.email,
        nome: req.body.name,
        senha: hash,
      });

      usuario.save().then((result) => {
        res.status(201).json(result);
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/login", (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user;
    Usuario.findOne({ email: email })
      .then((usuario) => {
        if (!usuario) {
          throw new Error("E-mail não existe!");
        }

        user = usuario;
        return bcrypt.compare(password, usuario.senha);
      })
      .then((resultado) => {
        if (!resultado) {
          throw new Error("Credenciais inválidas.");
        }

        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id,
          },
          "secret_this_should_be_longer",
          { expiresIn: "24h" }
        );

        res.status(200).json({
          token: token,
          expiresIn: 3600 * 24,
          user: user,
        });
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

  /* let fetchedUser;
  Usuario.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        throw new Error("E-mail doesn't exist!");
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.senha, user.senha);
    })
    .then((result) => {
      if (!result) {
        throw new Error("Wrong password!");
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
        },
        "secret_this_should_be_longer",
        { expiresIn: "24h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600 * 24,
        userId: fetchedUser._id,
      });
    })
    .catch((err) => {
      return res.status(401).json({ message: "Auth failed" });
    }); */
});

module.exports = router;
