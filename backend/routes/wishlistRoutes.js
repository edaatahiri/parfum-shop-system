const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/toggle", verifyToken, wishlistController.toggleWishlist);
router.get("/:userId", verifyToken, wishlistController.getKlientWishlist);

module.exports = router;
