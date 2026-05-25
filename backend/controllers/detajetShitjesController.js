const prisma = require("../config/db");

exports.createDetajShitje = async (req, res) => {
  try {
    // 1. Marrim të dhënat saktësisht siç i dërgon frontend-i yt (shih foton e.PNG)
    const { parfumetId, sasia, cmimi, shitjeld } = req.body;

    // 2. Sigurohemi që vlerat kthehen në numra që Prisma mos të ankohet
    const sasiaNummer = parseInt(sasia || 1);
    const cmimiNjesiNummer = parseFloat(cmimi);
    const cmimiTotalNummer = cmimiNjesiNummer * sasiaNummer;

    // 3. Krijojmë rekordin duke i mapuar fushave të sakta të schema.prisma
    const data = await prisma.detajet_Shitjes.create({
      data: {
        shitje_id: parseInt(shitjeld),       // Lidhja me shitjen kryesore
        parfum_id: parseInt(parfumetId),     // Lidhja me parfumet
        sasia: sasiaNummer,                  // Sasia e parfumit
        cmimi_njesi: cmimiNjesiNummer,       // Çmimi për një njësi (Kjo zgjidh error-in)
        cmimi_total: cmimiTotalNummer        // Çmimi total (sasia * çmimi)
      }
    });

    res.status(201).json(data);
  } catch (err) {
    console.error("Gabim në createDetajShitje:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getDetajet = async (req, res) => {
  try {
    const data = await prisma.detajet_Shitjes.findMany({
      include: {
        shitje: true,
        parfum: true
      }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDetajById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await prisma.detajet_Shitjes.findUnique({
      where: { detal_id: id },
      include: {
        shitje: true,
        parfum: true
      }
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDetaj = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await prisma.detajet_Shitjes.update({
      where: { detal_id: id },
      data: req.body
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDetaj = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.detajet_Shitjes.delete({
      where: { detal_id: id }
    });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};