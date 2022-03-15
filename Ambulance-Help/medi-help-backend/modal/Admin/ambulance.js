const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ambulanceSchema = new Schema({
  hospitalName: {
    type: String,
    default: null,
  },
  driverName: {
    type: String,
    default: null,
  },
  ambulanceNumber: {
    type: Number,
    default: null,
  },
  driverContact: {
    type: Number,
    default: null,
  },
});
module.exports = mongoose.model("ambulance", ambulanceSchema);
