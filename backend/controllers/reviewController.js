const prisma = require("../config/db");

exports.createReview = async (req, res) => {
  try {
    const rating = parseInt(req.body.rating);
    const komenti = req.body.komenti;
    const klient_id = parseInt(req.body.klient_id);
    const parfum_id = parseInt(req.body.parfum_id);
    const dataReview = req.body.data ? new Date(req.body.data) : new Date();

    const klientIdSpecifik = parseInt(req.body.klient_id) || 4;

    let klientiEkziston = await prisma.klientet.upsert({
      where: { id: klientIdSpecifik },
      update: {},
      create: {
        id: klientIdSpecifik,
        emri: "Klient",
        mbiemri: "Online",
        email: `user_${klientIdSpecifik}_${Date.now()}@parfumshop.com`,
        data_lindjes: new Date("2000-01-01T00:00:00.000Z"),
        gjinia: "Unisex",
        adresa: "Online Store",
        telefoni: "000000000",
      },
    });
    const parfumId = parseInt(req.body.parfum_id);

    if (!parfumId) {
      return res.status(400).json({ error: "parfum_id mungon" });
    }

    // 2. Krijojmë komentin duke e lidhur me klientin e mësipërm
    const review = await prisma.reviews.create({
      data: {
        rating: parseInt(req.body.rating) || 5,
        komenti: req.body.komenti || "Koment i ri",
        data: new Date(),

        // Lidhja me Klientet (përdor 'id' sepse ashtu e ka tabela Klientet)
        klientet: {
          connect: { id: klientiEkziston.id },
        },

        // Lidhja me Parfumin (përdor 'parfum_id' sepse ashtu e ka tabela e Parfumeve)
        parfum: {
          connect: { parfum_id: parfumId },
        },
      },
    });

    res.status(201).json(review);
  } catch (err) {
    console.error("Gabim te krijimi i komentit:", err);
    res.status(400).json({ error: err.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.reviews.findMany({
      include: {
        klientet: true,
        parfum: true,
      },
    });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.reviews.delete({
      where: { review_id: parseInt(id) },
    });
    res.status(200).json({ message: "Review u fshi me sukses" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
