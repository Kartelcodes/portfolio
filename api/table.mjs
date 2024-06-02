import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const sqlite = sqlite3.verbose();

// Convert the current file URL to a path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the full path to avoid issues with relative paths
const dbPath = path.resolve(__dirname, "comment.db");
console.log("Database Path:", dbPath);

// Check if directory is writable
fs.access(path.dirname(dbPath), fs.constants.W_OK, (err) => {
  if (err) {
    console.error("Directory is not writable:", err.message);
  } else {
    console.log("Directory is writable");
  }
});

const db = new sqlite.Database(
  dbPath,
  sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error("Database connection error:", err.message);
    }
    console.log("Connected to the database.");

    const sql = `CREATE TABLE IF NOT EXISTS comment (
    ID INTEGER PRIMARY KEY,
    name TEXT,
    message TEXT,
    Date TEXT
  )`;

    db.run(sql, (err) => {
      if (err) {
        return console.error("Error creating table:", err.message);
      }
      console.log("Table created successfully.");
    });
  }
);
