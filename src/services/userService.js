const { User } = require('../models');
const bcrypt = require('bcryptjs');
const auth = require('../util/auth');

const registerUser = async (username, email, password, displayName) => {
  const user = new User({ username, email, password, displayName });
  user.password = await bcrypt.encryptPassword(user.password);
  await user.save();

  const token = auth.createJWTToken({
    _id: user._id,
    email: user.email,
    displayName: user.displayName,
  });

  return token;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Invalid Username");
  }

  const validPassword = await bcrypt.comparePassword(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid Password");
  }

  const token = auth.createJWTToken({
    _id: user._id,
    email: user.email,
    displayName: user.displayName,
  });

  return token;
};

const getUsers = async () => {
  return await User.find();
};

const getUserById = async (id) => {
  return await User.findById(id);
};

module.exports = { registerUser, loginUser, getUsers, getUserById };
