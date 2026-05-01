const express = require("express");
const cors = require("cors");

const refreshTokensRoutes = require("./routes/refreshTokensRoutes");
const userTokensRoutes = require("./routes/userTokensRoutes");
const userClaimsRoutes = require("./routes/userClaimsRoutes");
const puntoretRoutes = require("./routes/punetoretRoutes");
const shitjetRoutes = require("./routes/shitjetRoutes");
const porositFurnitoreveRoutes = require("./routes/porositeFurnitoreveRoutes");
const detajetShitjesRoutes = require("./routes/detajetShitjesRoutes");
const detajetPorosisRoutes = require("./routes/detajetPorosiseRoutes");

const furnitoretRoutes = require("./routes/furnitoretRoutes");

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

app.use("/api/refresh-tokens", refreshTokensRoutes);
app.use("/api/user-tokens", userTokensRoutes);
app.use("/api/user-claims", userClaimsRoutes);
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
app.use("/api/furnitoret", furnitoretRoutes);
app.use("/api/puntoret", puntoretRoutes);
app.use("/api/shitjet", shitjetRoutes);
app.use("/api/porosit-furnitoreve", porositFurnitoreveRoutes);
app.use("/api/detajet-shitjes", detajetShitjesRoutes);
app.use("/api/detajet-porosis", detajetPorosisRoutes);

app.get("/", (req, res) => {
  res.send("Backend punon");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});