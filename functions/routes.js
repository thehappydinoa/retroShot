const express = require("express");

const ShotsCtrl = require("../controllers/shots-ctrl");

const router = express.Router();

// router.get("/path", function)
router.get("/shots", ShotsCtrl.getShots);
router.post("/shot", ShotsCtrl.createShot);
router.post("/shots", ShotsCtrl.createShots);
router.put("/shot/:id", ShotsCtrl.updateShot);
router.delete("/shot/:id", ShotsCtrl.deleteShot);
router.get("/shot/:id", ShotsCtrl.getShotById);
router.get("/shot/random", ShotsCtrl.getRandomShot);

module.exports = router;
