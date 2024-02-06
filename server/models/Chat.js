const { ObjectId} = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

let chatSchema = new Schema({
    members: {type: Array},
    messages: {type: Array}
})

module.exports = mongoose.model("chats", chatSchema);