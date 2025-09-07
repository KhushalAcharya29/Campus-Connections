// import mongoose from 'mongoose';

// const MessageSchema = new mongoose.Schema({
//   content: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     required: true,
//     default: Date.now
//   }
// });

// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, "Username is required"],
//     unique: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: [true, "Email is required"],
//     unique: true,
//     match: [/.+\@.+\..+/, 'please use a valid email address']
//   },
//   password: {
//     type: String,
//     required: [true, "Password is required"]
//   },
//   verifyCode: {
//     type: String,
//     required: [true, "Verify Code is required"]
//   },
//   verifyCodeExpiry: {
//     type: Date,
//     required: [true, "Verify Code Expiry is required"]
//   },
//   isVerified: {
//     type: Boolean,
//     default: false
//   },
//   isAcceptingMessage: {
//     type: Boolean,
//     default: true
//   },
//   messages: [MessageSchema]
// });

// const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

// export default UserModel;


import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  headline: String,
  about: String,
  skills: String,
  experience: String,
  website: String,
  city: String,
  location: String,
  educationDetails: Array,
  otp: String, // Ensure this is present
  otpExpiresAt: Date, // Ensure this is present
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;


