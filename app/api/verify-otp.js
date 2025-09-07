// // pages/api/verify-otp.js
// import User from '../../models/User';

// export default async function handler(req, res) {
//   const { email, otp } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) return res.status(404).json({ message: 'User not found' });

//   // Check OTP validity and expiration
//   if (user.otp !== otp || Date.now() > user.otpExpiresAt) {
//     return res.status(400).json({ message: 'Invalid or expired OTP' });
//   }

//   // Mark user as verified
//   user.isVerified = true;
//   user.otp = undefined;
//   user.otpExpiresAt = undefined;
//   await user.save();

//   res.status(200).json({ message: 'OTP verified successfully' });
// }
