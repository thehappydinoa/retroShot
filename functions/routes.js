const express = require("express");

const ShotsCtrl = require("./controllers/shots-ctrl");
const {
  shotValidator,
  shotUpdaterValidator,
} = require("./validators/shots-valid");
const { authOnly } = require("./validators/auth-valid");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to retroShot API!");
});

// router.get("/path", function)
router.get("/shots", ShotsCtrl.getShots);
router.post("/shot", [authOnly, ...shotValidator], ShotsCtrl.createShot);
router.put("/shot/:id", [authOnly, ...shotUpdaterValidator], ShotsCtrl.updateShot);
router.delete("/shot/:id", [authOnly], ShotsCtrl.deleteShot);
router.get("/shot/random", ShotsCtrl.getRandomShot);
router.get("/shot/:id", ShotsCtrl.getShotById);
router.post("/refresh", ShotsCtrl.refreshShots);

module.exports = router;
