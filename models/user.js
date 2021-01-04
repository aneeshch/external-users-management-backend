const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  telephoneNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  ssn: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);
