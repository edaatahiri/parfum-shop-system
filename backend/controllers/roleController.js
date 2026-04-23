const prisma = require("../config/db");

exports.createRole = async (req, res) => {
  try {
    const i_ri = await prisma.roles.create({
      data: req.body,
    });
    res.status(201).json(i_ri);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const rolet = await prisma.roles.findMany();
    res.status(200).json(rolet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const updated = await prisma.roles.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    await prisma.roles.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(200).json({ message: "Roli u fshi!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
