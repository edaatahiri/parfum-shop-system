const express = require("express");

const {
  createRefreshTokens,
  getRefreshTokens,
  getRefreshTokensById,
  updateRefreshTokens,
  deleteRefreshTokens,
} = require("../controllers/refreshTokensController");

const router = express.Router();

// CREATE
router.post("/", createRefreshTokens);

// READ ALL
router.get("/", getRefreshTokens);

// READ BY ID
router.get("/:id", getRefreshTokensById);

// UPDATE
router.put("/:id", updateRefreshTokens);

// DELETE
router.delete("/:id", deleteRefreshTokens);

module.exports = router;