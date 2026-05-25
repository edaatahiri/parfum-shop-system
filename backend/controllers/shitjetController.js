const prisma = require("../config/db");

exports.createShitje = async (req, res) => {
  try {
    const userIdFromToken = req.user.id; 
    const userEmail = req.user.email;

    if (!userIdFromToken || !userEmail) {
      return res.status(401).json({ error: "I paautorizuar! Të dhënat e përdoruesit mungojnë në token." });
    }

    const userEmri = req.user.emri && req.user.emri.trim() !== "" ? req.user.emri : "Përdorues";
    const userMbiemri = req.user.mbiemri && req.user.mbiemri.trim() !== "" ? req.user.mbiemri : "Sistemi";

    // 1. Kontrollojmë/Krijojmë Klientet sipas Email-it
    let klienti = await prisma.klientet.findUnique({
      where: { email: userEmail },
    });

    if (!klienti) {
      klienti = await prisma.klientet.create({
        data: {
          emri: userEmri,
          mbiemri: userMbiemri,
          email: userEmail, 
          data_lindjes: new Date("2000-01-01"), 
          gjinia: "Unisex",
          adresa: "Online Store",
          piket_besnikerise: 0
        }
      });
    }

    // 2. Gjejmë punëtorin sipas email-it të Adminit logged-in
    let punetori = await prisma.punetoret.findFirst({
      where: { email: userEmail } 
    });

    // Nëse ky Admin/User nuk ekziston ende te tabela Punetoret, e krijojmë automatikisht
    if (!punetori) {
      punetori = await prisma.punetoret.create({
        data: {
          emri: userEmri,
          mbiemri: userMbiemri,
          email: userEmail,
          pozita: req.user.role === "Admin" ? "Administrator" : "Online Sales",
          paga: req.user.role === "Admin" ? 1000.0 : 500.0,
          telefoni: "044000000",
          data_punesimit: new Date() // KJO SHTOHET: I jep datën dhe kohën e saktë të tanishme
        }
      });
    }

    // Përdorim 'punetor_id' si ID në tabelën tënde sipas skemës suaj
    const punetorId = punetori.punetor_id || punetori.id;

    // 3. Krijojmë rekordet e shitjes me ID-në e saktë të punëtorit të gjetur/krijuar
    const novaShitje = await prisma.shitjet.create({
      data: {
        klient_id: klienti.id,        
        punetor_id: punetorId,       
        data_shitjes: new Date(req.body.data_shitjes || new Date()),
        shuma_totale: parseFloat(req.body.shuma_totale),
        zbritja: parseFloat(req.body.zbritja || 0),
        metoda_pageses: req.body.metoda_pageses || "Cash",
      },
    });

    res.status(201).json({
      message: "Shitja u krijua me sukses!",
      shitjeId: novaShitje.shitje_id,
      id: novaShitje.shitje_id,
      ...novaShitje
    });

  } catch (err) {
    console.error("Gabim në createShitje:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getShitjet = async (req, res) => {
  try {
    const data = await prisma.shitjet.findMany({
      include: {
        klient: true,
        punetor: true,
        detajet: {
          include: {
            parfum: true,
          },
        },
      },
      orderBy: {
        data_shitjes: "desc",
      },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

exports.updateShitje = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await prisma.shitjet.update({
      where: { shitje_id: id },
      data: req.body,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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