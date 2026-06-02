const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { userroles, refreshtokens } = require("../config/db");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Ploteso te gjitha fushat",
      });
    }

    const user = await prisma.users.findUnique({
      where: { email },
      include: {
        userroles: {
          include: {
            roles: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User nuk ekziston",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Password gabim",
      });
    }

    const userRoleName = user.userroles?.[0]?.roles?.emertimi || "USER";

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: userRoleName,
        emri: user.emri,
        mbiemri: user.mbiemri,
      },
      process.env.JWT_SECRET || "super-secret-key",
      { expiresIn: "15m" },
    );

    const refreshTokenString = crypto.randomBytes(40).toString("hex");
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 7);

    await prisma.refreshtokens.create({
      data: {
        user_id: user.id,
        token: refreshTokenString,
        expires: expiresDate,
      },
    });

    return res.status(200).json({
      message: "Login me sukses",
      accessToken,
      refreshtoken: refreshTokenString,
      user: {
        id: user.id,
        email: user.email,
        role: userRoleName,
        emri: user.emri || "Admin",
        mbiemri: user.mbiemri || "",
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { loginUser };
