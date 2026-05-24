const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/", reviewController.getAllReviews);
router.post("/", verifyToken, reviewController.createReview);
router.delete("/:id", verifyToken, reviewController.deleteReview);

module.exports = router;
