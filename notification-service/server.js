//connects socket.io
require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');
const { Server } = require('socket.io');
const app = require('./app');
const { setSocketInstance } = require('./controllers/notifications.controller');

const server = http.createServer(app);

async function start() {
  // 1) Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }

  // 2) Create Redis clients for adapter and pub/sub
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  const pubClient = createClient({ url: redisUrl });
  const subClient = pubClient.duplicate();

  pubClient.on('error', (err) => console.error('Redis Pub Client Error', err));
  subClient.on('error', (err) => console.error('Redis Sub Client Error', err));

  await pubClient.connect();
  await subClient.connect();

  // 3) Create Socket.io and attach Redis adapter
  const io = new Server(server, {
    cors: { origin: '*' }
  });

  io.adapter(createAdapter(pubClient, subClient));
  console.log('✅ Socket.io Redis adapter attached');

  // 4) Make io available to controllers
  setSocketInstance(io);

  // 5) Load socket handlers
  require('./sockets')(io);

  
  // 7) Start HTTP server
  const PORT = process.env.PORT || 5004;
  server.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));
}

start().catch((err) => {
  console.error('Startup error', err);
  process.exit(1);
});
