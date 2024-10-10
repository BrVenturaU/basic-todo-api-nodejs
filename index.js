require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.route");
const todoRoutes = require("./routes/todos.route");
const authorize = require("./middlewares/authorize.middleware");

const app = express();

// Registrando middlewares
app.use(cors());
app.use(express.json());

// Registrando rutas
app.use("/api/auth", authRoutes);
app.use("/api/todos", authorize, todoRoutes);

const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
