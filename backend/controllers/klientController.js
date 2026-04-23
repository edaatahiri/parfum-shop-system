const prisma = require("../config/db");

exports.createKlient = async (req, res) => {
  try {
    const klient = await prisma.klientet.create({
      data: {
        emri: req.body.emri,
        mbiemri: req.body.mbiemri,
        telefoni: req.body.telefoni,
        email: req.body.email,
        data_lindjes: new Date(req.body.data_lindjes),
        gjinia: req.body.gjinia,
        adresa: req.body.adresa,
        data_regjistrimit: req.body.data_regjistrimit
          ? new Date(req.body.data_regjistrimit)
          : new Date(),
        piket_besnikerise: parseInt(req.body.piket_besnikerise) || 0,
      },
    });
    res.status(201).json(klient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllKlientet = async (req, res) => {
  try {
    const klientet = await prisma.klientet.findMany();
    res.json(klientet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateKlient = async (req, res) => {
  try {
    const updated = await prisma.klientet.update({
      where: { id: parseInt(req.params.id) },
      data: {
        ...req.body,
        data_lindjes: req.body.data_lindjes
          ? new Date(req.body.data_lindjes)
          : undefined,
        data_regjistrimit: req.body.data_regjistrimit
          ? new Date(req.body.data_regjistrimit)
          : undefined,
        piket_besnikerise: req.body.piket_besnikerise
          ? parseInt(req.body.piket_besnikerise)
          : undefined,
      },
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteKlient = async (req, res) => {
  try {
    await prisma.klientet.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Klienti u fshi" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
