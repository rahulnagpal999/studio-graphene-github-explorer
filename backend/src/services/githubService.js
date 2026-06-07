const axios = require('axios');

const GITHUB_API_URL = 'https://api.github.com/users';

// Configure axios instance for GitHub API
const githubAPI = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

// If a GitHub token is provided in env, use it to increase rate limits
if (process.env.GITHUB_TOKEN) {
  githubAPI.defaults.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
}

/**
 * Fetch user profile from GitHub
 * @param {string} username 
 * @returns {Promise<Object>}
 */
const getUserProfile = async (username) => {
  const response = await githubAPI.get(`/${username}`);
  return response.data;
};

/**
 * Fetch user repositories from GitHub
 * @param {string} username 
 * @returns {Promise<Array>}
 */
const getUserRepositories = async (username) => {
  const response = await githubAPI.get(`/${username}/repos?per_page=100&sort=updated`);
  return response.data;
};

module.exports = {
  getUserProfile,
  getUserRepositories
};
