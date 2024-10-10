const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../database/db");

const register = async (req = request, res = response) => {
  const { username, password: passwordB } = req.body;
  const hashedPassword = await bcrypt.hash(passwordB, 10);

  const result = await pool.query(
    `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
    [username, hashedPassword]
  );
  const { password, ...user } = result.rows[0];
  res.status(201).json(user);
};

const login = async (req = request, res = response) => {
  const { username, password } = req.body;
  const userResult = await pool.query("SELECT * FROM users WHERE username=$1", [
    username,
  ]);

  if (userResult.rows.length === 0)
    return res.status(400).send("Usuario no encontrado");

  const user = userResult.rows[0];

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id }, process.env.APP_JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(400).send("Contraseña incorrecta");
  }
};

module.exports = {
  register,
  login,
};
