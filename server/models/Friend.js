const { ObjectId} = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

let friendSchema = new Schema({
    user: {type: ObjectId}, 
    friends: {type: Array},
})

module.exports = mongoose.model("friends", friendSchema);