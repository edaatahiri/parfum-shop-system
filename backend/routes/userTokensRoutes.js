const express = require("express");

const {
  getUserTokens,
  createUserToken,
  deleteUserToken,
} = require("../controllers/userTokensController");

const router = express.Router();

router.get("/", getUserTokens);
router.post("/", createUserToken);
router.delete("/:id", deleteUserToken);

module.exports = router;