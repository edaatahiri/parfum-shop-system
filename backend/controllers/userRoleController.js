const prisma = require("../config/db");

exports.createUserRole = async (req, res) => {
  try {
    const userRole = await prisma.userRoles.create({
      data: {
        user_id: parseInt(req.body.user_id),
        role_id: parseInt(req.body.role_id),
      },
    });
    res.status(201).json(userRole);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUserRoles = async (req, res) => {
  try {
    const list = await prisma.userRoles.findMany({
      include: {
        users: true,
        roles: true,
      },
    });
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.userRoles.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Roli u hoq nga përdoruesi" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
