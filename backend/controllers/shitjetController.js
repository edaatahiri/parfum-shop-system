const prisma = require("../config/db");

// CREATE SHITJE
exports.createShitje = async (req, res) => {
  try {
    const userId = req.user?.id;
    const email = req.user?.email;
    const role = (req.user?.role || "").toLowerCase();

    if (!userId || !email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const shuma = parseFloat(req.body.shuma_totale);
    if (isNaN(shuma)) {
      return res.status(400).json({ error: "Shuma totale e pavlefshme" });
    }

    // 1. KLienti (gjej ose krijo)
    let klienti = await prisma.klientet.findUnique({
      where: { email },
    });

    if (!klienti) {
      klienti = await prisma.klientet.create({
        data: {
          emri: req.user?.emri || "User",
          mbiemri: req.user?.mbiemri || "System",
          email,
          data_lindjes: new Date("2000-01-01"),
          gjinia: "Unisex",
          adresa: "Online",
          piket_besnikerise: 0,
        },
      });
    }

    // 2. Punëtori (gjej ose krijo)
    let punetori = await prisma.punetoret.findFirst({
      where: { email },
    });

    if (!punetori) {
      punetori = await prisma.punetoret.create({
        data: {
          emri: req.user?.emri || "User",
          mbiemri: req.user?.mbiemri || "System",
          email,
          pozita: role === "admin" ? "Administrator" : "Online Sales",
          paga: role === "admin" ? 1000 : 500,
          telefoni: "000000000",
          data_punesimit: new Date(),
        },
      });
    }

    const punetorId = punetori.punetor_id;

    // 3. CREATE SHITJE
    const shitja = await prisma.shitjet.create({
      data: {
        klient_id: klienti.id,
        punetor_id: punetorId,
        data_shitjes: new Date(),
        shuma_totale: shuma,
        zbritja: parseFloat(req.body.zbritja || 0),
        metoda_pageses: req.body.metoda_pageses || "Cash",
      },
    });

    return res.status(201).json({
      message: "Shitja u krijua me sukses",
      data: shitja,
    });
  } catch (err) {
    console.error("CREATE SHITJE ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};

// GET ALL SHITJET
exports.getShitjet = async (req, res) => {
  try {
    const data = await prisma.shitjet.findMany({
      include: {
        klientet: true,
        punetoret: true,
        detajet_shitjes: {
          include: { parfum: true },
        },
      },
      orderBy: {
        data_shitjes: "desc",
      },
    });

    res.json(data);
  } catch (err) {
    console.error("DEBUG ERROR - getShitjet:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET BY ID
exports.getShitjeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.shitjet.findUnique({
      where: { shitje_id: id },
      include: {
        klient: true,
        punetor: true,
      },
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateShitje = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const updated = await prisma.shitjet.update({
      where: { shitje_id: id },
      data: req.body,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteShitje = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.shitjet.delete({
      where: { shitje_id: id },
    });

    res.json({ message: "Shitja u fshi me sukses" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
