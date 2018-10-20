const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const spaceSchema = new Schema({
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  name: String,
  contactName: String,
  email: String,
  telephone: String,
  homepage: String
});

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
