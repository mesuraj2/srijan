

import connectdb from "../../../../middleware/db";
import User from "../../../../models/users";
// import Chat from "../../../models/chat";
import Message from "../../../../models/Message";
// import offer from "../../../models/offer";

//@description     Create New group Chat
const handler= async (req,res)=>{
    if(req.method=='GET'){
        // console.log(req.query.chatId)
    const message=await Message.find({chat:req.query.chatId})
    .populate("sender","name pic email")
    .populate("chat")
    res.json(message)
}
else{
    res.status(400).json({ error: "this method is not allowed" });
}
}
export default connectdb(handler)