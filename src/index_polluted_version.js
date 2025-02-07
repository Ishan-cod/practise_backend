import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express"

    
const app = express();


(async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        app.on('error',(error) => {
            console.log(error);
            throw error;
            
        })

        app.listen(process.env.PORT, () => {
            console.log(`APP is listening on port ${process.env.PORT}`);
            
        })

    } catch (error) {
        console.error();
        
    }
})()