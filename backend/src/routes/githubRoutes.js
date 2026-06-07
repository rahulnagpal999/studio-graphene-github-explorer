const express = require('express');
const router = express.Router();
const { getUserData } = require('../controllers/githubController');
const cacheMiddleware = require('../middleware/cacheMiddleware');

// Route to get GitHub user profile and repos, with 60-second caching
router.get('/users/:username', cacheMiddleware, getUserData);

module.exports = router;
