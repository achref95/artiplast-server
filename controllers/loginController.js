const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");


const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
  
    if (username === "" || password === "") {
      res.status(400).json({ message: "Provide username and password." });
      return;
    }
  
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      res.status(401).json({ message: "User not found." });
      return;
    }
  
    const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
  
    if (passwordCorrect) {
      const { _id, username} = foundUser;
  
      const payload = { _id, username };
      console.log(payload)
  
      const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "1h",
      });
  
      res.status(200).json({ authToken });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login
};
