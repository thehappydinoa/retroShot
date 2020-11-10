const express = require("express");

const ImageCtrl = require("../controllers/image-ctrl");

const router = express.Router();

// router.get("/path", function)
router.post("/purchase", ImageCtrl.createImage);

module.exports = router;
