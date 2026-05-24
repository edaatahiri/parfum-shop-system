const prisma = require("../config/db");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { emri, mbiemri, email, password, phone_number, role } = req.body;

    if (!emri || !mbiemri || !email || !password) {
      return res.status(400).json({
        error: "All fields except phone number are required!",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format!",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters!",
      });
    }

    const userExists = await prisma.users.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({
        error: "Email already in use!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.users.create({
      data: {
        emri,
        mbiemri,
        email,
        password_hash: hashedPassword,
        phone_number: phone_number || null,
        statusi: "Active",
        userRoles: {
          create: {
            role_id: role === "Admin" ? 1 : 2,
          },
        },
      },
    });

    return res.status(201).json({
      message: "User created successfully!",
      userId: newUser.id,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Server error during registration",
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const userProfile = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        emri: true,
        mbiemri: true,
        email: true,
        phone_number: true,
        data_krijimit: true,
        klientProfile: {
          include: {
            shitjet: {
              orderBy: {
                data_shitjes: "desc",
              },
              include: {
                detajet: {
                  include: {
                    parfum: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!userProfile) {
      return res.status(400).json({ error: "Perdoruesi nuk u gjet!" });
    }
    return res.status(200).json(userProfile);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return res
      .status(500)
      .json({ error: "Gabim ne server gjate ngarkimit te profilit." });
  }
};
