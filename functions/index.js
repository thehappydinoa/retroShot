const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const { app } = require("./server");

const api = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`; // Prepend '/' to keep query params if any
  }

  return app(request, response);
});

const { scraper } = require("./scraper");

const scrape = functions.pubsub
  .schedule("0 18 * * *")
  .onRun((context) => scraper());

module.exports = {
  api,
  scrape,
};
