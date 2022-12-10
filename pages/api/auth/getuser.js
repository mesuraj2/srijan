

import fetchuser from "../../../middleware/fetchuser"
import connectdb from "../../../middleware/db";
import User from "../../../models/users";
const nodemailer =require('nodemailer')
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const handler= async (req,res)=>{
    if(req.method=='POST'){
        try {
          let userId=req.user.id;
           const user=await User.findOne({_id:userId}).select('-password')
           res.send(user);
        } catch (error) {
                res.status(500).json("internal server error");
        }
}
else{
    res.status(400).json({ error: "this method is not allowed" });
}
}
export default fetchuser(connectdb(handler))