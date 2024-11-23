const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
const loadEnv = () => {
  const result = dotenv.config({
    path: path.resolve(__dirname, '../.env'),
  });

  if (result.error) {
    console.error('Error loading .env file:', result.error.message);
    process.exit(1); // Exit process with failure
  }

  console.log('.env file loaded successfully');
};

// Export function for use in other parts of the application
module.exports = loadEnv;