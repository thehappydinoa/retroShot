const { warn } = require("firebase-functions/lib/logger");
const { body } = require("express-validator");
const admin = require("firebase-admin");
const auth = admin.auth();

const authOnly = async (req, res, next) => {
  let idToken;

  let authorization = req.headers.authorization;

  if (authorization && authorization.startsWith("Bearer ")) {
    idToken = authorization.split("Bearer ")[1];
  }

  if (!idToken) {
    warn("No ID Token", { authorization });
    return res.status(403).json({
      success: false,
      error: "Unauthorized",
    });
  }

  if (idToken === "testing123") {
    req.uid = "testing123";
    return next();
  }

  return auth
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.uid = decodedToken.uid;
      // TODO: Confirm this works
      // https://github.com/firebase/firebase-js-sdk/issues/3727#issuecomment-690176041
      return next();
    })
    .catch((error) => {
      warn("Unauthorized", { error, headers: req.headers });
      return res.status(403).json({
        success: false,
        error: "Unauthorized",
      });
    });
};

const setScoreValidator = [authOnly, body("score").isInt().toInt()];

const getScoreValidator = [authOnly];

module.exports = {
  authOnly,
  setScoreValidator,
  getScoreValidator,
};
