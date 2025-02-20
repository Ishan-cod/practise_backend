import { asyncHandler } from "../utils/async_handler.js";
import { ApiError } from "../utils/API_Error.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/API_response.js";

const generateAccessAndrefreshtoken = async (userid) => {
  try {
    const user = await User.findById(userid);
    const accesstoken = user.generateAccessToken();
    // console.log("access token at functional generation is : ",accesstoken);
    
    const refreshtoken = user.generateRefreshToken();
    user.refreshtoken = refreshtoken;

    await user.save({
      validateBeforeSave: false,
    });

    return { refreshtoken, accesstoken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
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

  const { fullname, email, username, password } = req.body;

  // if(fullname === ""){
  //     throw new ApiError(400, 'fullname is required')
  // }

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exist");
  }

  console.log(req.files);
  console.log("\n", req.body);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar not uploaded");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // Mongo db automatically adds a _id with each database object in database

  const CreatedUser = await User.findById(user._id).select(
    "-password -refreshtoken" //This two field are not selected
  );

  if (!CreatedUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, CreatedUser, "user successfully created"));
});

const loginUser = asyncHandler(async (req, res) => {
  // req -> body == data
  // username or email
  // find the user
  // User DNE - or DE
  // password check
  // access and refresh token generate
  // send cookie

  const { email, username, password } = req.body;
  if (!(username || email))
    throw new ApiError(400, "Username or email is required");

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) throw new ApiError(404, "User doesnot not exist");

  const ispasswordValid = await user.isPasswordCorrect(password);

  if (!ispasswordValid) throw new ApiError(401, "Password incorrect");

  const { refreshtoken ,accesstoken } = await generateAccessAndrefreshtoken(
    user._id
  );

  // console.log("access token is : ", accesstoken);
  console.log("refresh/ token is : ",  refreshtoken);
  

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );

  // Cookies can be modified from both frontend and backend "OPTIONS" help in doing it only from backend

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accesstoken", accesstoken, options)
    .cookie("refreshtoken", refreshtoken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accesstoken,
          refreshtoken,
        },
        "User logged in successfully "
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  //clear cookies
  // reset refresh token from database i.e. user model
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshtoken: undefined,
      },
    },
    {
      new: true,
    }
  );


  const options = {
    httpOnly:true,
    secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshtoken", options)
  .json(new ApiResponse(200, {}, "User logged Out"))



});

export { logoutUser, loginUser, registerUser };
