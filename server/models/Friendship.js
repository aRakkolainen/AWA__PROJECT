const mongoose = require("mongoose");

const Schema = mongoose.Schema; 

let friendShipSchema = new Schema({
    friendOne: {type: Object}, 
    friendTwo: {type: Object}
})

module.exports = mongoose.model("friendship", friendShipSchema);