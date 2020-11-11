const admin = require("firebase-admin");
const { validationResult } = require("express-validator");

createShot = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let shot = req.body;
  shot.dateAdded = admin.firestore.Timestamp.now();

  const writeResult = await admin.firestore().collection("shots").add(shot);

  return res.json({ result: `Shot with ID: ${writeResult.id} added.` });
};

createShots = async (req, res) => {};

updateShot = async (req, res) => {};

deleteShot = async (req, res) => {};

getShotById = async (req, res) => {};

getShots = async (req, res) => {};

getRandomShot = async (req, res) => {};

module.exports = {
  createShot,
  createShots,
  updateShot,
  deleteShot,
  getShotById,
  getShots,
  getRandomShot,
};
