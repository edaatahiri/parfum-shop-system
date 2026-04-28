const prisma = require("../config/db");


exports.createRefreshToken = async (req, res) => {
  try {
    const { user_id, token, expires } = req.body;

    const data = await prisma.refreshTokens.create({
      data: {
        user_id,
        token,
        expires: new Date(expires)
      }
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getRefreshTokens = async (req, res) => {
  try {
    const data = await prisma.refreshTokens.findMany({
      include: { user: true }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getRefreshTokenById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.refreshTokens.findUnique({
      where: { id },
      include: { user: true }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateRefreshToken = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.refreshTokens.update({
      where: { id },
      data: req.body
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteRefreshToken = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.refreshTokens.delete({
      where: { id }
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};