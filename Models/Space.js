const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const spaceSchema = new Schema ({
  username: String,
  password: String,
  artist: Boolean,
  space: Boolean
});

const Space = mongoose.model('User', userSchema);

module.exports = Space;