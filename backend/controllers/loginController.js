const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Ploteso te gjitha fushat",
      });
    }

    // 🔥 USER FETCH
    const user = await prisma.User.findUnique({
      where: { email },
      include: {
        role: true, // vetëm nëse ke relation User -> Role
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User nuk ekziston",
      });
    }

    // ⚠️ password check (nëse s’ke bcrypt)
    if (user.password !== password) {
      return res.status(400).json({
        message: "Password gabim",
      });
    }

    return res.status(200).json({
      message: "Login me sukses",
      user: {
        id: user.id,
        email: user.email,
        role: user.role?.name || user.role, // support 2 struktura
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