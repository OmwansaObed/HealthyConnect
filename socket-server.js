// Simple Socket.IO server for Next.js (run separately)
const { Server } = require("socket.io");
const http = require("http");

const PORT = process.env.SOCKET_PORT || 4000;
const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // or your frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);
});

// Export a function to emit job notifications
module.exports = {
  io,
  start: () =>
    server.listen(PORT, () =>
      console.log(`Socket.IO server running on port ${PORT}`)
    ),
};

if (require.main === module) {
  server.listen(PORT, () =>
    console.log(`Socket.IO server running on port ${PORT}`)
  );
}
