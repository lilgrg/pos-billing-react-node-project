// backend/app.js or server.js (your main Express file)
const express = require('express');
const cors = require('cors');
const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',  // Allow frontend on localhost:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
};

// Enable CORS with options
app.use(cors(corsOptions));

// Sample endpoint
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from backend' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});