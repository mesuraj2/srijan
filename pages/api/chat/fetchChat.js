

import fetchuser from "../../../middleware/fetchuser"
import connectdb from "../../../middleware/db";
import User from "../../../models/users";
import Chat from "../../../models/chat";
import Message from "../../../models/Message";

//@description     Create New group Chat
const handler= async (req,res)=>{
    if(req.method=='GET'){
        try {
            Chat.find({users:{$elemMatch:{$eq:req.user.id}}})
            .populate("users","-password")
            .populate("latestMessage")
            .sort({updatedAt:-1})
            .then(
                async (results)=>{
                    results=await User.populate(results,{
                        path:"latestMessage.sender",
                         select:"name pic email"
                    })
                    res.send(results)
                }
            )
            } catch (error) {
                res.status(400).send(error)
            }
}
else{
    res.status(400).json({ error: "this method is not allowed" });
}
}
export default fetchuser(connectdb(handler))