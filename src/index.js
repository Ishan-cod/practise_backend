// require ('dotenv').config({path: "./env"})
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
    path : "./env"
})



// This is a promise...
connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`APP is listening on PORT : ${process.env.PORT}` );
        
    })    
})
.catch((error) => {
    console.log("MONGO DB CONNECTION FAILED !!", error);
    
}) 