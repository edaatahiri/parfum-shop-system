const express = require("express");
const { loginUser } = require("../controllers/loginController");
const { handleRefreshToken } = require("../controllers/refreshController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/refresh", handleRefreshToken);

module.exports = router;
