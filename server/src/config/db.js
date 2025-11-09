import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        const con = await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB connected :",con.connection.host)
    } catch (error) {
        console.error("FAILED TO CONNECT DB")
        console.error(error)
        process.exit(1);
    }
};

export default connectDB;