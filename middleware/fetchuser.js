import jwt from 'jsonwebtoken'
const SECRET_KEY="Suraj_kumar"
import secureLocalStorage from 'react-secure-storage';
const fetchuser= handler => async (req,res)=>{
    const token=req.headers['auth-token'];
    if(!token){
        res.send({error:'please authenticate first'})
    }
    try {
    const data =jwt.verify(token,SECRET_KEY);
    // console.log(data.user)
    req.user=data.user
        return handler(req,res);
} catch (error) {
    res.send({error:'please authenticate first'})
}
}
export default fetchuser;