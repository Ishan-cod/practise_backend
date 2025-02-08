import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
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
    ref: "Video"

  },
  password: {
    type: String,
    required: [true, 'Password is required'],

  },
  refreshToken:{
    type : String
  }
},
{
    timestamps: true,
});

export const User = mongoose.model("User", userSchema);
