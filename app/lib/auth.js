import { getServerSession } from "next-auth";
import User from "@/app/models/User";

export async function getSessionUser(req) {
  const session = await getServerSession({ req });
  if (!session?.user) return null;
  
  const user = await User.findOne({ email: session.user.email });
  return user;
}
