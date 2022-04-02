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