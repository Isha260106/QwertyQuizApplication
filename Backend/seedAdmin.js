require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin.js"); 

mongoose.connect(process.env.CONNECTION_STRING)
  .then(async () => {
    const hashedPassword = await bcrypt.hash("12345", 10);
    await Admin.create({ username: "qwerty.i/o", password: hashedPassword });
    console.log("✅ Admin user created");
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
