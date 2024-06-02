import sqlite3 from "sqlite3";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { sendVerificationCode } from "./utils/email.mjs";
import getCurrentDate from "./utils/date.mjs";

const app = express();

app.use(express.json()); //to accept json from user
app.use(cors()); // allow requests from all

const sqlite = sqlite3.verbose();

// variable to hold sql queries
let sql;

const db = new sqlite.Database("./comment.db", sqlite.OPEN_READWRITE, (err) => {
  if (err) return console.error(err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//post requests
app.post("/api/comment", (req, res) => {
  try {
    const { name, message } = req.body;

    // get the current date
    const dateNow = getCurrentDate();

    // Check if name has at least two letters (excluding whitespace)
    const nameWithoutWhitespace = name.replace(/\s/g, ""); // Remove whitespace
    if (nameWithoutWhitespace.length < 2) {
      return res.json({
        status: 400,
        success: false,
        error: "Name must contain at least two letters (excluding whitespace).",
      });
    }

    // Split the name into two parts assuming it contains two names separated by whitespace
    const names = name.split(" ");

    // Capitalize the first letter of each name and make the rest lowercase
    const processedNames = names.map((name) => {
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    });

    // Insert the processed names and message into the database
    const sql = "INSERT INTO comment(name, message, date) VALUES (?, ?, ?)";
    db.run(sql, [processedNames.join(" "), message, dateNow], (err) => {
      if (err) {
        return res.json({ status: 300, success: false, error: err });
      }

      // send an email to regina.kapoko containing a notification that a user submitted a review
      sendVerificationCode(name, message);

      // for debuging
      console.log(
        "Successful input:",
        processedNames.join(" "),
        ",",
        message,
        ",",
        dateNow
      );

      // return 200 response
      return res.json({
        status: 200,
        success: true,
      });
    });
  } catch (error) {
    console.log("error: ", error);
    return res.json({
      status: 400,
      success: false,
    });
  }
});

// get request
app.get("/api/comment", (req, res) => {
  // query to get the latest 15 reviews
  sql = "SELECT * FROM comment ORDER BY ID DESC LIMIT 15";
  try {
    // execute query
    db.all(sql, [], (err, rows) => {
      if (err) return res.json({ status: 300, success: false, error: err });

      // if query returns no result respond with a 300 code
      if (rows.length < 1)
        return res.json({ status: 300, success: false, error: "No results" });

        // for debugging
      console.log(rows);


      // return json
      return res.json({
        data: rows, // Include the query results in the response
        status: 200,
        success: true,
      });
    });
  } catch (error) {
    // return 400 code incase of an erro
    return res.json({
      status: 400,
      success: false,
    });
  }
});

// port the backend will be active on
app.listen(7852, () => console.log("Server ready on port 7852."));
