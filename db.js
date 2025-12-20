const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./recipes.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    ingredients TEXT,
    instructions TEXT,
    cuisine TEXT,
    prep_time INTEGER,
    dietary TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id INTEGER,
    comment TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id INTEGER,
    rating INTEGER
  )`);
});

module.exports = db;
