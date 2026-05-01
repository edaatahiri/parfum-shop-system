const express = require("express");

const {
  getUserClaims,
  createUserClaims,
  deleteUserClaims,
} = require("../controllers/userClaimsController");

const router = express.Router();

router.get("/", getUserClaims);
router.post("/", createUserClaims);
router.delete("/:id", deleteUserClaims);

module.exports = router;