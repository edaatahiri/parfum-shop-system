const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "UserId është i detyrueshëm!" });
    }

    const storedToken = await prisma.refreshtokens.findFirst({
      where: {
        user_id: parseInt(userId),
        expires: {
          gt: new Date(),
        },
      },
      include: {
        users: {
          include: {
            userroles: {
              include: {
                roles: true,
              },
            },
          },
        },
      },
    });

    console.log("A e gjeti tokenin ?", storedToken);

    if (!storedToken) {
      return res
        .status(403)
        .json({ error: "Session ka skaduar ! Ju lutem kycuni perseri." });
    }

    const userRoleName =
      storedToken.users.userroles?.[0]?.roles?.emertimi || "User";

    const newAccessToken = jwt.sign(
      {
        id: storedToken.users.id,
        email: storedToken.users.email,
        role: userRoleName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    return res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Gabim gjatë rifreskimit të token-it:", error);
    return res.status(500).json({ error: "Ndodhi një gabim në server." });
  }
};

module.exports = { handleRefreshToken };
