const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consumerSignupSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: null,
  },
  email: {
    type: String,
    required: true,
    default: null,
  },
  phone: {
    type: Number,
    required: true,
    default: null,
  },
  notification:[
    {
      hospitalName:{type:String,required:true,default:null},
      driverName:{type:String,required:true,default:null},
      driverContact:{type:Number,required:true,default:null}
    }
  ],
  userType: {
    type: String,
    required: true,
    default: null,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("consumer", consumerSignupSchema);
