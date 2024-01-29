require('dotenv').config();
var express = require('express');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const validateToken = require('../auth/validateToken');
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");
var router = express.Router();
const {body, validationResult } = require("express-validator");
const multer = require("multer");
const storage = multer.memoryStorage(); 
const upload = multer(storage);
const jwt = require("jsonwebtoken");
/* GET home page. */
router.post('/user/login', upload.none(),  async function(req, res, next) {
  console.log("Trying to login..");
  if (req.body) {
    let user = await User.findOne({email: req.body.email}).exec(); 
    if (!user) {
      res.status(403).json({message: "Login failed!"});
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) throw err; 
        if(isMatch) {
            const jwt_payload = {
              email: user.email
            }
            var token = 
            jwt.sign(
              jwt_payload, 
              process.env.SECRET
            )
            res.json({success: true, token: token})
        } else {
          res.status(403).json({message: "Failed!"})
        }
      })
      }
    }
  })
  router.get("/main", validateToken, function(req, res) {
    res.send("HELLO")
})

router.post('/user/register', async (req, res) => {
  body("email").isEmail(),
  body("password").isStrongPassword({
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1, 
  minNumbers: 1,
  minSymbols: 1 
})
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    let statusNum; 
    let message; 
    let currentDate = new Date(); 
    //Checking whether user already exists
    let user = await User.findOne({email: req.body.email}).exec(); 
    // User with this particular email doesn't exists, adding new one to the users database
    if (!user && req.body.password !== undefined) {
      // Creating also new user profile with username and current date
      let tempUsername = req.body.email.split("@");
      let newUsername = tempUsername[0];
      let newUserProfile = new UserProfile({
        username: newUsername, 
        registerDate: currentDate
      })
      await newUserProfile.save();
      //Hashing the password: 
      let hashedPassword = await bcrypt.hash(req.body.password, 10);  
      let newUser = new User({email: req.body.email, password: hashedPassword})
      await newUser.save();  
      return res.redirect("/login");
    } else {
      statusNum = 403; 
      message = {email: "Email already in use"};
      res.status(statusNum).send(message);
      //return res.redirect("/register.html");
    }
})

router.get("/user/list", validateToken, async function(req, res) {
  //validateToken()
  console.log("Fetching users...");
  let users = await UserProfile.find({}).exec(); 
  res.json(users);
})

router.get("/user/profile/:username", validateToken, async function(req, res) {
    let userInfo = await UserProfile.findOne({username: req.params.username}).exec();
    if (userInfo) {
      res.json(userInfo);
    } else {
      res.json({message: "User not found!"})
    }
}) 

router.post("/user/profile/bio/:username", validateToken, async function(req, res) {
    console.log("Adding bio text!")
    let user = await UserProfile.findOne({username: req.params.username}).exec();
    if (user) {
      user.bio = req.body.bio
      await user.save();
    } else {
      res.json({message: "User not found!"})
    }
    
})

module.exports = router;
