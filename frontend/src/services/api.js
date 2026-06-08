import axios from 'axios';

const api = axios.create({
  baseURL: 'https://github-explorer-backend-uvn8.onrender.com/api/github',
});

export const fetchUserData = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error || 'Failed to fetch user data');
    }
    throw new Error('Network error. Please try again.');
  }
};