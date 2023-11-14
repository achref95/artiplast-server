const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const saltRounds = 10;


const signup = async (req, res, next) => {
    try {
      const { username, password } = req.body;
  
      if (username === "" || password === "") {
        res.status(400).json({ message: "Provide username and password" });
        return;
      }
  
      // const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
      // if (!passwordRegex.test(password)) {
      //   res.status(400).json({
      //     message:
      //       "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      //   });
      //   return;
      // }
  
      const foundUser = await User.findOne({ username });
  
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }
  
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      const createdUser = await User.create({ username, password: hashedPassword });
  
      const { _id } = createdUser;
  
      const user = { username, _id };
  
      res.status(201).json({ user });
    } catch (error) {
      console.log(error);
    }
  };
  

module.exports = {
    signup
}
