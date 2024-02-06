const { ObjectId} = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

let messageSchema = new Schema({
    sender: {type: ObjectId}, 
    recipient: {type: ObjectId}, 
    sendingTime: {type: Date},
    content: {type: String}
})

module.exports = mongoose.model("message", messageSchema);