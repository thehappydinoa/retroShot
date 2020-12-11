import { auth } from "./components/firebase/config";

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

const getScore = async () => {
  const tokenId = await auth.currentUser.getIdToken();
  let headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", tokenId ? `Bearer ${tokenId}` : "");

  let requestOptions = {
    method: "GET",
    headers,
    // redirect: "follow",
  };

  return fetch(`${BASE_URL}/score`, requestOptions);
};

const setScore = async (score) => {
  const tokenId = await auth.currentUser.getIdToken();
  let headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", tokenId ? `Bearer ${tokenId}` : "");

  let requestOptions = {
    method: "PUT",
    headers,
    body: JSON.stringify({ score }),
    // redirect: "follow",
  };

  return fetch(`${BASE_URL}/score`, requestOptions);
};

export { BASE_URL, getRandomShot, getScore, setScore };
