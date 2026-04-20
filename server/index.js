// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router/userRouter');

const app = express();
const { PORT, DATABASE } = process.env;

mongoose.connect(DATABASE)
    .then(() => console.log("✅ Database connected successfully"))
    .catch(err => console.log("❌ Connection Error: ", err));

// --- THE FIX: MIDDLEWARE MUST COME BEFORE THE ROUTER ---
app.use(cors({
    origin: "http://localhost:5173", // Remove '/login' - origin is just the base URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json()); 

app.use('/api', router); // Now the router has access to CORS and JSON parsing
// -------------------------------------------------------

app.get('/', (req, res) => res.send("Server is live!"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));