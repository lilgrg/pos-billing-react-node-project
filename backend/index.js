const express = require('express');  
const dotenv = require('dotenv');  
const cors = require('cors');  
const bodyParser = require('body-parser');  

dotenv.config();  

const app = express();  
const port = process.env.PORT || 5000;  

// Middleware  
app.use(cors());  
app.use(bodyParser.json());  

// API routes  
app.use('/api', require('./routes/api'));  

// Start server  
app.listen(port, () => {  
  console.log(`Server is running on http://localhost:${port}`);  
});  