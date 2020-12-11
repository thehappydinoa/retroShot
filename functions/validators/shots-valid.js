/* eslint prefer-promise-reject-errors: "off" */
const admin = require("firebase-admin");
const { body, query, oneOf } = require("express-validator");

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

const urlOptions = {
  protocols: ["https"],
  require_tld: true,
  require_protocol: true,
  require_host: true,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false,
  disallow_auth: true,
};

const shotValidator = [
  body("title").not().isEmpty().trim(),
  body("postId").not().isEmpty().trim().custom(validatePostId),
  body("user").not().isEmpty().trim(),
  body("postUrl").not().isEmpty().isURL(urlOptions).trim(),
  body("imgUrl").not().isEmpty().isURL(urlOptions).trim(),
  oneOf([
    body("year").not().isEmpty().isInt().toInt(),
    body("decade").not().isEmpty().isInt().toInt(),
  ]),
];

const shotUpdaterValidator = [oneOf(shotValidator)];

const getShotValidator = [
  query("type").optional().isIn(["year", "decade"]).isString(),
];

module.exports = {
  validatePostId,
  shotValidator,
  shotUpdaterValidator,
  getShotValidator,
};
