const express = require('express');
const server = express();
require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');
const cors = require('cors');

const apirouter = require('./Router/agerouter');

const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI;

// --- MongoDB Connection Function ---
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, { // Use MONGO_URI here
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Removed useCreateIndex and useFindAndModify as they are deprecated in Mongoose 6+
    });
    console.log('MongoDB Connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);

    process.exit(1);
  }
};


connectDB();

// --- Middleware Setup ---
server.use(cors()); // Enable CORS for all routes
server.use(express.json()); // Enable parsing of JSON request bodies

// --- API Router ---
server.use('/api', apirouter); // Mount your API router under the /api path

// --- Server Listen ---
server.listen(PORT, () => { // Use PORT here
  console.log(`Server running on port ${PORT}`);
  console.log(`Access API at: http://localhost:${PORT}/api/same`);
});