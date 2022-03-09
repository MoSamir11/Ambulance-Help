const admin = require("../../modal/Admin/admin");

exports.adminSignup = async (req, res) => {
  const data = JSON.parse(JSON.stringify(req.body));
  console.log("5 data-->", data);
};
