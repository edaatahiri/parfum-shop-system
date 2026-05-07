const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email);
    console.log(password);

    if (!email || !password) {
      return res.status(400).json({
        message: "Ploteso te gjitha fushat",
      });
    }

    res.status(200).json({
      message: "Login me sukses",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { loginUser };