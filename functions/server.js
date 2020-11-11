const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const router = require("./routes");

// const host = "localhost";
// const apiPort = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.use("/", router);

// app.listen(apiPort, () =>
//   console.log(`Server running on port http://${host}:${apiPort}`)
// );

module.exports = {
  app,
};
