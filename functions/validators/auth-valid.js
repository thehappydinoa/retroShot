const admin = require("firebase-admin");
const auth = admin.auth();

const authOnly = async (req, res, next) => {
  let idToken;

  let authorization = req.headers.authorization;

  if (authorization && authorization.startsWith("Bearer ")) {
    idToken = authorization.split("Bearer ")[1];
  }

  if (!idToken) {
    return res.status(403).json({
      success: false,
      error: "Unauthorized",
    });
  }

  return auth
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.currentUser = decodedToken;
      // TODO: Confirm this works
      // https://github.com/firebase/firebase-js-sdk/issues/3727#issuecomment-690176041
      return next();
    })
    .catch((error) => {
      return res.status(403).json({
        success: false,
        error: "Unauthorized",
      });
    });
};

module.exports = {
  authOnly,
};
