const admin = require("../../modal/Admin/admin");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
exports.adminSignup = async (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body));
  const isUserExist = await admin.findOne({name:data.hospitalName})
  console.log(data);
  // if (!isUserExist) {
  //   bcrypt.genSalt(10, function (err, salt) {
  //     bcrypt.hash(req.body.password, salt, async function (err, hash) {
  //       const createResponce = await user.create({
  //         hospitalName: req.body.hospitalName,
  //         phone: req.body.phone,
  //         email:req.body.email,
  //         userType:'Service Provider',
  //         address:req.body.address,
  //         pin:req.body.pin,
  //         password: hash,
  //         lattitude:req.body.lattitude,
  //         longitude:req.body.longitude,
  //       });
  //       console.log(createResponce);
  //       if (createResponce) {
  //         let email = createResponse.email;
  //         let subject = "User Registered";
  //         let data = `<h1>Thank you for register in Medi Help</h1>`;
  //         const mailSent = await common.mail(email, subject, data);
  //         if (mailSent) {
  //           res.send({
  //             success: true,
  //             message: "User registered successfully please check your mail",
  //         });
  //       }
  //       } else {
  //         res.send({ error: "Something went wrong" });
  //       }
  //     });
  //   });
  // } else {
  //   res.send({ error: "User already exist" });
  // }
};
