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
  if (!req.user || req.user.role !== "Admin") {
    return res
      .status(403)
      .json({
        error: "E ndaluar! Kjo zone lejohet vetem per Administratoret.",
      });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
