import mongoose from "mongoose";

const connectDb = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DATA BASE CONNECTED ${conn.connection.host }`);
    } catch (e) {
        console.error(`Error : ${e.message}`);
        process.exit(1);
    }
}

export default connectDb;