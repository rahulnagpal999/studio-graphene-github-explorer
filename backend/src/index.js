require('dotenv').config();
const express = require('express');
const cors = require('cors');
const githubRoutes = require('./routes/githubRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/github', githubRoutes);

// Base route for health check
app.get('/', (req, res) => {
  res.send('GitHub Repo Explorer API is running');
});

// Error handling middleware (must be after routes)
app.use(errorHandler);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
