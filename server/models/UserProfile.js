const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

let profileSchema = new Schema({
    username: {type: String},
    registerDate: {type: Date},
    picture: {type: String}, 
    bio: {type: String}
})

module.exports = mongoose.model("profiles", profileSchema);