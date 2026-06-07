const { getUserProfile, getUserRepositories } = require('../services/githubService');

/**
 * Get GitHub User Profile and Repositories
 * @route GET /api/github/:username
 */
const getUserData = async (req, res, next) => {
  try {
    const { username } = req.params;

    // Fetch user profile and repositories concurrently to save time
    const [profile, repositories] = await Promise.all([
      getUserProfile(username),
      getUserRepositories(username)
    ]);

    res.status(200).json({
      success: true,
      data: {
        profile,
        repositories
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserData
};
