const accountSid = "ACf1d3f89b8f4cc3372721b564444a6784";
const authToken = "84d204bbd057283085493ca59db09582";
const consumer = require("../../modal/consumer/consumer");
var jwt = require("jsonwebtoken");

require("dotenv").config();
const common = require("../../Utility/common");
const client = require("twilio")(accountSid, authToken);
var myOtp = 135;

exports.consumerSignup = async (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body));
  console.log(data);
  const isUsrExist = await consumer.findOne({ phone: data.phone });
  if (!data.otp && !isUsrExist) {
    myOtp = Math.floor(Math.random() * 10000);
    console.log("27-->", myOtp);
    client.messages
      .create({
        body: `Use this OTP to validate your account ${myOtp}`,
        from: "+19108308773",
        to: `+91${data.phone}`,
      })
      .then((message) => {
        console.log("Message sent !");
        res.send({
          isSuccess:true,
          message:"An OTP has sent to your mobile"
        })
      })
      .catch((err) => {
        console.log("Message not sent", err)
        res.send({
          message:"An OTP has sent to your mobile"
        })
      });
  } else if (data.otp) {
    console.log("39 data-->", data);
    console.log("otp-->", myOtp);
    const otpData = JSON.parse(JSON.stringify(req.body));
    if (otpData.otp == myOtp) {
      console.log("OTP matches");
      const createResponse = await consumer.create({
        name: otpData.name,
        email: otpData.email,
        phone: otpData.phone,
        userType: "Consumer",
      });
      if (createResponse) {
        let email = createResponse.email;
        let subject = "User Registered";
        let data = `<h1>Thank you for register in Medi Help</h1>`;
        const mailSent = await common.mail(email, subject, data);
        
          res.send({
            isSuccess: true,
            message: "User registered successfully please check your mail",
          });
      } else {
        res.send({
          error: true,
          message: "Something went wrong",
        });
      }
    } else {
      res.send({ error: true, message: "OTP not matches" });
    }
  }else{
    res.send({
      message: "User already exist"
    })
  }
};

exports.consumerLogin = async (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body));
  const isUserExist = await consumer.findOne({phone:data.phone})
  console.log(data );
  if (isUserExist && !data.otp) {
    myOtp = Math.floor(Math.random() * 10000);
    console.log("27-->", myOtp);
    client.messages
      .create({
        body: `Use this OTP to validate your account ${myOtp}`,
        from: "+19108308773",
        to: `+91${data.phone}`,
      })
      .then((message) => {
        console.log("Message sent !");
        res.send({
          isSuccess:true,
          message:"An OTP has sent to your mobile"
        })
      })
      .catch((err) => {
        console.log(err)
        res.send({
          isSuccess:true,
          message:"An OTP has sent to your mobile"
        })
      });
  } else if(isUserExist && data.otp){
    const data = req.body;
    if(data.otp!=myOtp)
    {
      res.send({message:"OTP not match"});
      return
    }
    console.log("104 data-->", data);
    const userExist = await consumer.findOne({ phone: data.phone });
    await jwt.sign( 
      {
        user: {
          id: userExist._id,
          name:userExist.name,
          phone:userExist.phone,
          notification:userExist.notification,
        },
      },
      "mysecret",
      {
        expiresIn: 60 * 60,
      },
      (err, token) => {
        if (err) {
          console.log(err);
        } else {
          res.cookie("customer", token);
          res.send({
            isSuccess:true,
            message: "login success",
            token:token
          });
        }
      }
    );
  }else if(!isUserExist)
  {
    res.send({
      message:"User not found"
    })
  }
};

exports.deleteConsumer = async (req, res, next) => {
  var id = req.body.id;
  const deleteResponse = await consumer.deleteOne({ _id: id });
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
