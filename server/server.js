require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');                    // ◄ 1. Add this
const { Server } = require('socket.io');        // ◄ 2. Add this
const connectDB = require('./config/db.js');
const Message = require('./models/Message.js'); // Import the Message model

// Increase limits to handle large Base64 image strings cleanly
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
const server = http.createServer(app);
connectDB(); // Initialize MongoDB connection

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Configure Socket.io with clean CORS cross-origin rules
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Matches your Vite dev server port
    methods: ["GET", "POST"],
    credentials: true
  }
});

const onlineUsers = new Map();

io.on('connection', (socket) => {
  socket.on('registerUser', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('sendMessage', async ({ senderId, recipientId, text }) => {
    try {
      const newMessage = await Message.create({
        sender: senderId,
        recipient: recipientId,
        text: text
      });

      // ◄ FIXED: Pull active socket channel from mapping tracking tool
      const recipientSocketId = onlineUsers.get(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('receiveMessage', newMessage);
      }
    } catch (error) {
      console.error("Socket error processing message:", error);
    }
  });

  socket.on('disconnect', () => {
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) onlineUsers.delete(userId);
    }
  });
});


app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

// Base Check-In Route
app.get('/', (req, res) => {
  res.json({ success: true, message: "Qupit Agent V2 Core is alive and connected." });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Qupit Agent V2 Engine accelerating cleanly on port ${PORT}`);
});