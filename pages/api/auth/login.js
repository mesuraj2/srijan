
import connectdb from "../../../middleware/db";
import User from "../../../models/users";
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY="Suraj_kumar"



const handler= async (req,res)=>{
    if(req.method=='POST'){
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email:email})
        if(!user){
            return res.json({message:"enter correct data"})
        }
        if(!user.isverified){
            return res.json({isverified:false})
        }
       const compare=await bcrypt.compare(password,user.password)
       if(!compare){
        return res.json({message:"enter correct data"})
       }
       const data={
        user:{
            id:user.id
        }
       }
    //    console.log(user);
    //    console.log(data)
       var token = jwt.sign(data, SECRET_KEY);
       res.json({id:user.id,authtoken:token})
    } catch (error) {
            res.status(500).json("internal server error");
    }
}else{
    res.status(400).json({ error: "this method is not allowed" });

}
    
}
export default connectdb(handler)