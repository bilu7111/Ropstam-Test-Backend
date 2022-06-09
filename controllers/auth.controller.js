const bcrypt = require("bcrypt");
const { User } = require("../model");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { USER_EXISTS, SERVER_ERROR } = require("../common_errors");

module.exports = {
  login: async (req, res) => {
    try {
        validationResult(req).throw();  
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
            );
            user.token = token;
            res.status(200).json(user);
        }
        res.status(400).json({message: "Invalid Credentials"});
    } catch (err) {
        if(err.errors.length){
            res.status(400).json(err.errors);
        }
        else{
            res.status(500).json({message: SERVER_ERROR});
        }
    }
  },
  signup: async (req, res) => {
    try {
      validationResult(req).throw();  
      const { first_name, last_name, email, password } = req.body;
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).json({message: USER_EXISTS});
      }
      encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      res.status(201).json(user);
    } catch (err) {
        if(err.errors.length){
            res.status(400).json(err.errors);
        }
        else{
            res.status(500).json({message: SERVER_ERROR});
        }
    }
  }
};
