const URLS = {
  dev: "http://localhost:5001/retroshot-6a964/us-central1/api",
  prod: "https://us-central1-retroshot-6a964.cloudfunctions.net/api",
};

// Set true for dev
const dev = false;

const BASE_URL = dev ? URLS.dev : URLS.prod;

const getRandomShot = (type = "year") => {
  let url = `${BASE_URL}/shot/random`;
  if (type) {
    url += `?${new URLSearchParams({ type })}`;
  }
  console.log(url);
  return fetch(url);
};

export { BASE_URL, getRandomShot };
