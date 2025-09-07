// // app/api/verify-otp/route.js

// import User from '@/app/models/User';  // Correct import path

// export async function POST(req) {
//   try {
//     const { otp, email } = await req.json();

//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
//     }

//     // Check if the user exists and if the OTP and expiration time are set
//     if (!user || !user.otp || !user.otpExpiresAt) {
//       console.log('Error: OTP or expiration time not found.');
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     } 

//      // Debugging logs
//      console.log('Entered OTP:', otp);
//      console.log('Stored OTP:', user.otp);
//      console.log('Expiration Time:', user.otpExpiresAt);
//      console.log(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));


//     // Check if OTP is correct and has not expired
//     const currentTime = new Date();
//     if (user.otp === otp && user.otpExpiresAt > currentTime) {
//       // OTP is correct and not expired, proceed with verification
//       user.otp = null; // Clear OTP
//       user.otpExpiresAt = null; // Clear OTP expiry
//       await user.save();

//       return new Response(JSON.stringify({ success: true, message: 'OTP verified successfully' }), { status: 200 });
//     } else {
//       return new Response(JSON.stringify({ success: false, message: 'Invalid or expired OTP' }), { status: 400 });
//     }
//   } catch (error) {
//     console.error('Error verifying OTP:', error);
//     return new Response(JSON.stringify({ success: false, message: 'Internal server error' }), { status: 500 });
//   }
// }



// app/api/verify-otp/route.js

import User from '@/app/models/User'; // Correct import path

export async function POST(req) {
  try {
    const { otp, email } = await req.json();

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: 'User not found' }), { status: 404 });
    }

    // Check if the user exists and if the OTP and expiration time are set
    if (!user.otp || !user.otpExpiresAt) {
      console.log('Error: OTP or expiration time not found.');
      return new Response(JSON.stringify({ success: false, message: 'Invalid or expired OTP' }), { status: 400 });
    } 

    // Debugging logs
    console.log('Entered OTP:', otp);
    console.log('Stored OTP:', user.otp);
    console.log('Expiration Time:', user.otpExpiresAt);
    console.log('Current Time:', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }));

    // Check if OTP is correct and has not expired
    const currentTime = new Date();
    if (user.otp === otp && user.otpExpiresAt > currentTime) {
      // OTP is correct and not expired, proceed with verification
      user.otp = null; // Clear OTP
      user.otpExpiresAt = null; // Clear OTP expiry
      await user.save();

      return new Response(JSON.stringify({ success: true, message: 'OTP verified successfully' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Invalid or expired OTP' }), { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal server error' }), { status: 500 });
  }
}
