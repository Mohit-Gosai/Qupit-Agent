require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // Add this
const cors = require('cors');
const router = require('./router/userRouter');

const app = express();
const { PORT, DATABASE } = process.env; // Use DATABASE from your .env

// 1. Centralized Connection
mongoose.connect(DATABASE)
    .then(() => console.log("✅ Database connected successfully"))
    .catch(err => console.log("❌ Connection Error: ", err));

app.use(express.json());
app.use(cors());
app.use('/api', router);

app.get('/', (req, res) => res.send("Server is live!"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));