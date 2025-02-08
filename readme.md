# PART - 01
Setting up environment for dev
1. npm init
2. npm i -D nodemon
3. npm i mongoose, express

# PART - 02
Connecting db to server
1. DB is in another continent
2. DB connected successfully

# PART - 03
App created using express 
1. app.use() --> is used to handle middleware 


# PART - 04
Creating Models of users and videos according to datamodel made

<div>[MODELS LINK](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj?origin=share)</div>

{trim: true} → Removes any extra spaces from the beginning and end.

 <h2>What is Schema.Types.ObjectId?</h2>

Schema.Types.ObjectId is a special data type in Mongoose.

It stores a MongoDB ObjectId (which is a unique identifier for a document in another collection).

Instead of storing actual video data in the user document, it stores a reference (ID) of a video document



1. Library required --> jsonwebtoken and bcrypt 






# Uploading file to cloudinary server...

1. We are uploading file to our local server then attenpt to upload to the cloudinary server
2. This help in retry of file upload to cloudinary in case of any failure attempt


# fs ??

By default nodejs package...
1. Used to open a file , change file settings