const Admin=require('../models/Admin')
const bcrypt=require('bcrypt')
const loginAdmin=async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Admin.findOne({ username });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    res.json({ success: true, message: "Login successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports={loginAdmin}