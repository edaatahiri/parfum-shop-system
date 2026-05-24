const prisma = require("../config/db");

exports.toggleWishlist = async (req, res) => {
  try {
    const userId = parseInt(req.body.user_id);
    const parfum_id = parseInt(req.body.parfum_id);

    if (!userId || !parfum_id) {
      return res
        .status(400)
        .json({ error: "user_id dhe parfum_id janë të detyrueshme!" });
    }

    const klienti = await prisma.klientet.findUnique({
      where: { user_id: userId },
    });

    if (!klienti) {
      return res
        .status(404)
        .json({ error: "Nuk u gjet asnjë profil klienti për këtë përdorues!" });
    }

    const klient_id = klienti.id;

    const existingItem = await prisma.wishlist.findFirst({
      where: {
        klient_id: klient_id,
        parfum_id: parfum_id,
      },
    });

    if (existingItem) {
      await prisma.wishlist.delete({
        where: { id: existingItem.id },
      });
      return res
        .status(200)
        .json({ message: "U hoq nga wishlist", action: "removed" });
    } else {
      const newItem = await prisma.wishlist.create({
        data: {
          klient_id: klient_id,
          parfum_id: parfum_id,
        },
      });
      return res.status(201).json({
        message: "U shtua në wishlist",
        action: "added",
        item: newItem,
      });
    }
  } catch (err) {
    console.log("Gabimi konkret ne Backend:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getKlientWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const klienti = await prisma.klientet.findUnique({
      where: { user_id: parseInt(userId) },
    });

    if (!klienti) {
      return res.status(200).json([]);
    }

    const listat = await prisma.wishlist.findMany({
      where: { klient_id: klienti.id },
      include: {
        parfumi: true,
      },
    });
    res.status(200).json(listat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
