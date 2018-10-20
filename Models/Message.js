const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema({
  sender: {
    type: ObjectId,
    ref: 'User'
  },
  spaceToRent: {
    type: ObjectId,
    ref: 'Space'
  },
  reciever: {
    type: ObjectId,
    ref: 'User'
  },
  date: Date
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
