// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router/userRouter');
const uploadRoutes = require('./router/upload');
app.use(uploadRoutes);

const app = express();

mongoose.connect(process.env.DATABASE)
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
app.use('/api/letters', require('./router/letterRoutes')); // Ensure letter routes are also registered
// -------------------------------------------------------

app.get('/', (req, res) => res.send("Server is live!"));

app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));