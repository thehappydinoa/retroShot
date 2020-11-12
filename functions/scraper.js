let axios = require("axios");

async function fetchShots(postsPerRequest = 100) {
  let shots = [];

  return axios
    .get(`https://www.reddit.com/r/oldschoolcool.json?limit=${postsPerRequest}`)
    .then((response) => {
      const posts = response.data.data.children;
      const after = response.data.data.after;

      posts.forEach((post) => {
        let data = post.data;

        let isValidImg = data.url.slice(-4) === ".png" || data.url.slice(-4) === ".jpg"
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
          user: data.author,
          postUrl: `https://www.reddit.com${data.permalink}`,
          imgUrl: data.url,
          year: year,
          decade: decade,
        };
        shots.push(shot);
      });
      return shots;
    })
    .catch(console.warn);
}

module.exports = {
  fetchShots,
};