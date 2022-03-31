const { json } = require("express");
var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var jwt = require("jsonwebtoken");
const upload = require("../middleware/upload");
const { token } = require("morgan");
const nodemailer = require("nodemailer");
const ConsumerController = require("../Controller/ConsumerController/consumerController.js");
const AdminController = require("../Controller/AdminController/AdminController");
const AmbulanceController = require("../Controller/AdminController/AmbulanceController");
const StaffController = require("../Controller/AdminController/StaffController");
var cors = require('cors')

router.use(cors());

const consumer = require("../modal/consumer/consumer");
const admin = require("../modal/Admin/admin");
const ambulance = require("../modal/Admin/ambulance");
const staff = require("../modal/Admin/staff");
// const ambulance = require("../modal/Admin/ambulance");
/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/consumer-signup", function (req, res, next) {
  res.render(".././views/ConsumerArea/consumer-signup");
});

router.get("/consumer-login", function (req, res, next) {
  res.render(".././views/ConsumerArea/consumer-login");
});

router.get("/all-consumer", async function (req, res, next) {
  const users = await consumer.find({});
  res.render(".././views/ConsumerArea/AllCustomers", { product: users });
});

router.get("/admin-signup", async function (req, res, next) {
  res.render(".././views/AdminArea/adminSignup");
});

router.get('/all-admin',async function(req,res){
  const adminData = await admin.find({});
  res.send({isSuccess:true,total:admin.length,message:"Data fetched successfully",data:adminData})
})

router.get('/adminList/:id',async function(req,res){
  const id = req.params.id;
  console.log(id)
  const adminData = await admin.findOne({_id:id});
  if(adminData){
    res.send({isSuccess:true,data:adminData})
    console.log("58-->",adminData)
  } else{
    res.send({message:'Something went wrong'})
  }
})

router.get('/all-hospital',async function(req,res){
  const adminData = await admin.find({});
  res.send({total:admin.length,message:"Data fetched successfully",data:adminData})
})

router.get('/all-ambulance',async function(req,res){
  const ambulances = await ambulance.find({});
  res.render(".././views/AdminArea/allAmbulance",{ambulance:ambulances});
})

router.get('/all-staff',async function(req,res){
  const allStaff = await staff.find({});
  res.render(".././views/AdminArea/allStaff",{staff:allStaff});
})  

router.get('/all-admin/:address',async function(req,res){
  const city = req.params.address;
  const adminData = await admin.find({address:city});
  if(admin)
  {
    res.send({message:"Data fetched Successfully",length:adminData.length,data:adminData})
  }else{
    res.send({message:"No Data available"})
  }
})

router.post("/consumer-signup", ConsumerController.consumerSignup);
router.post("/consumer-login", ConsumerController.consumerLogin);
router.post("/delete-consumer", ConsumerController.deleteConsumer);
router.post("/admin-signup", AdminController.adminSignup);
router.post("/admin-login", AdminController.adminLogin);
router.post("/delete-admin", AdminController.deleteAdmin);
router.post("/add-ambulance", AmbulanceController.addAmbulance);
router.post("/delete-ambulance", AmbulanceController.deleteAmbulance);
router.post("/add-staff", StaffController.addStaff);
router.post("/delete-staff", StaffController.deleteStaff);
router.post("/notification",AdminController.ambulanceRequest);
router.get("/hospital/:address",AdminController.hospitalList);
router.get("/ambulanceList/:hospitalName", async (req,res)=>{
  const id = req.params.hospitalName;
  console.log("38",id)
  const list = await ambulance.find({hospitalName:id});
  console.log("40-->",list)
  res.send({isSuccess:true,message:'Data fetched successfully', data:list})
  });
router.get("/staffList/:hospitalName", StaffController.staffList);

module.exports = router;
