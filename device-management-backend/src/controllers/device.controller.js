const Device = require("../models/device.model");

// Add device
exports.addDevice = async (req, res) => {
  try {
    const device = await Device.create({
      ...req.body,
      userId: req.user.id
    });
    if (!name || !type) {
      return res.status(400).json({
        message: "Name and type required",
      });
    }
    const io = req.app.get("io");
    io.emit("deviceAdded", device);

    res.status(201).json({
      message: "Device added",
      device
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(req.body);
  }
};

// Get all devices for logged-in user
exports.getDevices = async (req, res) => {
  try {
    const devices = await Device.find({ userId: req.user.id })
    .select("-__v");

    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateDevice = async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        lastSeen: Date.now()
      },
      { returnDocument: "after" }
    );

    const io = req.app.get("io");

    io.emit("deviceUpdated", device);

    res.json(device);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};