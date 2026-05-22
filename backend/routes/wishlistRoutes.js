const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

router.post("/toggle", wishlistController.toggleWishlist);
router.get("/:userId", wishlistController.getKlientWishlist);

module.exports = router;
