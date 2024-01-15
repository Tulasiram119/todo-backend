const User = require("../model/User");
const bcrypt = require("bcrypt");
const registerController = async (req, res) => {
  const email = req.body?.email;
  const username = req.body?.username;
  const password = req.body?.password;
  console.log(req.body);
  if (!email || !username || !password) {
    return res.status(400).json({ message: "Required fields are missing" });
  }
  try {
    const duplicate = await User.findOne({ email }).exec();

    if (duplicate) {
      return res
        .status(409)
        .json({ message: "Yuo already has account with us" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(result);
    return res.status(201).json({ message: "Created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerController;
