const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const authRoutes = require("./routes/auth.routes");
const deviceRoutes = require("./routes/device.routes");

app.use("/api/auth", authRoutes);
app.use("/api/devices", deviceRoutes);

module.exports = app;