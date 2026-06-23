// server/server.js
require('dotenv').config(); // ◄ MUST BE LINE 1

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const app = express();

// Fire up the database connection
connectDB();

// Core Parser Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes')); 
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Base Check-In Route
app.get('/', (req, res) => {
    res.json({ success: true, message: "Qupit Agent V2 Core is alive and connected." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Qupit Agent V2 Engine accelerating cleanly on port ${PORT}`);
});