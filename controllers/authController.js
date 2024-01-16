const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const authController = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ message: "email and password is required" });
  }
  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.sendStatus(401);
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.sendStatus(401);
    }
    const ascessToken = jwt.sign(
      {
        username: foundUser.username,
        email: foundUser.email,
        id: foundUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1hour" }
    );
    return res.json({ ascessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = authController;
