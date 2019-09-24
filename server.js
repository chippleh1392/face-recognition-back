const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const formData = require("express-form-data");

const register = require("./controllers/register.js");
const signin = require("./controllers/signin.js");
const profile = require("./controllers/profile.js");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(formData.parse());

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

app.get("/", (req, res) => {
  res.send("welcome");
});

app.post("/signin", signin.handleSignIn(db, bcrypt));

app.post("/register", register.handleRegister(db, bcrypt));

app.get("/profile/:id", profile.handleProfile(db));

app.get("*", (req, res) => {
  res.send("sorry, nothing here((");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("server starts");
});
