// getAll, getById, update, delete
const User = require("../../models/Auth/UserModels");
const bcrypt = require("bcryptjs");

const GetProfile = (req, res) => {
  res.json(req.user);
};

module.exports = {
  GetProfile,
};