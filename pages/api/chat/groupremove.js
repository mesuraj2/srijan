

import fetchuser from "../../../middleware/fetchuser"
import connectdb from "../../../middleware/db";
import User from "../../../models/users";
import Chat from "../../../models/chat";
import offer from "../../../models/offer";

//@description     Create New offer Chat
const handler= async (req,res)=>{
    if(req.method=='PUT'){
        const { chatId, userId } = req.body;

        // check if the requester is admin
      
        const removed = await Chat.findByIdAndUpdate(
          chatId,
          {
            $pull: { users: userId },
          },
          {
            new: true,
          }
        )
          .populate("users", "-password")
      
        if (!removed) {
          res.status(404);
          throw new Error("Chat Not Found");
        } else {
          res.json(removed);
        }
}
else{
    res.status(400).json({ error: "this method is not allowed" });
}
}
export default fetchuser(connectdb(handler))