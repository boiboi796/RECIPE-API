const express = require("express");
const db = require("./db");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.use(express.json());
app.use(express.static("public"));


app.get("/", (req, res) => {
  db.all("SELECT * FROM recipes", [], (err, recipes) => {
    db.all("SELECT * FROM comments", [], (err2, comments) => {
      db.all("SELECT * FROM ratings", [], (err3, ratings) => {
        res.render("recipes", { recipes, comments, ratings });
      });
    });
  });
});


app.post("/recipes", (req, res) => {
  const { name, ingredients, instructions, cuisine, prep_time, dietary } = req.body;
  db.run(
    "INSERT INTO recipes VALUES (NULL, ?, ?, ?, ?, ?, ?)",
    [name, ingredients, instructions, cuisine, prep_time, dietary],
    function () {
      res.redirect("/");
    }
  );
});

app.get("/recipes", (req, res) => {
  db.all("SELECT * FROM recipes", [], (err, rows) => res.json(rows));
});

app.get("/recipes/search", (req, res) => {
  const { cuisine, ingredient } = req.query;
  db.all(
    "SELECT * FROM recipes WHERE cuisine LIKE ? OR ingredients LIKE ?",
    [`%${cuisine}%`, `%${ingredient}%`],
    (err, rows) => res.json(rows)
  );
});

app.post("/recipes/:id/comment", (req, res) => {
  db.run(
    "INSERT INTO comments VALUES (NULL, ?, ?)",
    [req.params.id, req.body.comment],
    () => res.redirect("/")
  );
});
app.post("/comments/:id/delete", (req, res) => {
  const commentId = req.params.id;

  db.run(
    "DELETE FROM comments WHERE id = ?",
    [commentId],
    () => {
      res.redirect("/");
    }
  );
});


app.post("/recipes/:id/rate", (req, res) => {
  db.run(
    "INSERT INTO ratings VALUES (NULL, ?, ?)",
    [req.params.id, req.body.rating],
    () => res.json({ message: "Rating added" })
  );
});

app.get("/recipes/:id/edit", (req, res) => {
  db.get(
    "SELECT * FROM recipes WHERE id = ?",
    [req.params.id],
    (err, recipe) => {
      res.render("edit-recipe", { recipe });
    }
  );
});
app.post("/recipes/:id/edit", (req, res) => {
  const { name, ingredients, instructions, cuisine, prep_time, dietary } = req.body;

  db.run(
    `UPDATE recipes 
     SET name = ?, ingredients = ?, instructions = ?, cuisine = ?, prep_time = ?, dietary = ?
     WHERE id = ?`,
    [name, ingredients, instructions, cuisine, prep_time, dietary, req.params.id],
    () => {
      res.redirect("/");
    }
  );
});


app.post("/recipes/:id/delete", (req, res) => {
  const recipeId = req.params.id;

  db.run(
    "DELETE FROM recipes WHERE id = ?",
    [recipeId],
    () => {
      db.run("DELETE FROM comments WHERE recipe_id = ?", [recipeId], () => {
        res.redirect("/");
      });
    }
  );
});


app.listen(3000, () => console.log("Recipe API running on port 3000"));
