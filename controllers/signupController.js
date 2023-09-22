const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const saltRounds = 10;


const Signup = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
  
      if (email === "" || password === "" || name === "") {
        res.status(400).json({ message: "Provide email, password and name" });
        return;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Provide a valid email address." });
        return;
      }
  
      const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      if (!passwordRegex.test(password)) {
        res.status(400).json({
          message:
            "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
        });
        return;
      }
  
      const foundUser = await User.findOne({ email });
  
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }
  
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      const createdUser = await User.create({ email, password: hashedPassword, name });
  
      const { _id } = createdUser;
  
      const user = { email, name, _id };
  
      res.status(201).json({ user });
    } catch (error) {
      console.log(error);
    }
  };
  

module.exports = {
    Signup
}
