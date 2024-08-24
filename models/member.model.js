const mongoose = require("mongoose");

const Member = new mongoose.model(
  "Member",
  {
    Name: String,
    Games: Number,
    GamesWon: Number,
    GamesLost: Number,
    IhoudiWon: Number,
    IhoudiLost: Number,
    Score: Number
  }
);

module.exports = Member;