const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "pay4netflix",
});

app.get("/showdata", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const monthAt = req.body.monthAt;
  const timeAt = req.body.timeAt;
  const confirmed = req.body.confirmed;

  db.query(
    "INSERT INTO users (name, monthAt, timeAt, confirmed) VALUES(?,?,?,?)",
    [name, monthAt, timeAt, confirmed],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

app.listen("3001", () => {
  console.log("Server is running on port 3001");
});
