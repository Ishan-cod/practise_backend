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


# PART - 05
1. Installed a package --> "npm i mongoose-aggregate-paginate-v2"

For writting Mongoose aggregation pipeline...

2. Installed another package --> "npm i bcrypt"

For encrypting password and decrypting it --> it used cryptography for this purpose.

3. Another package installed to create tokens --> JSON web token (JWT)

It is also based on cryptography.

<div>
WHAT IS JWT ?

JWT is a bearer token ... all those who has this token will have access to my database ... like a key

</div>



# PART - 06

Registering the user 




<!-- Token not recieving in middleware need to fix this  -->