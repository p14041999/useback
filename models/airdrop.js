const mongo = require("mongoose");

const airdropSchema = new mongo.Schema({
  userId: {
    type: mongo.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  telegramHandle: {
    type: String,
    require: true,
  },
  twitterHandle: {
    type: String,
    require: true,
  },
  twitterPostLink: {
    type: String,
    require: true,
  },
  youtubeEmail: {
    type: String,
    require: true,
  },
});

module.exports = mongo.model("AirDrop", airdropSchema);
