import { cookies } from "next/headers";

export async function POST() {
  try {
    cookies().delete("next-auth.session-token"); // Clear the session
    return new Response(JSON.stringify({ message: "Logged out successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Logout failed" }), { status: 500 });
  }
}
