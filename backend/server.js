const express = require("express");
const cors = require("cors");

const kategoriRoutes = require("./routes/kategoriRoutes");
const markaRoutes = require("./routes/markaRoutes");
const klientRoutes = require("./routes/klientRoutes");
const parfumRoutes = require("./routes/parfumRoutes");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const ofertaRoutes = require("./routes/ofertaRoutes");
const mostraRoutes = require("./routes/mostraRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const userRoleRoutes = require("./routes/userRoleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/kategorite", kategoriRoutes);
app.use("/api/markat", markaRoutes);
app.use("/api/klientet", klientRoutes);
app.use("/api/parfumet", parfumRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/ofertat", ofertaRoutes);
app.use("/api/mostrat", mostraRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/user-roles", userRoleRoutes);

app.get("/", (req, res) => {
  res.send("Backend punon");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
