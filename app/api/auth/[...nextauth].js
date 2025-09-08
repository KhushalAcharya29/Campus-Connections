// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import connectDB from "@/app/lib/mongodb";
// import User from "@/app/models/User"; // Ensure this model exists

// const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         await connectDB();
//         const user = await User.findOne({ username: credentials.username });

//         if (!user) {
//           throw new Error("User not found");
//         }

//         return user;
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/login",
//   },
// };

// export const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
