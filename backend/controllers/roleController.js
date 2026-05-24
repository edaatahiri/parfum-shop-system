const prisma = require("../config/db");

exports.createRole = async (req, res) => {
  try {
    const i_ri = await prisma.roles.create({
      data: {
        emertimi: req.body.emertimi,
        pershkrimi: req.body.pershkrimi,
        normalized_name: req.body.emertimi
          ? req.body.emertimi.toUpperCase()
          : undefined,
      },
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
      data: {
        emertimi: req.body.emertimi,
        pershkrimi: req.body.pershkrimi,
        normalized_name: req.body.emertimi
          ? req.body.emertimi.toUpperCase()
          : undefined,
      },
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const roleId = parseInt(req.params.id);

    if (roleId === 1 || roleId === 2) {
      return res
        .status(400)
        .json({ error: "Rolet kryesore të sistemit nuk mund të fshihen!" });
    }

    await prisma.roles.delete({
      where: { id: roleId },
    });
    res.status(200).json({ message: "Roli u fshi me sukses!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
