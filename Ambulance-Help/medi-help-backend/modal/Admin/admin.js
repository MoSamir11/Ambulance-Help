const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
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
    type: String,
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
  notification:[
    {
      consumerId:{type: String,required:true,default:null},
      consumerName:{type:String,required:true,default:null},
      consumerContact:{type:String,required:true,default:null},
      consumerAddress:{type:String,required:true,default:null}
    }
  ],
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
