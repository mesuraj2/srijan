

import fetchuser from "../../../middleware/fetchuser"
import connectdb from "../../../middleware/db";
import User from "../../../models/users";
import Chat from "../../../models/chat";


//@description     Create or fetch One to One Chat
const handler= async (req,res)=>{
    if(req.method=='POST'){
        const {UserId}=req.body;
        // console.log(req.user.id)
    
        var ischat=await Chat.find({
            isGroupChat: false,
            $and:[
                {users:{$elemMatch:{$eq:req.user.id}}},
                {users:{$elemMatch:{$eq:UserId}}}
            ]
        }).populate("users","-password").populate("latestMessage")
    
        ischat=await User.populate(ischat,{
            path:"latestMessage.sender",
            select:"name pic email"
        })
    
        if(ischat.length>0){
            res.send(ischat[0])
        }
        else{
            var chatdata={
                chatName: "sender",
                isGroupChat: false,
                users:[req.user.id,UserId]
            }
    
            // const createchat=await Chat.create(chatdata)
            // const fullchat=await Chat.findOne({_id:createchat._id}).populate("users","-password")
            // res.send(fullchat)
    
    
            try {
                const createdChat = await Chat.create(chatdata);
                const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                  "users",
                  "-password"
                );
                res.status(200).json(FullChat);
              } catch (error) {
                res.status(400);
                throw new Error(error.message);
              }
    
        }
}
else{
    res.status(400).json({ error: "this method is not allowed" });
}
}
export default fetchuser(connectdb(handler))