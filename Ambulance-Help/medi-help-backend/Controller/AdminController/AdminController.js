const admin = require("../../modal/Admin/admin");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const common = require("../../Utility/common");
var jwt = require("jsonwebtoken");
const consumer = require("../../modal/consumer/consumer");
const { isValidObjectId } = require("mongoose");  
var ObjectId = require('mongodb').ObjectID;
exports.adminSignup = async (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body));
  const isUserExist = await admin.findOne({hospitalName:data.hospitalName})
  console.log(data);
  if (!isUserExist) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        const createResponce = await admin.create({
          hospitalName: data.hospitalName,
          phone: data.phone,
          specialist:data.specialist,
          email:data.email,
          userType:'Service Provider',
          address:data.address,
          pin:data.pin,
          password: hash,
          lattitude:data.latitude,
          longitude:data.longitude,
          createdOn: Date.now()
        });
        if (createResponce) {
          let email = createResponce.email;
          let subject = "User Registered";
          let data = `<h1>Thank you for register in Medi Help as an admin</h1>`;
          const mailSent = await common.mail(email, subject, data);
            res.send({
              isSuccess: true,
              message: "User registered successfully please check your mail",
          });
        } else {
          res.send({ isSuccess:false,message: "Something went wrong" });
        }
      });
    });
  } else {
    res.send({isSuccess:false, message: "User already exist" });
  }
};

exports.deleteAdmin = async (req, res, next) => {
  var id = req.body.id;
  const deleteResponse = await admin.deleteOne({ _id: id });
  if (deleteResponse) {
    res.send({
      message: "Data deleted successfully",
    });
  } else {
    res.send({
      error: "Something went wrong",
    });
  }
};

exports.adminLogin = async function (req, res, next) {
  const data = JSON.parse(JSON.stringify(req.body))
  console.log("data-->",data)
  if (data) {
    var email = data.email;
    var password = data.password;
    const isUserExist = await admin.findOne({
      email: email,
    });
    if (isUserExist) {
      // email match
      bcrypt.compare(
        password,
        isUserExist.password,
        async function (err, result) {
          // result === true
          if (result) {
            //jwt
            await jwt.sign(
              {
                data: isUserExist,
              },
              "mysecret",
              {
                expiresIn: 60 * 60,
              },
              (err, token) => {
                if (err) {
                  console.log(err);
                } else {
                  res.cookie("Admin", token, {
                    expiresIn: new Date(Date.now() + 30000),
                    httpOnly: true,
                  });
                  res.send({
                    message: "login success",
                    token:token
                  });
                }
              }
            );
          } else {
            res.send({
              message: "Password not match",
            });
          }
        }
      );
    } else {
      res.send({
        message: "user not found",
      });
    }
  }
};

exports.hospitalList = async (req,res) =>{
  const city = req.params.address;
  console.log("118-->",city);
  const hospital = await admin.find({address:city});
  res.send({isSuccess:true,length:hospital.length,data:hospital});
}

exports.ambulanceRequest = async(req,res)=>{
  const data = req.body;
  console.log("125-->",data);

  const updateServiceProvider = await admin.findOne({_id:data.hospitalId}).updateOne({_id:data.hospitalId},{$push:{notification:data}})
  if(updateServiceProvider)
  {
    console.log("Updated Successfully")
    res.send({isSuccess:true,message:'Request send successfully'})
  }
  console.log("127-->",updateServiceProvider)
}

exports.sendAmbulanceResponce = async(req,res)=>{
  const data = req.body;
  // console.log("5-->",data);
    const cond = {_id:data.hospitalId,'ambulance._id':{$eq:data.driver}};
    const driver = await admin.find(cond,'ambulance');
    console.log("143-->",driver)
    const amb = driver[0].ambulance;
    console.log("145-->",amb);
    const result = await amb.filter(user=>user._id == data.driver);
    // console.log("148-->",result)
    const data1={
      hospitalName:data.hospitalName,
      driverName:result[0].driverName,
      driverContact:result[0].driverContact
    };
    console.log("150-->",data1) 
  const updateConsumerNotification = await consumer.findOne({_id:data.consumerId}).updateOne({_id:data.consumerId},
    {$push:{notification:data1}});
  if(updateConsumerNotification)
  {
      console.log("Notification inserted Successfully");
      res.send({isSuccess:true,message:"Driver Detail sends t consumer"})
  }else{
      res.send({message:"Something went wrong"})
  }
}
