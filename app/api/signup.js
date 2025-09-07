import dbConnect from '../../lib/mongodb';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export default async function handleSignup(req, res) {
  await dbConnect(); // Ensure the DB is connected

  if (req.method === 'POST') {
    const { firstName, lastName, email, username, password, headline, about, skills, experience, website, location, city, educationDetails } = req.body;

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
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
        location,
        city,
        educationDetails,
      });

      // const newUser = new User({
      //   email,
      //   username,
      //   password: hashedPassword
      // });
      

      // Save the user to MongoDB
      await newUser.save();

      return res.status(201).json({ message: 'User created successfully!' });

    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
