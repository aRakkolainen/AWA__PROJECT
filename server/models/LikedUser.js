const { ObjectId} = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

let likedUserSchema = new Schema({
    user: {type: ObjectId}, 
    likedUsers: {type: Array},
})

module.exports = mongoose.model("likedUsers", likedUserSchema);