const prisma = require("../config/db");

// CREATE SHITJE
// CREATE SHITJE
exports.createShitje = async (req, res) => {
  try {
    const userId = req.user?.id;
    const email = req.user?.email;
    const shuma = parseFloat(req.body.shuma_totale);

    if (isNaN(shuma)) return res.status(400).json({ error: "Shuma totale e pavlefshme" });

    // 1. Gjej klientin duke përdorur 'id' siç është në schema
    let klienti = await prisma.klientet.findFirst({
      where: { user_id: userId },
    });

    if (!klienti) {
      klienti = await prisma.klientet.findUnique({ where: { email } });
    }

    if (!klienti) {
      klienti = await prisma.klientet.create({
        data: {
          emri: req.user?.emri || "User",
          mbiemri: req.user?.mbiemri || "System",
          email: email,
          data_lindjes: new Date("2000-01-01"),
          gjinia: "Unisex",
          adresa: "Online",
          user_id: userId,
        },
      });
    }

    // 2. Punëtori
    let punetori = await prisma.punetoret.findFirst();
    const punetorId = punetori ? punetori.punetor_id : 1; 

    // 3. KRIJO SHITJEN
    // KËTU ËSHTË NDRYSHIMI: Përdorim 'klienti.id' jo 'klienti.klient_id'
    const newShitje = await prisma.shitjet.create({
      data: {
        klient_id: klienti.id,      // Përdor 'id' e marrë nga tabela 'klientet'
        punetor_id: punetorId, 
        data_shitjes: new Date(),
        shuma_totale: shuma,
        metoda_pageses: "Cash",
        zbritja: 0.0
      },
    });

    return res.status(201).json({
      message: "Shitja u krijua me sukses",
      shitjeId: newShitje.shitje_id,
    });

  } catch (err) {
    console.error("--- GABIMI I PLOTE NGA PRISMA ---", err);
    return res.status(500).json({ 
      error: "Gabim ne server", 
      message: err.message 
    });
  }
};

// GET ALL SHITJET
exports.getShitjet = async (req, res) => {
  try {
    const data = await prisma.shitjet.findMany({
      include: {
        klientet: true,
        punetoret: true,
        detajet_shitjes: { include: { parfum: true } },
      },
      orderBy: { data_shitjes: "desc" },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BY ID
exports.getShitjeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await prisma.shitjet.findUnique({
      where: { shitje_id: id },
      include: { klientet: true, punetoret: true },
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