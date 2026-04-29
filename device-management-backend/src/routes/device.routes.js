const express = require("express");
const router = express.Router();

const {
  addDevice,
  getDevices,
  updateDevice
} = require("../controllers/device.controller");

const protect = require("../middleware/auth.middleware");

// ✅ REMOVE role middleware completely

router.post("/", protect, addDevice);
router.get("/", protect, getDevices);
router.put("/:id", protect, updateDevice);

module.exports = router;