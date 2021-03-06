const consumer = require("../../modal/consumer/consumer");

exports.consumerNotification = async(req,res)=>{
    const data = req.body;
    console.log("5-->",data);
    const updateConsumerNotification = await consumer.findOne({_id:data.consumerId}).updateOne({_id:data.consumerId},{$push:{notification:{hospitalName:data.hospitalName,driverName:data.driverName,driverContact:data.driverContact}}});
    if(updateConsumerNotification)
    {
        console.log("Notification inserted Successfully");
        res.send({isSuccess:true,message:"Driver Detail sends t consumer"})
    }else{
        res.send({message:"Something went wrong"})
    }
}

exports.deleteConsumerNotification = async (req,res)=>{
    const data ='624da65497df00fb2d8a1ab7';
    console.log(JSON.parse(JSON.stringify(req.body)))
    console.log(data);
    const updateResponce = await consumer.updateOne({_id:data},{$pull:{"notification":{_id:req.body.id}}});
    if(updateResponce)
    {
      res.send({isSuccess:true,message:"Notification deleted successfully"})
      console.log("Deleted Successfully")
    }
}

exports.getConsumerDetail = async (req,res)=>{
    const id = req.params;
    console.log("30-->",id);
    const users = await consumer.findOne(id);
    if(users){
        res.send({isSuccess:true,message:"Data fetched successfully",data:users})
    }
}