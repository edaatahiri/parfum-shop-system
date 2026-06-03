const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 
const jwt = require("jsonwebtoken");



const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ error: "Token mungon" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token format gabim" });
    }

    // Përdorim JWT për të dekoduar tokenin që Frontend dërgon
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "super-secret-key"
    );

    // Vendosim të dhënat e përdoruesit në req.user
    req.user = verified;
    
    // Sigurohemi që roli të jetë në formatin që pret isAdmin/isManagment
    req.user.role = (req.user.role || "").toString().toLowerCase();

    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);
    return res.status(403).json({ error: "Token invalid ose i skaduar" });
  }
};




const isAdmin = (req, res, next) => {
  console.log("Roli qe po vjen nga tokeni:", req.user.role);
  try {
    if (!req.user) {
      return res.status(403).json({ error: "No user found" });
    }

    const role = (req.user.role || "").toString().toLowerCase();

    if (req.user.email === "et72862@ubt-uni.net") {
      return next();
    }

    if (role === "admin") {
      return next();
    }

    return res.status(403).json({
      error: "E ndaluar! Vetëm admin.",
    });
  } catch (err) {
    console.error("isAdmin crash:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

const isManagment = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(403).json({ error: "No user" });
    }

    const role = (req.user.role || "").toLowerCase();

    if (req.user.email === "et72862@ubt-uni.net") {
      return next();
    }

    if (role === "admin" || role === "manager") {
      return next();
    }

    return res.status(403).json({ error: "E ndaluar!" });
  } catch (err) {
    console.error("Middleware crash:", err);
    return res.status(500).json({ error: "Middleware error" });
  }
};
module.exports = { verifyToken, isAdmin, isManagment };
