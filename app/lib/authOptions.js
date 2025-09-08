// app/lib/authOptions.js
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./mongodb";
import User from "@/app/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ username: credentials.username });
        if (!user) throw new Error("User not found");
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};
