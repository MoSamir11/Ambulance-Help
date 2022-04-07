const admin = require("../../modal/Admin/admin");

exports.addStaff = async (req,res)=>{
  const data = req.body;
  console.log("138-->",data);
  const addingAmbulance = await admin.findOne({_id:data.id}).updateOne({_id:data.id},{$push:{staff:{employeeName:data.employeeName,employeeId:data.employeeId}}});
  if(addingAmbulance)
  {
    res.send({isSuccess:true,message:"Updated Successfully"})
    console.log("Upadted Successfully")
  }else{
    res.send({message:"Something went wrong"})
  }
}
  
exports.staffList = async(req,res,next)=>{
    const id = req.params.id;
    console.log("62-->",id)
    const list = await admin.findOne({_id:id});
    console.log(list.staff)
    res.send({isSuccess:true,message:'Data fetched successfully', data:list.staff})
}

exports.deleteStaff = async (req, res, next) => {
    const data = JSON.parse(JSON.stringify(req.body));
    console.log(data);
    const updateResponce = await admin.updateOne({_id:data.hospitalId},{$pull:{"staff":{_id:data.id}}});
    if(updateResponce){
      res.send({message:"Data deleted successfully"})
    }else{
      res.send({message:"something went wrong"})
    }
};