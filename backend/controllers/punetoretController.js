const prisma = require("../config/db");


exports.createPunetor = async (req, res) => {
  try {
    const {
      emri,
      mbiemri,
      pozita,
      telefoni,
      email,
      data_punesimit,
      paga
    } = req.body;

    if (!emri || !mbiemri || !pozita) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const punetor = await prisma.punetoret.create({
      data: {
        emri,
        mbiemri,
        pozita,
        telefoni,
        email,
        data_punesimit,
        paga
      }
    });

    res.status(201).json(punetor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getPunetoret = async (req, res) => {
  try {
    const punetoret = await prisma.punetoret.findMany();
    res.json(punetoret);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getPunetorById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const punetor = await prisma.punetoret.findUnique({
      where: { punetor_id: id }
    });

    if (!punetor) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(punetor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updatePunetor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const updated = await prisma.punetoret.update({
      where: { punetor_id: id },
      data: req.body
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deletePunetor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.punetoret.delete({
      where: { punetor_id: id }
    });

    res.json({ message: "Punetori u fshi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};