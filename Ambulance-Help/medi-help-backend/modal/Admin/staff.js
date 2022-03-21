const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  hospitalName: {
    type: String,
    required: true,
    default: null,
  },
  employeeName: {
    type: String,
    required: true,
    default: null,
  },
  employeeId: {
    type: String,
    required: true,
    default: null,
  }
});

module.exports = mongoose.model("staff", staffSchema);
