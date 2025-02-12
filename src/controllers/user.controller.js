import { asyncHandler } from "../utils/async_handler.js";
import {ApiError} from "../utils/API_Error.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/API_response.js"


const registerUser = asyncHandler(async(req,res) => {
    // <--- "To register a user" --> 
    // Get user detail from frontend (here POSTMAN) -->

    // Validation (empty field ?)
    // Check if user already exist (using email or username or both)
    // Check for images, check for avatar
    // Upload them to cloudinary
    // Create user Object - Create entry in DB 
    // remove password and refresh token field form response
    // check for user creation 
    // return response else error 
    


    const {fullname, email, username, password} = req.body;
    

    // if(fullname === ""){
    //     throw new ApiError(400, 'fullname is required')
    // }

    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) 
    {
        throw new ApiError(400, "All field are required");
    }
    

    const existedUser = User.findOne({
        $or : [{ username },{ email }]
    })

    if (existedUser) {
        throw new ApiError(409 , "User already exist")
    }


    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;




    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar not uploaded");
    }


    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    
    // Mongo db automatically adds a _id with each database object in database

    const CreatedUser = await User.findById(user._id).select(
        "-password -refreshToken"  //This two field are not selected
    )

    if(!CreatedUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json({
        new ApiResponse(200, CreatedUser, "User created successfully")
    })
})








export  {
    registerUser,
    
}