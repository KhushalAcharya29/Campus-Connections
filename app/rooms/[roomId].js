"use client";
import { useRouter } from "next/navigation";

const members = [
  { id: 1, name: "Khushal", role: "Admin" },
  { id: 2, name: "Aarav", role: "Member" },
  { id: 3, name: "Riya", role: "Member" },
  { id: 4, name: "Sam", role: "Moderator" },
];

export default function RoomDetailPage({ params }) {
  const router = useRouter();
  const { roomId } = params;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800">Room ID: {roomId}</h1>
        <p className="text-gray-600 mt-2">
          Collaborate with students passionate about coding, AI, and technology.
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">Group Members</h2>
          <ul className="mt-2 space-y-2">
            {members.map((member) => (
              <li
                key={member.id}
                className="flex justify-between bg-gray-200 p-3 rounded-lg"
              >
                <span className="font-medium">{member.name}</span>
                <span className="text-sm text-gray-600">{member.role}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => router.push("/rooms")}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Leave Room
        </button>
      </div>
    </div>
  );
}
