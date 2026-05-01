const prisma = require("../config/db");

exports.createReview = async (req, res) => {
  try {
    const review = await prisma.reviews.create({
      data: {
        rating: parseInt(req.body.rating),
        komenti: req.body.komenti,
        data: req.body.data ? new Date(req.body.data) : new Date(),
        klient_id: parseInt(req.body.klient_id),
        parfum_id: parseInt(req.body.parfum_id),
      },
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.reviews.findMany({
      include: {
        klient: true,
        parfumi: true,
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
    res.status(200).json({ message: "Vlerësimi u fshi me sukses" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
