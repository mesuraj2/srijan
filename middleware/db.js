import mongoose from "mongoose";

const connectdb =handler => async (req,res)=>{
    if(mongoose.connections[0].readyState){
        console.log("contected1")
        return handler(req,res)
    }
    await mongoose.connect("mongodb://localhost:27017/srijankumar")
    console.log("contected2")
    return handler(req,res);
    // try {
    //     const conn =  mongoose.connect("mongodb://localhost:27017/srijankumar", {
    //       useNewUrlParser: true,
    //       useUnifiedTopology: true,
    //     });
    
    //     console.log(`MongoDB Connected`);
    //     return handler(req,res);

    //   } catch (error) {
    //     console.log(`Error: ${error.message}`);
    //     process.exit();
    //   }
}
export default connectdb