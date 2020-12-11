const express = require("express");

const ShotsCtrl = require("./controllers/shots-ctrl");
const UserCtrl = require("./controllers/user-ctrl");
const {
  shotValidator,
  shotUpdaterValidator,
  getShotValidator,
} = require("./validators/shots-valid");
const {
  setScoreValidator,
  getScoreValidator,
} = require("./validators/user-valid");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to retroShot API!");
});

// Shots
// router.get("/path", function)
router.get("/shots", ShotsCtrl.getShots);
router.post("/shot", shotValidator, ShotsCtrl.createShot);
router.put("/shot/:id", shotUpdaterValidator, ShotsCtrl.updateShot);
// router.delete("/shot/:id", ShotsCtrl.deleteShot);
router.get("/shot/random", getShotValidator, ShotsCtrl.getRandomShot);
router.get("/shot/:id", getShotValidator, ShotsCtrl.getShotById);

// User
router.put("/score", setScoreValidator, UserCtrl.setUserScore);
router.get("/score", getScoreValidator, UserCtrl.getUserScore);

module.exports = router;
