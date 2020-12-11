const { warn } = require("firebase-functions/lib/logger");
const admin = require("firebase-admin");
const firestore = admin.firestore();
const userCollection = firestore.collection("users");

const createUser = (user) => {
  const newUserData = {
    score: 0,
  };
  return userCollection
    .doc(user.uid)
    .set(newUserData)
    .then((writeResult) => {
      return writeResult;
    })
    .catch((error) => {
      warn("User not created", { user, error });
      return error;
    });
};

const deleteUser = (user) => {
  return userCollection
    .doc(user.uid)
    .delete()
    .then((writeResult) => {
      return writeResult;
    })
    .catch((error) => {
      warn("User not deleted", { user, error });
      return error;
    });
};

module.exports = {
  createUser,
  deleteUser,
};
