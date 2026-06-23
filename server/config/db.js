// server/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Attempt to establish a live connection wire
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`💚 MongoDB Connected cleanly: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Failure: ${error.message}`);
        // Terminate the backend app immediately if the database cannot be reached
        process.exit(1); 
    }
};

module.exports = connectDB;