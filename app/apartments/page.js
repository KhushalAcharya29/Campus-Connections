"use client";

import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import Image from 'next/image';
const rooms = [
  {
    id: 1,
    name: "TYIT Room",
    details: "Block A, Room 001 - Create Your Room here!",
    status: "Open for Booking",
    image: "/brainstorm-meeting.jpg",
  },
  {
    id: 2,
    name: "SYIT Room",
    details: "Block B, Room 002 - Soon!",
    status: "Will be available soon",
    image: "/business.png",
  },
  {
    id: 3,
    name: "Library Study Room",
    details: "Block C, Room 003 - Soon!",
    status: "Will be available soon",
    image: "/librarie.png",
  },
  {
    id: 4,
    name: "Chill & Relax Space",
    details: "Block D, Room 004 - Soon!",
    status: "Will be available soon",
    image: "/relax.png",
  },
];

export default function ApartmentsPage() {
  const router = useRouter();

  const handleViewMoreClick = () => {
    toast.success("These are available rooms! More rooms will be available later!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* <Toaster position="top-center" reverseOrder={false} /> */}

      <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-8">
        Find & Join Student Rooms
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition hover:scale-105"
            onClick={() => {
              if (room.id === 1) {
                router.push(`/rooms`);
              } else {
                alert("This apartment does not navigate to the room page.");
              }
            }}
          >
            <div className="relative w-full h-48">
  <Image
    src={room.image}
    alt={room.name}
    fill
    className="object-cover rounded-lg"
  />
</div>

            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-700">
                {room.name}
              </h2>
              <p className="text-gray-500 text-sm">{room.details}</p>
              <p
                className={`font-bold mt-2 ${
                  room.status.includes("Available")
                    ? "text-green-600"
                    : room.status.includes("Reserved")
                    ? "text-orange-500"
                    : "text-red-500"
                }`}
              >
                {room.status}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleViewMoreClick}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
        >
          View More Rooms
        </button>
      </div>
    </div>
  );
}
