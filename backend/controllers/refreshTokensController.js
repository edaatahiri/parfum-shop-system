const prisma = require("../config/db");

exports.createRefreshTokens = async (req, res) => {
  try {
    const { user_id, token, expires } = req.body;

    const data = await prisma.refreshtokens.create({
      data: {
        user_id,
        token,
        expires: new Date(expires),
      },
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRefreshTokens = async (req, res) => {
  try {
    const data = await prisma.refreshtokens.findMany({
      include: { user: true },
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRefreshTokensById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.refreshtokens.findUnique({
      where: { id },
      include: { user: true },
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateRefreshTokens = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.refreshtokens.update({
      where: { id },
      data: req.body,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteRefreshTokens = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.refreshtokens.delete({
      where: { id },
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
