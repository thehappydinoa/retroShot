# retroShot [![Node 10](https://img.shields.io/badge/node-v10.0-orange)](https://nodejs.org/en/download/releases/) [![API Docs](https://img.shields.io/badge/api%20docs-passing-green)](https://documenter.getpostman.com/view/4309917/TVenfoyk)

Final project for CS 375. Based around the popular subreddit [`r/OldSchoolCool`](https://www.reddit.com/r/OldSchoolCool/) where images are gathered and the user is asked to guess the year.

## Resources

- [API Documentation](https://documenter.getpostman.com/view/4309917/TVenfoyk)
- [`node` Download](https://nodejs.org/en/download/releases/)
- [`yarn` Install](https://yarnpkg.com/getting-started/install)
- [`r/OldSchoolCool`](https://www.reddit.com/r/OldSchoolCool/)

## Install

This project uses `Yarn` Workspaces.

```sh
yarn
```

## Functions

```sh
yarn functions
```

## Docs

```js
let shot = {
  postId: 123,
  user: "user123",
  url: "https://...",
  year: 2019,
  // If year is none decade will be used, if neither an error will be thrown
  decade: "2010s",
};
```
