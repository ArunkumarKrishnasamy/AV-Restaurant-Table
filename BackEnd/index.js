const express = require("express");
const app = express();
app.use(express.json());

const PORT = 5000 || process.env.PORT;

// Middleware
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

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
    res.status(200).json(recipes.rows);
  } catch (error) {
    res.status(400).json({ message: "Data is not Available" });
    console.error(error);
  }
});

app.get("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await pool.query("SELECT * FROM recipes WHERE id =$1", [id]);
    res.status(200).json(recipe.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

app.put("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name } = req.body;
    const recipeUpdate = await pool.query(
      "UPDATE recipes SET first_name=$1,last_name = $2 WHERE id=$3",
      [first_name, last_name, id]
    );
    res.json("Recipe Updated");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in Editing data" });
  }
});

app.delete("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const Delete = await pool.query("DELETE from recipes WHERE id=$1", [id]);
    res.json({ message: "Recipe Deleted" });
  } catch (error) {
    console.log(error);
  }
});
app.listen(PORT, () => {
  console.log("Web Server started Now");
});
