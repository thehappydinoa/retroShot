/* eslint prefer-promise-reject-errors: "off" */
const admin = require("firebase-admin");
const express = require("express");
const { body, oneOf } = require("express-validator");

const ShotsCtrl = require("./controllers/shots-ctrl");

// {
//   postId: 12345,
//   user: "user12345",
//   url: "https://...",
//   year: 2020,
//   // If year is none decade will be used, if neither an error will be thrown
//   decade: "2010s",
// };
const validatePostId = async (postId) => {
  let query = admin
    .firestore()
    .collection("shots")
    .where("postId", "==", postId);

  const querySnapshot = await query.get();

  if (querySnapshot && querySnapshot.size > 0) {
    return Promise.reject("postId has already been added");
  }

  return Promise.resolve();
};

const shotValidator = [
  body("postId").not().isEmpty().trim().escape(),
  body("postId").custom(validatePostId),
  body("user").not().isEmpty().trim().escape(),
  body("url").not().isEmpty().trim().escape(),
  oneOf([body("year").isInt(), body("decade").isString()]),
];

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to retroShot API!");
});

// router.get("/path", function)
router.get("/shots", ShotsCtrl.getShots);
router.post("/shot", shotValidator, ShotsCtrl.createShot);
router.post("/shots", shotValidator, ShotsCtrl.createShots);
router.put("/shot/:id", shotValidator, ShotsCtrl.updateShot);
router.delete("/shot/:id", ShotsCtrl.deleteShot);
router.get("/shot/:id", ShotsCtrl.getShotById);
router.get("/shot/random", ShotsCtrl.getRandomShot);

module.exports = router;
