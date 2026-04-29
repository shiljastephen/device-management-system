const Device = require("../models/device.model");

// store deviceId → socketId
const connectedDevices = new Map();

const registerDeviceSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Device connected:", socket.id);

    // 🔥 Register device
    socket.on("register-device", async (deviceId) => {
      connectedDevices.set(deviceId, socket.id);

      await Device.findByIdAndUpdate(deviceId, {
        status: "online",
        lastSeen: new Date(),
      });

      console.log(`Device ${deviceId} is online`);
    });

    // 🔥 Heartbeat
    socket.on("heartbeat", async (data) => {
      try {
        const { deviceId, battery } = data;

        const updatedDevice = await Device.findByIdAndUpdate(
          deviceId,
          {
            battery,
            status: "online",
            lastSeen: new Date(),
          },
          { new: true }
        );

        io.emit("deviceUpdated", updatedDevice);
      } catch (err) {
        console.error(err.message);
      }
    });

    // 🔥 Disconnect → mark offline
    socket.on("disconnect", async () => {
      for (let [deviceId, sockId] of connectedDevices) {
        if (sockId === socket.id) {
          connectedDevices.delete(deviceId);

          const device = await Device.findByIdAndUpdate(
            deviceId,
            {
              status: "offline",
              lastSeen: new Date(),
            },
            { new: true }
          );

          io.emit("deviceUpdated", device);

          console.log(`Device ${deviceId} is offline`);
          break;
        }
      }
    });
  });
};

module.exports = { registerDeviceSocket, connectedDevices };