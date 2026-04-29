const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["mobile", "laptop"],
    required: true
  },
  status: {
    type: String,
    enum: ["online", "offline"],
    default: "offline"
  },
  battery: {
    type: Number,
    default: 100
  },
  lastSeen: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Device", deviceSchema);