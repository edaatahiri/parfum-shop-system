const express = require("express");
const router = express.Router();
const userRoleController = require("../controllers/userRoleController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/", verifyToken, userRoleController.createUserRole);
router.get("/", verifyToken, userRoleController.getAllUserRoles);
router.delete("/:id", verifyToken, userRoleController.deleteUserRole);

module.exports = router;
