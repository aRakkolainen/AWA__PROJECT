require('dotenv').config();
var express = require('express');
const bcrypt = require("bcryptjs");
//const passport = require("passport");
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
//Based on this tutorial: https://medium.com/swlh/how-to-upload-image-using-multer-in-node-js-f3aeffb90657
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  }, 
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
}); 
const upload = multer({storage: storage});
const jwt = require("jsonwebtoken");

//Used for login in the app
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

//Getting the information from one user
router.get("/user/profile/:username", validateToken, async function(req, res) {
    let userInfo = await UserProfile.findOne({username: req.params.username}).exec();
    //Finding also the email address of this user!
    //Query: username@
    //based on this: https://sparkbyexamples.com/mongodb/mongodb-check-if-a-field-contains-a-string/
    let user = await User.find({"email": {$regex: req.params.username+"@"}}).exec(); 
    let foundUser = user[0];    
    if (userInfo && foundUser) {
      //Formating the register date: 
      let registerDay = userInfo.registerDate.getDate() + "." + Number(userInfo.registerDate.getMonth()+1) + "." + userInfo.registerDate.getFullYear();
      let userInformation = {
        username: userInfo.username, 
        email: foundUser.email, 
        registerDate: registerDay, 
        bio: userInfo.bio, 
        picture: userInfo.picture
      }
      res.send({message: "User found!", userData: userInformation});
    } else {
      res.send({message: "User not found!"})
    }
}) 

//Saving new profile description to the user profile
router.post("/user/profile/bio/:username", validateToken, async function(req, res) {
    console.log("Adding bio text!")
    let user = await UserProfile.findOne({username: req.params.username}).exec();
    if (user) {
      user.bio = req.body.bio
      await user.save();
      res.send({message: "New bio saved"});
    } else {
      res.send({message: "User not found!"})
    }
})

//This is based on this tutorial: https://medium.com/swlh/how-to-upload-image-using-multer-in-node-js-f3aeffb90657 and also Leevi Lautanen helped with this
router.post("/user/profile/picture/:username", upload.single('file'), async function(req, res){
    console.log("Trying to save image..");
    let img = req.file; 
    let response; 
    if (img) {
      //Finding user: 
      let user = await UserProfile.findOne({username: req.params.username});
      if (user){
        let src = req.protocol +'://'+req.get('host')+ "/" +req.file.path
        user.picture = src; 
        await user.save();
      response = "New picture saved successfully!";
    }
    } else {
      response = "Saving picture failed!";
    }
    
    res.send({message: response});
})

router.get("/user/profile/picture/:username", validateToken, async function(req, res) {
    let username = req.params.username;
    let response;  
    let picture = null; 
    if(username) {
      let user = await UserProfile.findOne({username: username});
      if(user) {
        if(user.picture) {
          response = "Profile picture found" 
          picture = user.picture;
        } else {
          response = "No profile picture";
        }
      } else {
        response = "User not found!";
      }
    } else {
      response = "No username";
    }
    res.send({message: response, picture:picture});
})



