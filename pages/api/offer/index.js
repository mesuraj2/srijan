

import fetchuser from "../../../middleware/fetchuser"
import connectdb from "../../../middleware/db";
import User from "../../../models/users";
import Chat from "../../../models/chat";
import offer from "../../../models/offer";

//@description     Create New group Chat
const handler= async (req,res)=>{
    if(req.method=='POST'){
        const {Offername,coordinate,offer_chat_id}=req.body;

        let location=JSON.parse(coordinate);
        try {
            const offer1 = await offer.create({
                offername:Offername,
                Location:{
                    type: "Point",
                    coordinates: location
                  },
                  chat_id:offer_chat_id
              });
              const fullGroupChat = await offer.findOne({ _id: offer1._id })
              res.status(200).json(fullGroupChat);
        } catch (error) {
            res.send(error)
        }
}
else{
    res.status(400).json({ error: "this method is not allowed" });
}
}
export default fetchuser(connectdb(handler))