const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const { app } = require("./server");

const appFunction = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`; // Prepend '/' to keep query params if any
  }

  return app(request, response);
});

module.exports = {
  appFunction,
};
