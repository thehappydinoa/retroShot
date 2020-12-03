let axios = require("axios");
const { warn } = require("firebase-functions/lib/logger");

async function fetchShots(postsPerRequest = 100) {
  let shots = [];

  return axios
    .get(`https://www.reddit.com/r/oldschoolcool.json?limit=${postsPerRequest}`)
    .then((response) => {
      const posts = response.data.data.children;
      const after = response.data.data.after;

      posts.forEach((post) => {
        let data = post.data;

        let isValidImg =
          data.url.slice(-4) === ".png" || data.url.slice(-4) === ".jpg";
        // Exclude video and NSFW posts
        if (data.is_video || data.over_18 || !isValidImg) {
          return;
        }

        // Match exact years or decades
        let regex = /[12]\d{3}([’']?s)?/g;
        let title = data.title;
        let matches = title.match(regex);

        // Accept only a single match per title
        if (!matches || matches.length > 1) {
          return;
        }

        // Extract year/ decade int from match
        let year = null;
        let decade = null;
        if (matches[0].slice(-1) === "s") {
          decade = parseInt(matches[0].slice(0, 4), 10);
        } else {
          year = parseInt(matches[0], 10);
        }

        // Build shot JSON object and push to shots
        let shot = {
          postId: data.id,
          title: data.title,
          user: data.author,
          postUrl: `https://www.reddit.com${data.permalink}`,
          imgUrl: data.url,
          year,
          decade,
        };
        shots.push(shot);
      });
      return shots;
    })
    .catch((err) => {
      warn(err);
      console.warn(err);
    });
}

function main() {
  require("dotenv").config();

  const { BASE_URL } = process.env;

  if (!BASE_URL) {
    console.warn("BASE_URL environmental variable is required");
    process.exit();
  }

  console.log("Fetching shots");
  fetchShots()
    .then((shots) =>
      shots.forEach((shot) =>
        axios
          .post(`${BASE_URL}/shot`, shot)
          .then(console.log)
          .catch((err) => {
            warn(err);
            console.warn(err);
          })
      )
    )
    .catch((err) => {
      warn(err);
      console.warn(err);
    });
}

if (require.main === module) {
  main();
}

module.exports = {
  fetchShots,
  scraper: main,
};
