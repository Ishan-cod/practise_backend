import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate  from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videofile: {
      type: String,  //Cloudinary URL
      required: true,
    },
    thumbnail: {
      type: String,  //Cloudinary URL
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: { 
      type: String,
    },
    duration: {
      type: Number,
      required:true
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default:true,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(mongooseAggregatePaginate)
// Used to write mongoose aggregation pipeline ??

export const Video = mongoose.model("Video", videoSchema);
