const { request, response } = require("express");
const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const authorize = (req = request, res = response, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.APP_JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    console.log('Antes de continuar.');
    next();
    console.log('Despues de continuar.');
  });
};

module.exports = authorize;
