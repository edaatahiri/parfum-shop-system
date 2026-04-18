const db = require("./config/db");
const express = require("express");
const cors = require("cors");

const parfumiRoutes = require("./routes/parfumiRoutes");
const markaRoutes = require("./routes/markaRoutes");
const kategoriRoutes = require("./routes/kategoriRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/parfumet", parfumiRoutes);
app.use("/api/markat", markaRoutes);
app.use("/api/kategorite", kategoriRoutes);

app.get("/", (req, res) => {
  res.send("Backend punon");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
