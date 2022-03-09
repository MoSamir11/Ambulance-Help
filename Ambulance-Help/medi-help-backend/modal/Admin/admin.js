const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSignupSchema = new Schema({
  hospitalName: {
    type: String,
    required: true,
    default: null,
  },
  phone: {
    type: String,
    required: true,
    default: null,
  },
  email: {
    type: Number,
    required: true,
    default: null,
  },
  password: {
    type: String,
    required: true,
    default: null,
  },
  userType: {
    type: String,
    required: true,
    default: null,
  },
  address: {
    type: String,
    required: true,
    default: null,
  },
  pin: {
    type: Number,
    required: true,
    default: null,
  },
  lattitude: {
    type: Number,
    required: true,
    default: null,
  },
  longitude: {
    type: Number,
    required: true,
    default: null,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("admin", adminSignupSchema);
