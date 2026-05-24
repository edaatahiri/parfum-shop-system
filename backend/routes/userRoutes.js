const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");
const prisma = require("../config/db");

router.post("/register", userController.register);

router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      orderBy: {
        data_krijimit: "desc",
      },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/profile", verifyToken, userController.getProfile);

module.exports = router;
