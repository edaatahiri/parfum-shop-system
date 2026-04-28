const prisma = require("../config/db");


exports.createUserClaim = async (req, res) => {
  try {
    const { user_id, claim_type, claim_value } = req.body;

    const data = await prisma.userClaims.create({
      data: { user_id, claim_type, claim_value }
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUserClaims = async (req, res) => {
  try {
    const data = await prisma.userClaims.findMany({
      include: { user: true }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUserClaimById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.userClaims.findUnique({
      where: { id },
      include: { user: true }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateUserClaim = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.userClaims.update({
      where: { id },
      data: req.body
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteUserClaim = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.userClaims.delete({
      where: { id }
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};