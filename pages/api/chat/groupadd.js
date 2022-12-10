

import fetchuser from "../../../middleware/fetchuser"
import connectdb from "../../../middleware/db";
import User from "../../../models/users";
import Chat from "../../../models/chat";
import offer from "../../../models/offer";

//@description     Create New offer Chat
const handler= async (req,res)=>{
    if(req.method=='PUT'){
        const { chatId, userId } = req.body;



        // let check=await Chat.find({_id:chatId,users:{$elemMatch:{$eq:userId}}})
        // if(check){
        //   return res.send('user aleady exits');
        // }
      // check if the requester is admin
      const added = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: { users: userId },
        },
        {
          new: true,
        }
      )
        .populate("users", "-password")
    
      if (!added) {
        res.status(404);
        throw new Error("Chat Not Found");
      } else {
        res.json(added);
      }
}
else{
    res.status(400).json({ error: "this method is not allowed" });
}
}
export default fetchuser(connectdb(handler))