const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const prisma = require("../config/db");

router.post("/register", userController.register);

router.get("/", async (req, res) => {
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

module.exports = router;
