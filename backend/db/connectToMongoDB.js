import mongoose from "mongoose";
    const connectToMongoDB= async()=>{
        try {
            await mongoose.connect(process.env.MONGO_DB_URI);
            console.log("Connected to the MONGO_DB");
            
        } catch (error) {
            console.log("Error connecting to the DATABASE",error.message)
        }
    }

    export default connectToMongoDB;