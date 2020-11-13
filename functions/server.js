const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const router = require("./routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("X-powered-by", "Caffeine");
  next();
});

app.use("/", router);

module.exports = {
  app,
};
