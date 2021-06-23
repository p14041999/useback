const Airdrop = require("../models/airdrop");
const User = require("../models/user");

exports.participate = async (req, res) => {
  try {
    let airdropData = req.body;
    console.log(req.body);
    let airdrop = new Airdrop(airdropData);
    await airdrop.save();
    let user = await User.findByIdAndUpdate(
      airdropData.userId,
      { participatedInAirDrop: true },
      { new: true }
    );
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};
exports.check = async (req, res) => {
  try {
    let data = await Airdrop.find();
    console.log(data);
    // return res.json(data).status(200);
  } catch (error) {
    console.log(error);
  }
};
