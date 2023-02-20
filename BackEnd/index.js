const express = require("express");
const app = express();
app.use(express.json());

const PORT = 5000 || process.env.PORT;

// Middleware
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));

const pool = require("./db");

// Routes
app.post("/recipes", async (req, res) => {
  try {
    const { first_name, last_name } = req.body;

    const newRow = await pool.query(
      "INSERT INTO recipes(first_name, last_name) VALUES ($1,$2) RETURNING * ",
      [first_name, last_name]
    );
    res.status(200).json(newRow.rows[0]);
  } catch (error) {
    console.error(error);
    res.json({ message: "Posting data went wrong" });
  }
});

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await pool.query("SELECT * FROM recipes");
    res.status(500).json(recipes.rows);
  } catch (error) {
    res.status(400).json({ message: "Data is not Available" });
    console.error(error);
  }
});
app.listen(PORT, () => {
  console.log("Web Server started Now");
});
