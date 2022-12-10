

import fetchuser from "../../../middleware/fetchuser"
import connectdb from "../../../middleware/db";
import User from "../../../models/users";
const nodemailer =require('nodemailer')
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const handler= async (req,res)=>{
    if(req.method=='GET'){
        // console.log(req.query)
        const keyword=req.query.search ? {
            $or:[
                {name:{$regex:req.query.search,$options:"i"}},
                {email:{$regex:req.query.search,$options:"i"}},
            ],
        }:{};
        try {
        const users=await User.find(keyword).find({_id:{$ne:req.user.id}})
        // console.log(users)
        res.send(users)
        } catch (error) {
            res.send("error")
        }
}
else{
    res.status(400).json({ error: "this method is not allowed" });
}
}
export default fetchuser(connectdb(handler))