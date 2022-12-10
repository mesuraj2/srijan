

import fetchuser from "../../../middleware/fetchuser"
import connectdb from "../../../middleware/db";
import User from "../../../models/users";
import Chat from "../../../models/chat";
import Message from "../../../models/Message";
import offer from "../../../models/offer";

//@description     Create New offer Chat
const handler= async (req,res)=>{
    if(req.method=='POST'){
        const {content,chatId}=req.body
        // console.log(req.user.id)
        const id= req.user.id
        // console.log
        var newMessage={
            sender:id,
            content:content,
            chat:chatId
        }
    
        try {
        var message= await Message.create(newMessage)
        message= await message.populate("sender","name email pic")
        message= await message.populate("chat")
        message =await User.populate(message,{
            path:"chat.users",
            select:" name pic email"
        })
        // console.log(message)
        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message,
        })
        res.json(message)
        } catch (error) {
            res.send(error)
        }
}
else{
    res.status(400).json({ error: "this method is not allowed" });
}
}
export default fetchuser(connectdb(handler))