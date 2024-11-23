// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./utils/logger'); // Custom logger
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Import routes
const apiRoutes = require('./routes/api');

// Load environment variables from .env file
dotenv.config();

// Create Express app instance
const app = express();

// Middlewares
app.use(cors()); // Enable Cross-Origin Request Sharing
app.use(helmet()); // Security middleware to set HTTP headers
app.use(express.json()); // Parse incoming JSON requests
app.use(morgan('dev')); // HTTP request logger middleware

// Routes
app.use('/api', apiRoutes); // All the API routes

// Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({ message: err.message });
});

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Error connecting to MongoDB: ', error.message);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Start the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  connectDB(); // Connect to the database when the server starts
});