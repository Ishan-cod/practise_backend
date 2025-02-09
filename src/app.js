import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();


app.use(cors({
    origin:"process.env.CORS_ORIGIN",
    credentials:true
}));

// To accept the json response from frontend...
app.use(express.json({
    limit : "16kb"

}))

// Use to temperory store static files pdf, text etc in server in public folder
app.use(express.static("public"))

// Used to parse the URL coded data
app.use(urlencoded({
    limit:"16kb",
    extended: true,
}))

// This is used to securely store and access cookies in user browser and access it securely 
app.use(cookieParser());





// Routes import
import userRouter from './routes/user.routes.js';
// Can give manchaha name when export is default


//route declaration
app.use("/api/v1/user", userRouter)

// https://localhost:8000/api/v1/users/register

export { app };