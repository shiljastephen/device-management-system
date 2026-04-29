const http = require("http");
require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");
const { Server } = require("socket.io");
const { registerDeviceSocket } = require("./src/sockets/device.socket");

connectDB();

const server = http.createServer(app);

// Socket setup
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// make io globally available
app.set("io", io);

// ✅ use centralized socket handler
registerDeviceSocket(io);

// 🔥 Background job (auto offline)
setInterval(async () => {
  const Device = require("./src/models/device.model");

  const now = Date.now();
  const devices = await Device.find();

  for (let device of devices) {
    if (now - device.lastSeen > 10000) {
      if (device.status !== "offline") {
        device.status = "offline";
        await device.save();

        io.emit("deviceUpdated", device);
      }
    }
  }
}, 5000);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});