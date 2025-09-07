



// import {sendVerificationEmail} from "@/helpers/sendVerificationEmail"

// export async function POST(request: Request) {
//     await dbConnect()
//     try{
//         const {username, email, password} = await request.json()
//     }catch(error){
//         console.error('Error registering user',error)
//         return Response.json({
//             success: false,
//             message: 'Error registering user',
//         },
//     {
//         status: 500
//     })
//     }
// }


// import dbConnect from '@/app/lib/mongodb';
// import User from '@/app/models/User';
// import bcrypt from 'bcryptjs';

// export async function POST(req, res) {
//   try {
//     await dbConnect();  // Connect to the database

//     const body = await req.json();

//     const { firstName, lastName, email, username, password, headline, about, skills, experience, website, city, location, educationDetails } = body;

//     // Check if the email or username already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
//     }

//     // Hash the password before saving it
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       username,
//       password: hashedPassword,
//       headline,
//       about,
//       skills,
//       experience,
//       website,
//       city,
//       location,
//       educationDetails
//     });

//     // Save the user in MongoDB
//     const savedUser = await newUser.save();
//     return new Response(JSON.stringify({ message: 'User created successfully', user: savedUser }), { status: 201 });

//   } catch (error) {
//     console.error('Error creating user:', error);
//     return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500 });
//   }
// }

// import dbConnect from '@/app/lib/mongodb';
// import User from '@/app/models/User';
// import bcrypt from 'bcryptjs';
// import nodemailer from 'nodemailer';

// export async function POST(req, res) {
//   try {
//     await dbConnect();  // Connect to the database
//     console.log('Database connected');  // Debugging message

//     const body = await req.json();

//     const { firstName, lastName, email, username, password, headline, about, skills, experience, website, city, location, educationDetails } = body;

//     // Check if the email or username already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       console.log('User already exists');
//       return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
//     }

//     // Hash the password before saving it
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       username,
//       password: hashedPassword,
//       headline,
//       about,
//       skills,
//       experience,
//       website,
//       city,
//       location,
//       educationDetails
//     });



//     // Save the user in MongoDB
//     const savedUser = await newUser.save();
//     console.log('User saved:', savedUser);  // Debugging message
//     return new Response(JSON.stringify({ message: 'User created successfully', user: savedUser }), { status: 201 });

//   } catch (error) {
//     console.error('Error creating user:', error);
//     return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500 });
//   }
// }


// new code with OTP generation -->

// import dbConnect from '@/app/lib/mongodb';
// import User from '@/app/models/User';
// import bcrypt from 'bcryptjs';
// import nodemailer from 'nodemailer';
// import { NextResponse } from 'next/server';

// // Function to generate a 6-digit OTP
// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000); // 6-digit random number
// }

// export async function POST(req, res) {
//   try {
//     await dbConnect();  // Connect to the database
//     console.log('Database connected');  // Debugging message

//     const body = await req.json();

//     const { firstName, lastName, email, username, password, headline, about, skills, experience, website, city, location, educationDetails } = body;

//     // Check if the email or username already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       console.log('User already exists');
//       return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
//     }

//     // Hash the password before saving it
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Generate OTP and set expiration time (e.g., 2 minutes from now)
//     const otp = generateOTP();
//     const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now

//     // Create a new user
//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       username,
//       password: hashedPassword,
//       headline,
//       about,
//       skills,
//       experience,
//       website,
//       city,
//       location,
//       educationDetails,
//       otp,  // Store OTP in the user document
//       otpExpiresAt  // Store OTP expiry time
//     });

//     // Save the user in MongoDB
//     const savedUser = await newUser.save();
//     console.log('User saved:', savedUser);  // Debugging message

//     // Send OTP via email
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USERNAME, // Your email
//         pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USERNAME,
//       to: email,
//       subject: 'Your OTP for Verification',
//       text: `Hello ${firstName},\n\nYour OTP for email verification is: ${otp}. It will expire in 2 minutes.\n\nThank you!`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending OTP email:', error);
//         return new Response(JSON.stringify({ message: 'Problem in sending OTP, check your connection please' }), { status: 500 });
//       } else {
//         console.log('OTP email sent:', info.response);
//         return new Response(JSON.stringify({ message: 'User created successfully. OTP sent to email.', otpSent: true }), { status: 201 });
//       }
//     });

//   } catch (error) {
//     console.error('Error creating user:', error);
//     return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500 });
//   }
// }


import dbConnect from '@/app/lib/mongodb';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Function to generate a 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit random number
}

export async function POST(req) {
  try {
    await dbConnect();  // Connect to the database
    console.log('Database connected');  // Debugging message

    const body = await req.json();
    const { firstName, lastName, email, username, password, headline, about, skills, experience, website, city, location, educationDetails } = body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP and set expiration time (2 minutes from now)
    const otp = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now

    // Create a new user object but don&apos;t save it yet
    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      headline,
      about,
      skills,
      experience,
      website,
      city,
      location,
      educationDetails,
      otp,  // Store OTP in the user document
      otpExpiresAt  // Store OTP expiry time
    });

    // Set up the email transport using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
      },
    });

    // Email message details
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Your OTP for Verification',
      text: `Hello ${firstName},\n\nYour OTP for email verification is: ${otp}. It will expire in 2 minutes.\n\nThank you!`,
    };

    const user = await User.findOneAndUpdate(
      { email: req.body.email }, 
      { otp: otp, otpExpiresAt: otpExpiresAt }, 
      { new: true }
    );
    

    // Send the OTP email
    const info = await transporter.sendMail(mailOptions);

    if (info) {
      console.log('OTP email sent:', info.response);
      // Save the new user to MongoDB after successfully sending the email
      const savedUser = await newUser.save();
      console.log('User saved:', savedUser);  // Debugging message

      // Return a success response
      return NextResponse.json({ message: 'User created successfully. OTP sent to email.', otpSent: true }, { status: 201 });
    } else {
      return NextResponse.json({ message: 'Problem sending OTP, please check your connection.' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
