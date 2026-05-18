const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs"); // Ky rresht duhet patjetër!

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Ploteso te gjitha fushat",
      });
    }

    // Kërkojmë përdoruesin sipas email-it në tabelën 'users'
    const user = await prisma.users.findUnique({
      where: { email },
      include: {
        userRoles: {
          include: {
            role: true
          }
        }
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User nuk ekziston",
      });
    }

    // Kjo është pjesa kryesore: krahason fjalëkalimin e thjeshtë me hash-in nga DB
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Password gabim",
      });
    }

    // Marrim emrin e rolit të parë (p.sh. "Admin")
    const userRoleName = user.userRoles?.[0]?.role?.emertimi || "User";

    return res.status(200).json({
      message: "Login me sukses",
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