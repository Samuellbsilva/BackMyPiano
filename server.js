require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./config/db.js');

// Routes
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const googleAuth = require('./routes/googleAuth.js');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
connectDB();

app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/gauth', googleAuth);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
