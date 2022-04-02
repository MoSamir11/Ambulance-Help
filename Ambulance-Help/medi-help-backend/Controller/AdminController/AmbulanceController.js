const admin = require("../../modal/Admin/admin");
const ambulance = require("../../modal/Admin/ambulance");
const staff = require("../../modal/Admin/staff");

exports.addAmbulance = async (req,res)=>{
  const data = req.body;
  console.log("138-->",data);
  const addingAmbulance = await admin.updateOne({_id:data.id},{$push:{ambulance:{driverName:data.driverName,ambulanceNumber:String(data.ambulanceNumber),driverContact:data.driverContact}}});
  if(addingAmbulance)
  {
    res.send({message:"Updated Successfully"})
    console.log("Upadted Successfully")
  }else{
    res.send({message:"Something went wrong"})
  }
}


