

import fetchuser from "../../../middleware/fetchuser"
import connectdb from "../../../middleware/db";
import User from "../../../models/users";
import Chat from "../../../models/chat";
import offer from "../../../models/offer";

//@description     Create New offer Chat
const handler= async (req,res)=>{
    if(req.method=='POST'){
        const {chatName,offerid,coordinate}=req.body;
        let location=JSON.parse(coordinate);
        // console.log(chatName,offerid,location)
        try {
            const groupChat = await Chat.create({
              chatName: chatName,
              users: req.user.id,
              isOfferChat: true,
              isGroupChat:true,
              Location:{
                type: "Point",
                coordinates: location
              },
              offerid:offerid
            });
            await offer.findByIdAndUpdate({_id:offerid},{chat_id:groupChat._id})
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