//Updating email of the user, it changes the username as well because username is automatically generated based on the email address
router.post("/user/profile/email/:email", validateToken, async function(req, res) {
  body("email").isEmail(),
  console.log("Updating email address");
  //Current username
  let tempUsername = req.params.email.split("@");
  let username = tempUsername[0];
  //Possibly new username
  let tempNew = req.body.email.split("@");
  let newUsername = tempNew[0];
  
  //Finding User and UserProfile Documents matching current email & username We need to update also all lists where this user is listed as a friend! Same with chats
  let currentUser = await User.findOne({email: req.params.email}).exec(); 
  let currentProfile = await UserProfile.findOne({username: username}).exec();
  //let newProfile = await UserProfile.findOne({username: usernameNew}).exec(); 
  //Finding if there is user with new email => if there is, not updating and if not, then can be updates
  let existingUser = await User.findOne({email: req.body.email}).exec();  
  if (currentUser && currentProfile && !existingUser) {
      if (username === newUsername) {
        //first part of email is not changed, updating just email address!
        currentUser.email = req.body.email;
        await currentUser.save(); 
        res.json({message: "Email updated successfully", status: 200});
      } else {
        currentUser.email = req.body.email; 
        await currentUser.save();
        currentProfile.username = newUsername;
        await currentProfile.save();
        res.send({message: "Email and username updated successfully", username: newUsername, status: 200});  
      }
  } else {
    res.json({message: "Updating email failed, email reserved"})
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
  if (!potentialFriend) return res.send({message: "User not found!"})
    if (!currentLikes) {
      //Creating new friends list
      let newLikes = new LikedUser({user: currentUser._id, likedUsers: potentialFriend._id})
      await newLikes.save();
    } else {
      if (!currentLikes.likedUsers.includes(potentialFriend._id)) {
        currentLikes.likedUsers.addToSet(potentialFriend._id);
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
    if (potentialUserLikes.likedUsers.indexOf(currentUser._id) !== -1) {
      matchFound = true; 
      console.log("MATCH FOUND!!")
      //Finding friendlists of both users: 
      let currentFriends = await Friend.findOne(queryCurrent).exec();
      let potentialFriends = await Friend.findOne(queryPotential).exec(); 
      // If currently logged user has no friends list, it's sure that these users are not friends yet!
      if (!currentFriends) {
        let newFriends = new Friend({user: currentUser._id, friends: potentialFriend._id})
        await newFriends.save();
      } else {
        // Friends list exists, so there is possibility that these users are already friends!
        if (!currentFriends.friends.includes(potentialFriend._id)) {
          currentFriends.friends.addToSet(potentialFriend._id);
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
        let newFriendsOfPotential = new Friend({user: potentialFriend._id, friends: currentUser._id})
        await newFriendsOfPotential.save(); 
      } else {
        if (!potentialFriends.friends.includes(currentUser._id)) {
          potentialFriends.friends.addToSet(currentUser._id);
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

//This is used in showing the queue of possible friends in frontend meaning the users current user has not yet liked 
router.get("/user/list/notLikedUsers/:username", validateToken, async function(req, res) {
    //Fetching first users this person has liked:
    console.log("Fetching user list");
    let username = req.params.username; 
    let potentialUsers = [];
    let results; 
    let currentUser = await UserProfile.findOne({username: username});
    if (!currentUser) {
      console.log("User not found");
      results = {message: "User not found!"};
    } else {
      //Finding all users registered to the system except the currently logged in user
      potentialUsers = await UserProfile.find({_id: {$ne: currentUser._id}}).exec(); 
      //Finding users who this user has liked
      let liked = await LikedUser.findOne({user: currentUser._id}).exec();
      //If user has liked users, then those are not included in potential users list who the user might like
      if (liked) {
        potentialUsers = await UserProfile.find({_id: {$nin: liked.likedUsers}, username: {$ne: currentUser.username}}).exec(); 
        results = {
          message: "User has some liked users",
          users: potentialUsers 
        }
        //Otherwise all users are shown
      } else {
        results = {
          message: "User has no liked users",
          users: potentialUsers
        }
      }
    }
    res.send(results);

})


//This is used to list the friends of specific user
router.get("/user/list/friends/:username", validateToken, async function(req, res) {
  console.log("Fetching friends..");
  let results; 
  let friendsList = []; 
  let foundFriends = []; 
  let username = req.params.username;  
  let user = await UserProfile.findOne({username: username});
  if (!user) {
      console.log("user not found")
      results = {
        message: "User not found!"
      };
  } else {
    let id = user._id;
    //Finding friends of this user: 
    let friends = await Friend.findOne({user: id}).exec();
    if (friends) {
      foundFriends = friends.friends;
      friendsList = await UserProfile.find({_id: {$in: foundFriends}}); 
      if (friendsList) {
        results = {
          message: "This user has friends",
          friends: friendsList
        }
      } else {
        results = {
          message: "This user has no friends",
          friends: []
        }
      }
    } else {
      results = {
        message: "This user has no friends",
        friends: []
      }
    }
    
  }
  res.send(results);
})


//Sending messages and storing them to the database
router.post("/user/send/message", validateToken, async (req, res) => {
    let sender = await UserProfile.findOne({username: req.body.sender}).exec(); 
    let recipient = await UserProfile.findOne({username: req.body.recipient}).exec(); 
    let newMessage;
    console.log("Trying to send message!")
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


//Loading the messages between specific sender and recipient
router.get("/user/list/chats/:sender/:recipient", validateToken, async (req, res) => {
  console.log("Trying to fetch new messages")
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
    // If both has sent messages to each other
    let messagesList = [];
    let date = new Date();
    let currentDate = date.getDate() + "." + Number(date.getMonth()+1) + "." + date.getFullYear();
    //Case when both participants has sent messages
    if (sentChats && receivedChats) {
      let sentMessages = sentChats.messages;
      let receivedMessages = receivedChats.messages; 
      let messages = sentMessages.concat(receivedMessages);
      //These need to be sorted according to the sending time
      //Sorting lists by date in javascript: https://bobbyhadz.com/blog/javascript-sort-array-of-objects-by-date-property
      let sortedMessages; 
      if (messages.length > 0) {
        sortedMessages = messages.sort(
          (objA, objB) => Number(objA.sendingTime) - Number(objB.sendingTime), 
        )
      }
      //Formating sending time
      let sendingTime
      sortedMessages.forEach(async (message) => {
        let sendingDate = message.sendingTime.getDate() + "." + Number(message.sendingTime.getMonth()+1) + "." + message.sendingTime.getFullYear();
        //Checking if message is sent today: 
        let minutes; 
        if (Number(message.sendingTime.getMinutes()) < 10) {
          minutes = "0" + message.sendingTime.getMinutes();
        } else {
          minutes = message.sendingTime.getMinutes(); 
        }
        if (currentDate === sendingDate) {
          sendingTime = message.sendingTime.getHours() + ":" + message.sendingTime.getMinutes(); 
        } else {
          sendingTime = sendingDate + " " + message.sendingTime.getHours() + ":" + minutes; 
          
        }
        //Comparing json objects: https://www.freecodecamp.org/news/javascript-comparison-operators-how-to-compare-objects-for-equality-in-js/
        if (JSON.stringify(message.sender) === JSON.stringify(recipientId)) {
          messagesList.push({sender: recipientName, sendingTime: sendingTime, content: message.content})
        } else {
          messagesList.push({sender: senderName, sendingTime: sendingTime, content: message.content})
        }
      })
    } else if(sentChats) {
      //only currently logged user has sent messages, these are already sorted
      let sendingTime; 
      let messages = sentChats.messages;
      messages.forEach((message) => {
        let sendingDate = message.sendingTime.getDate() + "." + Number(message.sendingTime.getMonth()+1) + "." + message.sendingTime.getFullYear();
        if (currentDate === sendingDate) {
          sendingTime = message.sendingTime.getHours() + ":" + message.sendingTime.getMinutes(); 
        } else {
          if(Number(message.sendingTime.getMinutes()) < 10) {
            sendingTime = sendingDate + " " + message.sendingTime.getHours() + ":" + "0" + message.sendingTime.getMinutes(); 
          } else {
            sendingTime = sendingDate + " " + message.sendingTime.getHours() + ":" + message.sendingTime.getMinutes(); 
          }
        }
        messagesList.push({sender: senderName, sendingTime: sendingTime, content: message.content})
      })
      //messagesList = sentChats.messages;
      
    } else if(receivedChats) {
      //only other user has sent messages, these are already sorted!
      let messages = receivedChats.messages;
      let sendingTime; 
      let minutes; 
      messages.forEach((message) => {
        let sendingDate = message.sendingTime.getDate() + "." + Number(message.sendingTime.getMonth()+1) + "." + message.sendingTime.getFullYear();
        if (Number(message.sendingTime.getMinutes()) < 10) {
          minutes = "0" + message.sendingTime.getMinutes();
        } 
        minutes = message.sendingTime.getMinutes(); 
        if (currentDate === sendingDate) {
          sendingTime = message.sendingTime.getHours() + ":" + minutes; 
        } else {
          sendingTime = sendingDate + " " + message.sendingTime.getHours() + ":" + minutes; 
        }
        messagesList.push({sender: recipientName, sendingTime: sendingTime, content: message.content})
      })
    } 
    res.send({messages: messagesList})
  }
});

module.exports = router;
