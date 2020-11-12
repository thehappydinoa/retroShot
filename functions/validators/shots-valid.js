/* eslint prefer-promise-reject-errors: "off" */
const admin = require("firebase-admin");
const { body, oneOf } = require("express-validator");

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
  body("postId").not().isEmpty().trim(),
  body("postId").custom(validatePostId),
  body("user").not().isEmpty().trim(),
  body("postUrl").not().isEmpty().trim(),
  body("postUrl").isURL(),
  body("imgUrl").not().isEmpty().trim(),
  body("imgUrl").isURL(),
  oneOf([body("year").isInt(), body("decade").isString()]),
];

const shotUpdaterValidator = [
  body("user").not().isEmpty().trim(),
  body("postUrl").not().isEmpty().trim(),
  body("postUrl").isURL(),
  body("imgUrl").not().isEmpty().trim(),
  body("imgUrl").isURL(),
  oneOf([body("year").isInt(), body("decade").isString()]),
];

module.exports = {
  validatePostId,
  shotValidator,
  shotUpdaterValidator,
};
