

import fetchuser from "../../../middleware/fetchuser"
import connectdb from "../../../middleware/db";
import User from "../../../models/users";
import Chat from "../../../models/chat";
import offer from "../../../models/offer";

//@description     Create New group Chat
const handler= async (req,res)=>{
    if(req.method=='POST'){
        // const {user,chatName}=req.body;

    try {
        var users = JSON.parse(req.body.users);
        
      } catch (error) {
        res.send(error)
      }

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user.id);
console.log(req.user.id)




    try {
        const groupChat = await Chat.create({
          chatName: req.body.name,
          users: users,
          isGroupChat: true,
        });
    
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
          .populate("users", "-password")
        //   .populate("groupAdmin", "-password");
    
        res.status(200).json(fullGroupChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
}
else{
    res.status(400).json({ error: "this method is not allowed" });
}
}
export default fetchuser(connectdb(handler))