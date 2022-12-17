const mongoose = require('mongoose');

const UserSchema = require('./user.schema').UserSchema;

const UserModel = mongoose.model('User', UserSchema);

function register(user) {
  return UserModel.create(user);
}

function getUserByName(name) {
  return UserModel.findOne({ username: name });
}

function updateDescription(name, descrip) {
  const filter = { username: name };
  const update = { description: descrip };

  return UserModel.findOneAndUpdate(filter, update);
}


// need encryption!!!
function updatePassword(name, secret) {
  const filter = {username: name};
  const update = {password: secret};

  return UserModel.findOneAndUpdate(filter, update);
}

module.exports = {
  register,
  getUserByName,
  updateDescription,
  updatePassword,
};
