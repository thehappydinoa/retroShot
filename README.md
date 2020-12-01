# retroShot [![Website](https://img.shields.io/website?url=https%3A%2F%2Fretroshot-6a964.firebaseapp.com)](https://retroshot-6a964.firebaseapp.com/) [![API Docs](https://img.shields.io/badge/api%20docs-passing-green)](https://documenter.getpostman.com/view/4309917/TVenfoyk) [![Node 12](https://img.shields.io/badge/node-v12.0-orange)](https://nodejs.org/en/download/releases/) [![Built with Firebase](https://img.shields.io/badge/Built%20with-Firebase%20%E2%AD%90-orange)](https://firebase.google.com/)

Final project for CS 375. Based around the popular subreddit [`r/OldSchoolCool`](https://www.reddit.com/r/OldSchoolCool/) where images are gathered and the user is asked to guess the year.

## Resources

- [`node` Download](https://nodejs.org/en/download/releases/)
- [`yarn` Install](https://yarnpkg.com/getting-started/install)
- [`r/OldSchoolCool`](https://www.reddit.com/r/OldSchoolCool/)
- [API Documentation](https://documenter.getpostman.com/view/4309917/TVenfoyk)
- API Deployed to [`https://us-central1-retroshot-6a964.cloudfunctions.net/api`](https://us-central1-retroshot-6a964.cloudfunctions.net/api)

## Install

This project uses `Yarn` Workspaces.

```sh
yarn install
```

## Usage

### Serve Functions

```sh
yarn serve
```

### Scrape Functions

```sh
yarn scrape
```

## Docs

```js
let shot = {
  postId: 123,
  title: "Test Title",
  user: "user123",
  url: "https://...",
  year: 2019,
  // If year is none decade will be used, if neither an error will be thrown
  decade: "2010s",
};
```
