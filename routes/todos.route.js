const express = require("express");
const todosController = require("../controllers/todos.controller");

const router = express.Router();

// Obtener todos los TODOs
router.get("/", todosController.getTodos);

// Crear un nuevo TODO
router.post("/", todosController.createTodo);

// Actualizar un TODO
router.put("/:id", todosController.editTodo);

// Eliminar un TODO
router.delete("/:id", todosController.removeTodo);

module.exports = router;
