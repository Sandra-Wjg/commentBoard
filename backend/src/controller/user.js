// user controller
const User = require("../model/user");

async function register(userInfo = {}) {
  const newUser = await User.create(userInfo);
  return newUser;
}

async function login(userInfo = {}) {
  const user = await User.findOne({
    username: userInfo.username,
    password: userInfo.password,
  });
  if (user !== null) {
    return true;
  }
  return false;
}

module.exports = {
  register,
  login,
};
