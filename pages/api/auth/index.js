


import connectdb from "../../../middleware/db";
import User from "../../../models/users";
const nodemailer =require('nodemailer')
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY="Suraj_kumar"

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: "znsuraj7@gmail.com",
      pass: "zgsrcafffgoobxmh",
    },
  });

const handler= async (req,res)=>{
    if(req.method=='POST'){
        // console.log(req.body)
    const user=await User.findOne({email:req.body.email})

    if(user){
        return res.json({message:"email already exits",emailExits:true})
    }
    const salt =await bcrypt.genSalt(10);
    const pass=await bcrypt.hash(req.body.password, salt);
    var mailoption={
        from:'<znsuraj7@gmail.com>',
        to:req.body.email,
        subject:'verify your gmail',
        html:`<h2> verify your gmail</h2>
        <a href="https://poolandsave-vegex.ondigitalocean.app/email/account/${req.body.email}"> verify accound ${req.body.name}</a>
        `
    }


    transporter.sendMail(mailoption,function(error,info){
        if(error){
            console.log(error)
        }
        else{
            console.log("verification send to your mail")
        }
    })
    let result= await User.create({
    name:req.body.name,
    email:req.body.email,
    password:pass
   })
   const data={
    user:{
        id:result.id
    }
   }
//    console.log(data)
   var token = jwt.sign(data, SECRET_KEY);
   res.json({token:token})
}
else{
    res.status(400).json({ error: "this method is not allowed" });
}
    
}
export default connectdb(handler)