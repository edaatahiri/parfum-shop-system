const db = require("./config/db");
const express = require("express");
const cors = require("cors");

<<<<<<< HEAD
const parfumiRoutes = require("./routes/parfumiRoutes");
const markaRoutes = require("./routes/markaRoutes");
const kategoriRoutes = require("./routes/kategoriRoutes");

=======
>>>>>>> b9da55961dce7bb1fc43c2e16fe69726ca44dbea
const app = express();

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
app.use("/api/parfumet", parfumiRoutes);
app.use("/api/markat", markaRoutes);
app.use("/api/kategorite", kategoriRoutes);

=======
>>>>>>> b9da55961dce7bb1fc43c2e16fe69726ca44dbea
app.get("/", (req, res) => {
  res.send("Backend punon");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
<<<<<<< HEAD
});
=======
});
>>>>>>> b9da55961dce7bb1fc43c2e16fe69726ca44dbea
