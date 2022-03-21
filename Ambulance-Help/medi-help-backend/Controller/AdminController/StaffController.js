const staff = require("../../modal/Admin/staff");

exports.addStaff = async (req, res) => {
    const data = req.body;
    console.log("5-->",data)
    if (data) {
      const createResponse = await staff.create({
        hospitalName: data.hospitalName,
        employeeName: data.employeeName,
        employeeId: data.employeeId
      });
      if (createResponse) {
        res.send({ isSuccess: true, message: "Ambulance added Successfully" });
      } else {
        req.send({ isSuccess: false, message: "Something went wrong" });
      }
    }
};
  
  exports.staffList = async(req,res,next)=>{
    const hospital = req.params.hospitalName;
    console.log("62-->",hospital)
    const list = await staff.find({hospitalName:hospital});
    console.log(list)
    res.send({isSuccess:true,message:'Data fetched successfully', data:list})
  
}

exports.deleteStaff = async (req, res, next) => {
    var id = req.body.id;
    const deleteResponse = await staff.deleteOne({ _id: id });
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