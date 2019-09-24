const Clarifai = require("clarifai");
const app = new Clarifai.App({
  apiKey: "3dba087793aa45afa2bf7740b930b086"
});

const handleApiCall = () => (req, res) => {
  app.models
    .predict("3dba087793aa45afa2bf7740b930b086", req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json(-1));
};

const handleImage = db => (req, res) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entry", 1)
    .returning("entry")
    .then(entry => {
      if (entry.length) {
        res.json(entry);
      } else {
        res.status(400).json("unable to get entries of user with id = " + id);
      }
    })
    .catch(err => res.status(400).json("unable to get entries"));
};

module.exports = { handleImage, handleApiCall };
