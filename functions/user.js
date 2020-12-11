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
      warn("User not created", { user });
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
      warn("User not deleted", { user });
      return error;
    });
};

module.exports = {
  createUser,
  deleteUser,
};
