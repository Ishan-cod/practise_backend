import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      // Index true is generally used when want to enable search in this...
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //Cloudinary url is stored
      required: true,
    },
    coverimage: {
      type: String, //Cloudinary url is stored
      required: false,
    },
    watchHistory: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);



// Direct encryption is not possible we use mongoose hooks --> like pre, post
// pre --> like middleware -- do something before saving data in mongo db
// post --> like middleware -- do something just after saving data in mongo db.



// Donot use arrow function in while schema middleware as "this" cannot be used in arrow function
// next ??
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  // hash(<whatToHash>,<NoOfRound>)

  next();
});


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
    // This will give a true or false.
}
 

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
    )
}
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      _id: this._id,
      
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}


export const User = mongoose.model("User", userSchema);
