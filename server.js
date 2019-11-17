require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const formData = require("express-form-data");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "postgresql-clear-49214",
    user: "postgres",
    password: "Facelift911",
    database: "face-recognition"
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(formData.parse());

app.get("/", (req, res) => {
  res.send("welcome");
});

app.get("/", (req, res) => {
  res.send(db.users);
});

app.post("/signin", (req, res) => {
  signin.handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.listen(process.env.PORT || 3001, () => {
  console.log("server starts");
});
