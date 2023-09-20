const express = require("express");

const checkAuth = require("../middleware/check-auth")
const Usuario = require("../models/usuario");

const router = express.Router();

router.get("", checkAuth, (req, res, next) => {
  Usuario.findOne({ _id: req.userData.userId }).then((usuario) => {
    res.status(200).json(usuario);
  });
});

module.exports = router;
