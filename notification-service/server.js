//connects socket.io
require('dotenv').config();
const http = require('http');
const { Server} = require('socket.io');
const app = require('./app.js');
const { setSocketInstance } = require('./controllers/notifications.controller.js')


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin : "*"
  }
});

setSocketInstance(io);

require('./sockets')(io);


const PORT = process.env.PORT || 5004;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})


