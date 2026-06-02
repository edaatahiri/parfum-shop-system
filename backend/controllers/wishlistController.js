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

    const existingItem = await prisma.wishlist.findFirst({
      where: {
        user_id: userId,
        parfum_id: parfum_id,
      },
    });

    if (existingItem) {
      await prisma.wishlist.delete({
        where: {
          user_id_parfum_id: {
            user_id: userId,
            parfum_id: parfum_id,
          },
        },
      });
      return res
        .status(200)
        .json({ message: "U hoq nga wishlist", action: "removed" });
    } else {
      const newItem = await prisma.wishlist.create({
        data: {
          user_id: userId,
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

    console.log("Duke marrë wishlist për user-in:", userId);

    const listat = await prisma.wishlist.findMany({
      where: { user_id: parseInt(userId) },
      include: {
        parfum: true,
      },
    });
    console.log("Wishlist u gjet me sukses, numri i artikujve:", listat.length);
    res.status(200).json(listat);
  } catch (err) {
    console.error("GABIMI I PRISMA-s:", err);
    res.status(500).json({ error: err.message });
  }
};
