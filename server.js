const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register.js");
const signin = require("./controllers/signin.js");
const profile = require("./controllers/profile.js");
const image = require("./controllers/image.js");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

app.post("/signin", (req, res) => {
  var a = JSON.parse(req.body);
  if (
    a.username === database.users[0].email &&
    a.password === database.secrets.hash
  ) {
    res.send("signed in");
  } else {
    res.json("access denied");
  }
});

app.post("/findface", (req, res) => {
  database.users.forEach(user => {
    if (user.email === req.body.email) {
      user.entries++;
      res.json(user);
    }
  });
  res.json("nope");
});

app.post("/register", (req, res) => {
  database.users.push({
    id: "124",
    name: req.body.name,
    email: req.body.email,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:userId", (req, res) => {
  database.users.forEach(user => {
    if (user.id === req.params.userId) {
      return res.json(user);
    }
  });
  // res.json('no user')
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("server starts");
});
