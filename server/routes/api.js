require('dotenv').config();
var express = require('express');
const bcrypt = require("bcryptjs");
const passport = require("passport");
const validateToken = require('../auth/validateToken');
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");
//const Friendship = require("../models/Friendship");
const Friend = require("../models/Friend");
const LikedUser = require("../models/LikedUser");
const Message = require("../models/Message"); 
const Chat = require("../models/Chat");
var router = express.Router();
const {body, validationResult } = require("express-validator");
const multer = require("multer");
const storage = multer.memoryStorage(); 
const upload = multer(storage);
const jwt = require("jsonwebtoken");

//Login page
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
            res.json({success: true, token: token, message: "Login succeeded!"})
        } else {
          res.status(403).json({message: "Failed!"})
        }
      })
      }
    }
  })
//Loading main page
router.get("/main", validateToken, function(req, res) {
  res.send("Main page")
})
//Registering new user
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
      //return res.redirect("/login");
      statusNum = 200; 
      message = {text: "Register succeeded"};
      res.status(statusNum).send(message);
    } else {
      statusNum = 403; 
      message = {text: "Email already in use"};
      res.status(statusNum).send(message);
      //return res.redirect("/register.html");
    }
})
//Getting list of all user profiles
router.get("/user/list", validateToken, async function(req, res) {
  //validateToken()
  console.log("Fetching users...");
  let users = await UserProfile.find({}).exec(); 
  res.json(users);
})
//Getting the information from logged user
router.get("/user/profile/:username", validateToken, async function(req, res) {
    let userInfo = await UserProfile.findOne({username: req.params.username}).exec();
    if (userInfo) {
      res.json(userInfo);
    } else {
      res.json({message: "User not found!"})
    }
}) 
//Saving new profile description to the user profile
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
//Saving new profile picture to the user profile
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
//Adding liked user and possibly new friend if match is found meaning that both users have liked each other
router.post("/user/add/friend", validateToken, async function(req, res) {
  let matchFound = false;
  let message; 
  //Checking if these people are already friends  
  //let friendship = await Friendship.findOne(req.body).exec();
  //Finding current user and potential friend profiles
  let currentUser = await UserProfile.findOne({username: req.body.friendOne}).exec(); 
  let potentialFriend = await UserProfile.findOne({username: req.body.friendTwo}).exec(); 
  const queryCurrent = {user: currentUser._id};
  //Finding whether the currently logged user has list of liked users already
  let currentLikes = await LikedUser.findOne(queryCurrent).exec();
  //console.log(currentLikes)
  if (!currentLikes) {
    //Creating new friends list
    let newLikes = new LikedUser({user: currentUser._id, likedUsers: req.body.friendTwo})
    await newLikes.save();
  } else {
    if (!currentLikes.likedUsers.includes(req.body.friendTwo)) {
      currentLikes.likedUsers.addToSet(req.body.friendTwo);
      await currentLikes.save();
    }
  }
  message = "New liked user added!"
  // Checking if potential friend candidate has a list of liked users:
  // If not, match cannot be found either!
  const queryPotential = {user: potentialFriend._id}
  let potentialUserLikes = await LikedUser.findOne(queryPotential).exec();
  if(!potentialUserLikes) {
    console.log("List for liked users not found potential friends");
    matchFound = false; 
    //message = "New liked user added!"
  } else {
    //Checking if potential friend has current user in their list of liked users
    if (potentialUserLikes.likedUsers.indexOf(req.body.friendOne) !== -1) {
      matchFound = true; 
      console.log("MATCH FOUND!!")
      //Finding friendlists of both users: 
      let currentFriends = await Friend.findOne(queryCurrent).exec();
      let potentialFriends = await Friend.findOne(queryPotential).exec(); 
      // If currently logged user has no friends list, it's sure that these users are not friends yet!
      if (!currentFriends) {
        let newFriends = new Friend({user: currentUser._id, friends: req.body.friendTwo})
        await newFriends.save();
      } else {
        // Friends list exists, so there is possibility that these users are already friends!
        if (!currentFriends.friends.includes(req.body.friendTwo)) {
          currentFriends.friends.addToSet(req.body.friendTwo);
          await currentFriends.save();
          message = "New friend added!"
        } else {
          console.log("You're already friends!")
          message = "Already friends!"
        }
      }
      
    
      console.log("Adding you to other friend's list")
      //Checking the same things of potential friend!
      if (!potentialFriends) {
        let newFriendsOfPotential = new Friend({user: potentialUserLikes._id, friends: req.body.friendOne})
        await newFriendsOfPotential.save(); 
      } else {
        if (!potentialFriends.friends.includes(req.body.friendOne)) {
          potentialFriends.friends.addToSet(req.body.friendOne);
          await potentialFriends.save();
          message = "New friend added!"
        } else {
          console.log("You're already friends")
          message = "Already friends!"
        }
      }
    } 
  }
  res.send({message: message, matchFound: matchFound});
})
router.get("/user/list/likedUsers/:username", validateToken, async function(req, res) {
  console.log("Fetching liked users");
  let results; 
  let username = req.params.username;  
  let user = await UserProfile.findOne({username: username});
  if (!user) {
      console.log("user not found")
  } else {
    let id = user._id;
    //Finding friends of this user: 
    let likedUsers = await LikedUser.findOne({user: id}).exec(); 
    if (likedUsers) {
      results = {
        likedUsersList: likedUsers.likedUsers
      }
      console.log(results)
    } else {
      results = {
        likedUsersList: ["No liked users"]
      }
      console.log(results)
    }
  }
    res.send(results)
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


//Sending messages
router.post("/user/send/message", validateToken, async (req, res) => {
    let sender = await UserProfile.findOne({username: req.body.sender}).exec(); 
    let recipient = await UserProfile.findOne({username: req.body.recipient}).exec(); 
    let newMessage;
    if (req.body) {
      if (sender && recipient) {
        newMessage = new Message({sender: sender._id, recipient: recipient._id, sendingTime: req.body.sendingTime, content: req.body.content});
        await newMessage.save(); 
        //Checking if chats between these users exists: 
        let chats = await Chat.findOne({members: [sender._id, recipient._id]}).exec(); 
        if (!chats) {
          let newChat = new Chat({members: [sender._id, recipient._id], messages: newMessage})
          await newChat.save();
        } else {           
          chats.messages.addToSet(newMessage);
          await chats.save(); 
        }
        res.send("Message sent successfully");
      }
    } else {
      res.send("Failed to send message");
    }

})

//Showing messages 
router.get("/user/list/chats/:sender/:recipient", validateToken, async (req, res) => {
  console.log("Trying to fetch messages")
  let senderName = req.params.sender;
  let recipientName = req.params.recipient; 
  let sender = await UserProfile.findOne({username: senderName}).exec(); 
  let recipient = await UserProfile.findOne({username: recipientName}).exec(); 
  if (sender && recipient) {
    let senderId = sender._id;
    let recipientId = recipient._id; 

    //Trying to find all chats these user has send!
    let sentChats = await Chat.findOne({members: [senderId, recipientId]}).exec();
    let receivedChats = await Chat.findOne({members: [recipientId, senderId]}).exec();  
    if (sentChats && receivedChats) {
      let sentMessages = sentChats.messages;
      let receivedMessages = receivedChats.messages; 
      let messages = sentMessages.concat(receivedMessages);
      //Sorting lists by date in javascript: https://bobbyhadz.com/blog/javascript-sort-array-of-objects-by-date-property
      let sortedMessages = messages.sort(
        (objA, objB) => Number(objA.sendingTime) - Number(objB.sendingTime), 
      )
      let messageList = [];
      //console.log(sortedMessages)
      sortedMessages.forEach(async (message) => {
        //Comparing json objects: https://www.freecodecamp.org/news/javascript-comparison-operators-how-to-compare-objects-for-equality-in-js/
        if (JSON.stringify(message.sender) === JSON.stringify(recipientId)) {
          messageList.push({sender: recipientName, sendingTime: message.sendingTime, content: message.content})
        } else {
          messageList.push({sender: senderName, sendingTime: message.sendingTime, content: message.content})
        }
      })
      res.send({messages: messageList})
    } else {
      res.send({messages: "No new messages"})
    }
    //console.log(sentChats)
    //console.log(receivedChats)
    //Creating discussion!

    /*if (chats) {
      //res.send({messages: chats[0].messages})
    }*/
  }

});
//based on this website: https://www.freecodecamp.org/news/javascript-date-comparison-how-to-compare-dates-in-js/
function sortMessages(msg1, msg2) {
  if (msg1.sendingTime > msg2.sendingTime) {
    console.log("This is newer message!")
  } else if (msg1.sendingTime < msg2.sendingTime) {
    console.log("This is older message!");
  } else {
    console.log("Same time!")
  }
}

module.exports = router;
