const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

router.post("/", wishlistController.createWishlist);
router.get("/", wishlistController.getAllWishlists);
router.delete("/:id", wishlistController.deleteFromWishlist);

module.exports = router;
