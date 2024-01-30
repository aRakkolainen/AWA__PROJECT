require('dotenv').config();
var express = require('express');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const validateToken = require('../auth/validateToken');
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");
const Friendship = require("../models/Friendship");
const Friend = require("../models/Friend");
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
  res.send("Main page")
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
router.post("/user/profile/pic/:username", validateToken, async function(req, res) {
  console.log("Adding new profile picture!")
  let user = await UserProfile.findOne({username: req.params.username}).exec();
  if (user) {
    user.picture = req.body.pic;
    await user.save();
  } else {
    res.json({message: "User not found!"})
  }
  
})

router.post("/user/add/friend", validateToken, async function(req, res) {
  console.log("Adding new friend!");
  let matchFound = false; 
  let message; 
  let friendship = await Friendship.findOne(req.body).exec();
  let currentUser = await UserProfile.findOne({username: req.body.friendOne}).exec(); 
  let potentialFriend = await UserProfile.findOne({username: req.body.friendTwo}).exec(); 
  //Checking if currently logged user has friends list yet
  const queryCurrent = {user: currentUser._id};
  let currentFriends = await Friend.findOne(queryCurrent).exec();
  if (!currentFriends) {
    //Creating new friends list
    let newFriends = new Friend({user: currentUser._id, friends: req.body.friendTwo})
    await newFriends.save();
  } else {
    if (!currentFriends.friends.includes(req.body.friendTwo)) {
      currentFriends.friends.addToSet(req.body.friendTwo);
      await currentFriends.save();
    }
  }
  // Checking if potential friend has friends list: 
  const queryPotential = {user: potentialFriend._id}
  let potentialUserFriends = await Friend.findOne(queryPotential).exec();
  if(!potentialUserFriends) {
    console.log("Friends list not found");
    matchFound = false; 
  } else {
    //Checking if potential friend has current user in their friendslist
  if (potentialUserFriends.friends.indexOf(req.body.friendOne) !== -1 && !friendship) {
    console.log("MATCH FOUND!");
    matchFound = true; 
    let newFriendship = new Friendship({friendOne: req.body.friendOne, friendTwo: req.body.friendTwo})
    await newFriendship.save();
  }
  }
  res.send({message: "New friend added!", matchFound: matchFound});
})
router.get("/user/list/friends/:username", validateToken, async function(req, res) {
  console.log("Fetching friends..");
  let results; 
  let username = req.params.username;  
  let user = await UserProfile.findOne({username: username});
  if (!user) {
      console.log("user not found")
  } else {
    let id = user._id;
    //Finding friends of this user: 
    let friends = await Friend.findOne({user: id}).exec(); 
    if (friends) {
      results = {
        friendList: friends.friends
      }
    } else {
      results = {
        friendList: ["No friends"]
      }
    }
  }
    res.send(results)

})
router.post("/user/checkFriendStatus", validateToken, async function(req, res){
    /*let friendships = await FriendStatus.find({status: req.body.user}).exec();
    let matchFound = false; 
    console.log(friendships)
    let pairsList = [];
    res.send({message: matchFound})*/
})

module.exports = router;
