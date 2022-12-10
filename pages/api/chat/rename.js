

import fetchuser from "../../../middleware/fetchuser"
import connectdb from "../../../middleware/db";
import User from "../../../models/users";
import Chat from "../../../models/chat";
import offer from "../../../models/offer";

//@description     Create New offer Chat
const handler= async (req,res)=>{
    if(req.method=='PUT'){
        const { chatId, chatName } = req.body;

        const updatedChat = await Chat.findByIdAndUpdate(
          chatId,
          {
            chatName: chatName,
          },
          {
            new: true,
          }
        )
          .populate("users", "-password")
      
        if (!updatedChat) {
          res.status(404);
          throw new Error("Chat Not Found");
        } else {
          res.json(updatedChat);
        }
}
else{
    res.status(400).json({ error: "this method is not allowed" });
}
}
export default fetchuser(connectdb(handler))