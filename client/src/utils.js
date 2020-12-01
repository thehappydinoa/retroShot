const BASE_URL = "https://us-central1-retroshot-6a964.cloudfunctions.net/api";

const getRandomShot = () => {
  return fetch(`${BASE_URL}/shot/random`);
};

export { BASE_URL, getRandomShot };