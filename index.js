'use strict';

const {exec} = require('child_process');
const gitConfigPath = require('git-config-path');
const gitEmail = require('git-user-email');
const githubUsername = require('github-username');
const gitUserName = require('git-user-name');
const username = require('username');
const fullName = require('fullname');

/**
 * Attempts to guess the current user's email address via working copy Git
 * config, global Git config, or npm config.
 * @returns {Promise<string|void>} Email address, if found
 */
function guessEmail () {
  let email;
  try {
    email = gitEmail({path: gitConfigPath()}) ||
      gitEmail({path: gitConfigPath('global')});
  } catch (e) {
    return Promise.reject(e);
  }
  if (email) {
    return Promise.resolve(email);
  }
  return new Promise(resolve => {
    exec('npm config get email', (err, email = '') => {
      if (err) {
        // ignored
        resolve();
      }
      resolve(email.trim() || void 0);
    });
  });
}

/**
 * Returns GitHub username from an email address, if the email address was
 * supplied, and there was a match. Otherwise returns current user's username.
 * @param {string} [email] - Lookup GitHub user by this email
 * @returns {Promise<string|void>} Username, if found
 */
function guessGitHubUsername (email) {
  return Promise.resolve(email || guessEmail())
    .then(githubUsername)
    .catch(() => username());
}

/**
 * Attempts to guess the (real) name of current user from working copy Git
 * username, global Git username, or system full name.
 * @returns {string} Full name of author, if found
 */
function guessAuthor () {
  function getAuthor (path) {
    return path && gitUserName({path});
  }

  return getAuthor(gitConfigPath()) ||
    getAuthor(gitConfigPath('global')) ||
    fullName();
}

module.exports = {
  guessEmail,
  guessGitHubUsername,
  guessAuthor
};
