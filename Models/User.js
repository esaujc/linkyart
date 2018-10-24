const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  is_artist: Boolean,
  username: String,
  password: String,
  name: String,
  email: String,
  telephone: String,
  homepage: String,
  image: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
