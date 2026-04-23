const express = require("express");
const router = express.Router();
const userRoleController = require("../controllers/userRoleController");

router.post("/", userRoleController.createUserRole);
router.get("/", userRoleController.getAllUserRoles);
router.delete("/:id", userRoleController.deleteUserRole);

module.exports = router;
