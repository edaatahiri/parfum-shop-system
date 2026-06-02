const prisma = require("../config/db");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const {
      emri,
      mbiemri,
      email,
      password,
      phone_number,
      data_lindjes,
      gjinia,
      adresa,
      role,
    } = req.body;

    if (
      !emri ||
      !mbiemri ||
      !email ||
      !password ||
      !data_lindjes ||
      !gjinia ||
      !adresa
    ) {
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

    let assignedRoleId = 4;
    if (role === "Admin") assignedRoleId = 1;
    else if (role === "Manager") assignedRoleId = 2;
    else if (role === "Staff") assignedRoleId = 3;

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
            role_id: assignedRoleId,
          },
        },
        klientProfile: {
          create: {
            emri: emri,
            mbiemri: mbiemri,
            email: email,
            data_lindjes: new Date(data_lindjes),
            gjinia: gjinia,
            adresa: adresa,
            piket_besnikerise: 0,
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
      include: {
        klientet: {
          include: {
            shitjet: {
              orderBy: { data_shitjes: "desc" },
              include: {
                detajet_shitjes: {
                  include: { parfum: true },
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
