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
var cors = require('cors')

router.use(cors());

const consumer = require("../modal/consumer/consumer");
const admin = require("../modal/Admin/admin");
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
  res.render(".././views/AdminArea/allAdmin",{admin:adminData});
  // res.send({total:admin.length,message:"Data fetched successfully",data:adminData})
})

router.post("/consumer-signup", ConsumerController.consumerSignup);
router.post("/consumer-login", ConsumerController.consumerLogin);
router.post("/delete-consumer", ConsumerController.deleteConsumer);
router.post("/admin-signup", AdminController.adminSignup);
router.post("/admin-login", AdminController.adminLogin);
router.post("/delete-admin", AdminController.deleteAdmin);
router.post("/add-ambulance", AmbulanceController.addAmbulance);
module.exports = router;
