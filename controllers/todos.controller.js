const { request, response } = require("express");
const pool = require("../database/db");

// Obtener todos los TODOs
const getTodos = async (req = request, res = response) => {
  const result = await pool.query("SELECT * FROM todos WHERE user_id=$1", [
    req.user.id,
  ]);

  res.json(result.rows);
};

// Crear un nuevo TODO
const createTodo = async (req = request, res = response) => {
  const { title } = req.body;
  const result = await pool.query(
    "INSERT INTO todos (title, user_id) VALUES ($1, $2) RETURNING *",
    [title, req.user.id]
  );
  res.status(201).json(result.rows[0]);
};

// Actualizar un TODO
const editTodo = async (req = request, res = response) => {
  const { id } = req.params;
  const { title } = req.body;

  const result = await pool.query(
    "UPDATE todos SET title=$1 WHERE id=$2 AND user_id=$3 RETURNING *",
    [title, id, req.user.id]
  );

  if (result.rows.length === 0) return res.sendStatus(404);

  res.json(result.rows[0]);
};

// Eliminar un TODO
const removeTodo = async (req = request, res = response) => {
  const { id } = req.params;

  const result = await pool.query(
    "DELETE FROM todos WHERE id=$1 AND user_id=$2 RETURNING *",
    [id, req.user.id]
  );

  if (result.rows.length === 0) return res.sendStatus(404);

  res.sendStatus(204);
};

module.exports = {
  getTodos,
  createTodo,
  editTodo,
  removeTodo,
};
