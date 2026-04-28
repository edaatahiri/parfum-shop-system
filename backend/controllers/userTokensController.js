const prisma = require("../config/db");


exports.createUserToken = async (req, res) => {
  try {
    const { user_id, login_provider, token_name, token_value } = req.body;

    const data = await prisma.userTokens.create({
      data: { user_id, login_provider, token_name, token_value }
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUserTokens = async (req, res) => {
  try {
    const data = await prisma.userTokens.findMany({
      include: { user: true }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUserTokenById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.userTokens.findUnique({
      where: { id },
      include: { user: true }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateUserToken = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.userTokens.update({
      where: { id },
      data: req.body
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteUserToken = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.userTokens.delete({
      where: { id }
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};