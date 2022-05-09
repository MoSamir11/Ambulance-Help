const { TrunkPage } = require("twilio/lib/rest/trunking/v1/trunk");
const admin = require("../../modal/Admin/admin");

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

exports.deleteNotification = async (req,res)=>{
  const data =JSON.parse(JSON.stringify(req.body));
  console.log(data);
  const updateResponce = await admin.updateOne({_id:data.hospitalId},{$pull:{"notification":{_id:data.id}}});
  if(updateResponce)
  {
    res.send({isSuccess:true,message:"Notification deleted successfully"})
    console.log("Deleted Successfully")
  }
}