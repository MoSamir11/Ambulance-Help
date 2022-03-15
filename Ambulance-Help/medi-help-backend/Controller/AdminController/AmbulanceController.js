const ambulance = require("../../modal/Admin/ambulance");

exports.addAmbulance = async (req, res) => {
  const data = req.body;
  if (data) {
    const createResponse = await ambulance.create({
      hospitalName: data.hospitalName,
      driverName: data.driverName,
      driverContact: data.driverContact,
      ambulanceNumber: data.ambulanceNumber,
    });
    if (createResponse) {
      res.send({ isSuccess: true, messae: "Ambulance addes Successfully" });
    } else {
      req.send({ isSuccess: false, message: "Something went wrong" });
    }
  }
};
