

import fetchuser from "../../../middleware/fetchuser"
import connectdb from "../../../middleware/db";
import User from "../../../models/users";
const nodemailer =require('nodemailer')
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const handler= async (req,res)=>{
    if(req.method=='POST'){
        //  console.log(req.query.email)
         const user=await User.findOne({email:req.query.email})
         if(user){
             // console.log(user)
             user.isverified=true
             await user.save();
             res.send({message:"done"})
         }
         else{
            res.send({session:false})
         }
}
else{
    res.status(400).json({ error: "this method is not allowed" });
}
}
export default connectdb(handler)