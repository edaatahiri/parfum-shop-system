const prisma = require("../config/db");

exports.createUser = async (req, res) => {
  try {
    const user = await prisma.users.create({
      data: {
        emri: req.body.emri,
        mbiemri: req.body.mbiemri,
        email: req.body.email,
        password_hash: req.body.password_hash,
        phone_number: req.body.phone_number,
        statusi: req.body.statusi || "Active",
        email_confirmed:
          req.body.email_confirmed === "true" ||
          req.body.email_confirmed === true,
        lockout_enabled:
          req.body.lockout_enabled === "true" ||
          req.body.lockout_enabled === true,
        access_failed_count: parseInt(req.body.access_failed_count) || 0,
        data_krijimit: req.body.data_krijimit
          ? new Date(req.body.data_krijimit)
          : new Date(),
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updated = await prisma.users.update({
      where: { id: parseInt(req.params.id) },
      data: {
        emri: req.body.emri,
        mbiemri: req.body.mbiemri,
        email: req.body.email,
        password_hash: req.body.password_hash,
        phone_number: req.body.phone_number,
        statusi: req.body.statusi,
        access_failed_count: req.body.access_failed_count
          ? parseInt(req.body.access_failed_count)
          : undefined,
        lockout_enabled:
          req.body.lockout_enabled !== undefined
            ? req.body.lockout_enabled === "true" ||
              req.body.lockout_enabled === true
            : undefined,
        email_confirmed:
          req.body.email_confirmed !== undefined
            ? req.body.email_confirmed === "true" ||
              req.body.email_confirmed === true
            : undefined,
        data_krijimit: req.body.data_krijimit
          ? new Date(req.body.data_krijimit)
          : undefined,
      },
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await prisma.users.delete({ where: { id: parseInt(req.params.id) } });
    res.status(200).json({ message: "Përdoruesi u fshi me sukses" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
