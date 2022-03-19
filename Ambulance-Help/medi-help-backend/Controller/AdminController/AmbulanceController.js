const ambulance = require("../../modal/Admin/ambulance");

exports.addAmbulance = async (req, res) => {
  const data = req.body;
  console.log("5-->",data)
  if (data) {
    const createResponse = await ambulance.create({
      hospitalName: data.hospitalName,
      driverName: data.driverName,
      ambulanceNumber: data.ambulanceNumber,
      driverContact: data.driverContact,
    });
    if (createResponse) {
      res.send({ isSuccess: true, message: "Ambulance added Successfully" });
    } else {
      req.send({ isSuccess: false, message: "Something went wrong" });
    }
  }
};

exports.deleteAmbulance = async (req, res, next) => {
  var id = req.body.id;
  const deleteResponse = await ambulance.deleteOne({ _id: id });
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