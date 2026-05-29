const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Ploteso te gjitha fushat",
      });
    }

    // TODO: per me pershtat userRoleName, ky query me poshte duhet me u rregullu
    // Kërkojmë përdoruesin sipas email-it duke përfshirë rolet
    const user = await prisma.users.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User nuk ekziston",
      });
    }

    // Krahasimi i fjalëkalimit
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Password gabim",
      });
    }

    // Marrim emrin e rolit të parë (p.sh. "Admin" ose "User")
    const userRoleName = user.userRoles?.[0]?.role?.emertimi || "Client";

    // 1. Gjenerojmë ACCESS TOKEN (JWT) - valid për 15 minuta
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: userRoleName,
        emri: user.emri, //
        mbiemri: user.mbiemri, //
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    // 2. Gjenerojmë REFRESH TOKEN (String i gjatë unik)
    const refreshTokenString = crypto.randomBytes(40).toString("hex");

    // Vendosim skadimin e Refresh Token për 7 ditë
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 7);

    // 3. E ruajmë Refresh Token-in në tabelën e databazës siç kërkohet nga profesori
    await prisma.refreshTokens.create({
      data: {
        user_id: user.id,
        token: refreshTokenString,
        expires: expiresDate,
      },
    });

    // Kthejmë të dhënat në frontend së bashku me tokenat
    return res.status(200).json({
      message: "Login me sukses",
      accessToken,
      refreshToken: refreshTokenString,
      user: {
        id: user.id,
        email: user.email,
        role: userRoleName,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { loginUser };
