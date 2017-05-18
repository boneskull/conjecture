# conjecture

> Guess Git author, email address, GitHub username, etc.

This module attempts to gather info from various Git config files, npm, and the host system.

## Requirements

- Node.js v4 or greater

## Install

```bash
$ npm install conjecture --save
```

## Example

```js
// each function returns a Promise
const {guessAuthor, guessEmail, guessGitHubUsername} = require('conjecture');

// guessGitHubUsername takes an optional "email" parameter
Promise.all([guessAuthor(), guessEmail(), guessGitHubUsername()])
  .then(([author, email, githubUsername]) => {
    console.log(author); // Christopher Hiller
    console.log(email); // boneskull@boneskull.com
    console.log(githubUsername); // boneskull  
  });
```

## License

© 2017 [Christopher Hiller](https://boneskull.com).  Licensed Apache-2.0.
