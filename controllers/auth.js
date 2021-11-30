// Login & SignUp, change password, log out
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mongoose = require('mongoose');

const User = require("../models/user");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
      process.env.SENDGRID_KEY
    }
  })
);

// Takes in an email and password
// Returns a success or specific error message
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  //one week
  const tokenExpiryTime = 168;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        // error.statusCode = 401;
        return res.status(401).json({
          message: "Error",
          error: error.message
        });
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        // error.statusCode = 401;
        return res.status(401).json({
          message: "Error",
          error: error
        });
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        process.env.SECRET,
        { expiresIn: `${tokenExpiryTime}h` }
      );
      res.status(200).json({
        message: `Login Successful! Token valid for the next ${tokenExpiryTime} hours.`,
        token: token,
        userId: loadedUser._id.toString()
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// Takes in an email and password
// Returns a success message and the user ID
exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    const error = new Error("Validation failed.");
    // error.statusCode = 422;
    error.data = errors.array();
    return res.status(422).json({
      message: "Error",
      error: errors.errors
    });
  }
  bcrypt
    .hash(password, 13)
    .then(hashedPw => {
      const user = new User({
        email: email,
        password: hashedPw,
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({
        message: 'User created!',
        userId: result._id
      });
      return transporter.sendMail({
        to: email,
        from: 'kimblackaz@gmail.com',
        subject: 'Signup Succeeded: Welcome to You Choose!',
        html: '<h3>You successfully signed up! Enjoy full access to You Choose.</h3>'
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// exports.postChangePassword = (req, res, next) => {
//   res.status(200).json({
//     message: "Password Changed",
//   });
// };

// exports.postLogout = (req, res, next) => {
//   res.status(200).json({
//     message: "Logout Successful",
//   });
// };
