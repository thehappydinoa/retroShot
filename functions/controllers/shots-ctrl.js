const admin = require("firebase-admin");
const { validationResult } = require("express-validator");
// const { fetchShots } = require("../scraper");

const firestore = admin.firestore();

createShot = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  let newShot = req.body;

  return firestore
    .collection("shots")
    .add(newShot)
    .then((writeResult) => {
      return res.status(201).json({
        success: true,
        id: writeResult.id,
        message: "Shot created!",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        success: false,
        error,
        message: "Shot not created!",
      });
    });
};

updateShot = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const shotId = req.params.id;
  let updateShot = req.body;

  const shotRef = firestore.collection("shots").doc(shotId);
  return shotRef
    .update(updateShot)
    .then((writeResult) => {
      return res.status(200).json({
        success: true,
        id: writeResult.id,
        message: "Shot updated!",
      });
    })
    .catch((error) => {
      return res.status(404).json({
        success: false,
        error,
        message: "Shot not updated!",
      });
    });
};

deleteShot = async (req, res) => {
  const shotId = req.params.id;

  const shotRef = firestore.collection("shots").doc(shotId);
  return shotRef
    .delete()
    .then((writeResult) => {
      return res.status(200).json({
        success: true,
        id: writeResult.id,
        message: "Shot deleted!",
      });
    })
    .catch((error) => {
      return res.status(404).json({
        success: false,
        error,
        message: "Shot not deleted!",
      });
    });
};

getShotById = async (req, res) => {
  const shotId = req.params.id;

  const shotRef = firestore.collection("shots").doc(shotId);
  return shotRef
    .get()
    .then((documentSnapshot) => {
      return res
        .status(200)
        .json({ success: true, id: shotId, data: documentSnapshot.data() });
    })
    .catch((error) => {
      return res.status(404).json({
        success: false,
        error,
        message: "Shot not found!",
      });
    });
};

getShots = async (req, res) => {
  let collectionRef = firestore.collection("shots");

  let querySnapshot = await collectionRef.get();

  if (!querySnapshot.size) {
    return res.status(404).json({ success: false, error: "Shot not found" });
  }

  let shots = {};
  querySnapshot.forEach((documentSnapshot) => {
    shots[documentSnapshot.ref.id] = documentSnapshot.data();
  });

  return res.status(200).json({ success: true, data: shots });
};

getRandomShot = async (req, res) => {
  let collectionRef = firestore.collection("shots");

  let querySnapshot = await collectionRef.get();

  if (!querySnapshot.size) {
    return res.status(404).json({ success: false, error: `Shot not found` });
  }

  let shots = [];
  querySnapshot.forEach((documentSnapshot) => {
    shots.push(documentSnapshot.ref.id);
  });

  var shotId = shots[Math.floor(Math.random() * shots.length)];

  return collectionRef
    .doc(shotId)
    .get()
    .then((documentSnapshot) => {
      return res
        .status(200)
        .json({ success: true, id: shotId, data: documentSnapshot.data() });
    })
    .catch((error) => {
      return res.status(404).json({
        error,
        message: "Shot not found!",
      });
    });
};

refreshShots = async (req, res) => {};

module.exports = {
  createShot,
  updateShot,
  deleteShot,
  getShotById,
  getShots,
  getRandomShot,
  refreshShots,
};
