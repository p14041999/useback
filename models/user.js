const mongo = require("mongoose");

const userSchema = new mongo.Schema({
  email: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  emailPhrase: {
    type: String,
  },
  forgotPasswordPhrase: {
    type: String,
    default: "NA",
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  refURI: {
    type: String,
    required: true,
  },
  reffered: {
    type: Number,
    default: 0,
  },
  validRef: {
    type: Number,
    default: 0,
  },
  parent: {
    name: {
      type: String,
      default: "None",
    },
    id: {
      type: String,
      deafult: "NA",
    },
  },
  userTier: {
    type: Number,
    default: 1,
  },
  EstimatedEarnings: {
    type: Number,
    default: 0,
  },
  participatedInAirDrop: {
    type: Boolean,
    default: false,
  },
  TierOneReffList: [
    {
      type: mongo.Schema.Types.ObjectId,
      require: true,
    },
  ],
  TierTwoReffList: [
    {
      type: mongo.Schema.Types.ObjectId,
      require: true,
    },
  ],
  TierThreeReffList: [
    {
      type: mongo.Schema.Types.ObjectId,
      require: true,
    },
  ],
  TierFourReffList: [
    {
      type: mongo.Schema.Types.ObjectId,
      require: true,
    },
  ],
  TierFiveReffList: [
    {
      type: mongo.Schema.Types.ObjectId,
      require: true,
    },
  ],
  TierSixReffList: [
    {
      type: mongo.Schema.Types.ObjectId,
      require: true,
    },
  ],
  TierSevenReffList: [
    {
      type: mongo.Schema.Types.ObjectId,
      require: true,
    },
  ],
  TierEightReffList: [
    {
      type: mongo.Schema.Types.ObjectId,
      require: true,
    },
  ],
  TierNineReffList: [
    {
      type: mongo.Schema.Types.ObjectId,
      require: true,
    },
  ],
  TierTenReffList: [
    {
      type: mongo.Schema.Types.ObjectId,
      require: true,
    },
  ],
});

module.exports = mongo.model("User", userSchema);
