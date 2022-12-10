

import connectdb from "../../../middleware/db";
import User from "../../../models/users";
import Chat from "../../../models/chat";
import offer from "../../../models/offer";

//@description     Create New offer Chat
const handler= async (req,res)=>{
    if(req.method=='GET'){
        try {
            const fullGroupChat = await offer.find(
     {
       Location:
         { $near :
            {
              $geometry: { type: "Point",  coordinates: [ 17.614, 78.0816 ] },
              $maxDistance: 100000
            }
         }
     }
  )
            res.status(200).json(fullGroupChat);
      } catch (error) {
          res.send(error)
      }
}
else{
    res.status(400).json({ error: "this method is not allowed" });
}
}
export default connectdb(handler)