import mongoose from "mongoose";



const connectDb = async () => {
    try {
        console.log("Trying to connect to MongoDB..."); 

        const connect = await mongoose.connect(process.env.MONGO_URI!);
        console.log("mongo connect: " + connect.connection.host);
    }
    catch (error) {
        console.error(error);
    }
}

export default connectDb