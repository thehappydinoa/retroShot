const admin = require("firebase-admin");
const { validationResult } = require("express-validator");
const { warn } = require("firebase-functions/lib/logger");

const firestore = admin.firestore();
const userCollection = firestore.collection("users");

setUserScore = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.uid;
  let { score } = req.body;

  const userRef = userCollection.doc(userId);
  return userRef
    .update({ score })
    .then((writeResult) => {
      return res.status(200).json({
        success: true,
        id: writeResult.id,
        message: "User's score updated!",
      });
    })
    .catch((error) => {
      warn("User's score not updated", { user: userId, error });
      return res.status(404).json({
        success: false,
        // FIXME: Exposure
        error,
        message: "User's score not updated!",
      });
    });
};

getUserScore = async (req, res) => {
  const userId = req.uid;

  const userRef = userCollection.doc(userId);
  return userRef
    .get()
    .then((documentSnapshot) => {
      return res.status(200).json({
        success: true,
        id: userId,
        score: documentSnapshot.data().score || 0,
      });
    })
    .catch((error) => {
      warn("User not found", { user: userId, error });
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    });
};

module.exports = {
  setUserScore,
  getUserScore,
};
