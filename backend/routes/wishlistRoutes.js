const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

router.post("/toggle", wishlistController.toggleWishlist);
router.get("/klienti/:klientId", wishlistController.getKlientWishlist);

module.exports = router;
