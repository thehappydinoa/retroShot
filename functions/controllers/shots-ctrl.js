const admin = require("firebase-admin");
const { validationResult } = require("express-validator");
// const { fetchShots } = require("../scraper");
const { warn } = require("firebase-functions/lib/logger");

const firestore = admin.firestore();
const shotCollection = firestore.collection("shots");

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
      warn("Shot not created", { shot: "new" });
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
      warn("Shot not updated", { shot: "random" });
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
      warn("Shot not deleted", { shot: shotId });
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
      warn("Shot not found", { shot: shotId });
      return res.status(404).json({
        success: false,
        error,
        message: "Shot not found!",
      });
    });
};

getShots = async (req, res) => {
  const shotType = req.query.type;

  let collectionRef = firestore.collection("shots");

  let queryRef = collectionRef;

  if (shotType) {
    queryRef = collectionRef.where(shotType, "!=", null);
  }

  let querySnapshot = await queryRef.get();

  if (!querySnapshot.size) {
    warn("Shot not found", { shot: "all" });
    return res.status(404).json({ success: false, error: "Shot not found" });
  }

  let shots = {};
  querySnapshot.forEach((documentSnapshot) => {
    shots[documentSnapshot.ref.id] = documentSnapshot.data();
  });

  return res
    .status(200)
    .json({ success: true, length: shots.length, data: shots });
};

getRandomShot = async (req, res) => {
  const shotType = req.query.type;
  const decadeOnly = req.query.decadeOnly;

  let collectionRef = firestore.collection("shots");

  let queryRef = collectionRef;

  if (!decadeOnly && shotType) {
    queryRef = collectionRef.where(shotType, "!=", null);
  }

  let querySnapshot = await queryRef.get();

  if (!querySnapshot.size) {
    warn("Shot not found", { shot: "random" });
    return res.status(404).json({ success: false, error: `Shot not found` });
  }

  let shots = [];
  querySnapshot.forEach((documentSnapshot) => {
    shots.push(documentSnapshot.ref.id);
  });

  let shotId = shots[Math.floor(Math.random() * shots.length)];

  return collectionRef
    .doc(shotId)
    .get()
    .then((documentSnapshot) => {
      let data = documentSnapshot.data();
      if (data.year) {
        data.decade = parseInt(data.year / 10, 10) * 10;
        data.year = null;
      }
      return res.status(200).json({ success: true, id: shotId, data });
    })
    .catch((error) => {
      warn("Shot not found", { shot: shotId });
      return res.status(404).json({
        error,
        message: "Shot not found!",
      });
    });
};

module.exports = {
  createShot,
  updateShot,
  deleteShot,
  getShotById,
  getShots,
  getRandomShot,
};
