const admin = require("firebase-admin");
const { validationResult } = require("express-validator");
const { fetchShots } = require("../scraper");

createShot = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let newShot = req.body;

  const writeResult = await admin.firestore().collection("shots").add(newShot);

  return res.json({ result: `Shot with ID: ${writeResult.id} added.` });
};

updateShot = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const shotId = req.params.id;
  let updateShot = req.body;

  const shotRef = admin.firestore().collection("shots").doc(shotId);
  const updateResult = await shotRef.update(updateShot);
  return res.json({ result: `Shot with ID: ${shotId} updated.` });
};

deleteShot = async (req, res) => {};

getShotById = async (req, res) => {};

getShots = async (req, res) => {};

getRandomShot = async (req, res) => {};

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
