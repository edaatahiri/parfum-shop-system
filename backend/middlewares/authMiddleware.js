const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ error: "Qasja u refuzua! Nuk u gjet asnje token." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ error: "Tokeni nuk eshte i vlefshem ose ka skaduar!" });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res
      .status(403)
      .json({ error: "E ndaluar! Nuk u gjet asnje rol per kete perdorues." });
  }

  if (req.user.role.trim().toLowerCase() === "admin") {
    next();
  } else {
    return res.status(403).json({
      error: "E ndaluar! Kjo zone lejohet vetem per Administratoret.",
    });
  }
};

const isManagment = (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(403).json({ error: "E ndaluar! Nuk u gjet asnje rol." });
  }

  const role = req.user.role.trim().toLowerCase();
  if (role === "admin" || role === "manager") {
    next();
  } else {
    return res.status(403).json({
      error: "E ndaluar! Kjo zone lejohet vetem per Admin dhe Manager.",
    });
  }
};

const isWorker = (req, res, next) => {
  if (!req.user || !req.user.role) {
    return res.status(403).json({ error: "No role found for this user." });
  }

  const role = req.user.role.trim().toLowerCase();

  if (role === "admin" || role === "manager" || role === "staff") {
    next();
  } else {
    return res.status(403).json({ error: "Only for the staff." });
  }
};

module.exports = { verifyToken, isAdmin, isManagment, isWorker };
