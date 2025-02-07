import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
       console.log(`\n MONGO_DB connected successfully : DB_HOST = ${connectionInstance.connection.host} \n`);
       

    //    ConnectionInstance is a mongoose object that contains the connection details

    //    connectionInstance.connection.host ??? 

    } catch (error) {
        console.log("MONGO_DB connection failed ");
        console.log(error);
        
        process.exit(1);
        
    }
}

// Whenever a async function is completed a promise is returned ...


export default connectDB