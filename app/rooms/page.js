"use client"; 
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [seatsAvailable, setSeatsAvailable] = useState(1);
  const [groupType, setGroupType] = useState("Public");
  const [username, setUsername] = useState("khushal07"); // Simulating logged-in user
  const [joiningStatus, setJoiningStatus] = useState({});
  const [deletingStatus, setDeletingStatus] = useState({});
  const [joinedRooms, setJoinedRooms] = useState({});
  const [pendingRequests, setPendingRequests] = useState({}); // Track pending requests
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedRoomIdToDelete, setSelectedRoomIdToDelete] = useState(null);
const [roomToDelete, setRoomToDelete] = useState("");

  const [newRoom, setNewRoom] = useState({ roomName: "", seatsAvailable: "", groupType: "Public", owner: "khushal07" });
  const loggedInUser = "khushal07";
  const router = useRouter();

  // Load joined rooms from localStorage
  useEffect(() => {
    const savedJoinedRooms = JSON.parse(localStorage.getItem("joinedRooms")) || {};
    setJoinedRooms(savedJoinedRooms);
  }, []);

  // Fetch Rooms
  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch("/api/rooms");
        const data = await res.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    }
    fetchRooms();

    // Retrieve joined rooms & pending requests from local storage
   const storedJoinedRooms = JSON.parse(localStorage.getItem("joinedRooms")) || {};
   const storedPendingRequests = JSON.parse(localStorage.getItem("pendingRequests")) || {};
   setJoinedRooms(storedJoinedRooms);
   setPendingRequests(storedPendingRequests);
  }, []);

// Handle Room Creation
const createRoom = async () => {
  if (!newRoom.roomName || !newRoom.seatsAvailable) {
    alert("Please fill all fields!");
    return;
  }

  try {
    const res = await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRoom),
    });

    if (res.ok) {
      const createdRoom = await res.json();
      setRooms((prev) => [...prev, createdRoom]);
      setShowModal(false);
      alert("Room created successfully!");
    } else {
      alert("Error creating room.");
    }
  } catch (error) {
    console.error("Error creating room:", error);
  }
};

   


 // Request to Join Function
 const requestToJoin = async (roomId, groupType) => {
   if (groupType === "Private") {
     const updatedPendingRequests = { ...pendingRequests, [roomId]: true };
     setPendingRequests(updatedPendingRequests);
     localStorage.setItem("pendingRequests", JSON.stringify(updatedPendingRequests)); // Save to localStorage
     alert("Request sent! You will be notified by the admin.");
     return;
   }

   // For Public Rooms → Directly Join
   setJoiningStatus((prev) => ({ ...prev, [roomId]: true }));

   try {
     await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API delay
     const updatedJoinedRooms = { ...joinedRooms, [roomId]: true };
     setJoinedRooms(updatedJoinedRooms);
     localStorage.setItem("joinedRooms", JSON.stringify(updatedJoinedRooms)); // Save to localStorage
     alert("You have joined the room!");
   } catch (error) {
     console.error("Error joining room:", error);
   } finally {
     setJoiningStatus((prev) => ({ ...prev, [roomId]: false }));
   }
 };


  // Delete Room (only owner can delete)
  async function deleteRoom(roomId) {
    if (!confirm("Are you sure you want to delete this apartment?")) return;

    setDeletingStatus((prev) => ({ ...prev, [roomId]: true }));

    try {
      const res = await fetch("/api/rooms", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, username }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error deleting room");

      setRooms(rooms.filter((room) => room._id !== roomId));
    } catch (error) {
      console.error("Error deleting room:", error);
      alert(error.message);
    }

    setDeletingStatus((prev) => ({ ...prev, [roomId]: false }));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        Find & Join Your College Rooms
      </h1>

      {/* Header & Create Room Button */}
      <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto">
        {/* <h1 className="text-4xl font-bold text-blue-700">Find & Join Your College Rooms</h1> */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Create Room
        </button>
        </div>

        

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-l-4 border-blue-500"
          >
            <h2 className="text-2xl font-semibold mb-1 text-gray-800">
              {room.roomName}
            </h2>
            <p className="text-sm text-gray-500">
              Seats Available:{" "}
              <span className="font-semibold text-black">{room.seatsAvailable}</span>
            </p>
            <p className="text-sm text-gray-500 mb-3">
              Owner: <span className="font-semibold text-black">{room.owner}</span>
            </p>

            {/* Badge for Private/Public */}
            <div
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 ${
                room.groupType === "Private"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {room.groupType}
            </div>

            <div className="flex justify-between items-center">
              {/* Show "Go into Room" if already joined */}
              {joinedRooms[room._id] ? (
                <button
                  onClick={() => router.push(`/group-members/${room._id}`)}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Go into Room
                </button>
              ) : pendingRequests[room._id] ? (
                <button className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
                  Pending...
                </button>
              ) : (
                <button
                  onClick={() => requestToJoin(room._id, room.groupType)}
                  disabled={joiningStatus[room._id]}
                  className={`w-full px-4 py-2 text-white rounded-lg transition ${
                    room.groupType === "Private"
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-green-500 hover:bg-green-600"
                  } ${joiningStatus[room._id] ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {room.groupType === "Private" ? "Request to Join" : "Join"}
                </button>
              )}
            </div>
            {/* Delete Button (Only for Owner) */}
            {room.owner === loggedInUser && (
              <button
              onClick={() => setShowDeleteModal(true)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              🗑️
            </button>
            
            )}
          </div>
          
        ))}
      </div>
      {/* Create Room Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Create a New Room</h2>

            <input
              type="text"
              placeholder="Room Name"
              className="w-full p-2 border rounded mb-3"
              value={newRoom.roomName}
              onChange={(e) => setNewRoom({ ...newRoom, roomName: e.target.value })}
            />

            <input
              type="number"
              placeholder="Seats Available"
              className="w-full p-2 border rounded mb-3"
              value={newRoom.seatsAvailable}
              onChange={(e) => setNewRoom({ ...newRoom, seatsAvailable: e.target.value })}
            />

            <select
              className="w-full p-2 border rounded mb-3"
              value={newRoom.groupType}
              onChange={(e) => setNewRoom({ ...newRoom, groupType: e.target.value })}
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={createRoom}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Create
              </button>
              </div>
          </div>
        </div>
      )}

{showDeleteModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Select a Room to Delete</h2>

      <select
        onChange={(e) => setRoomToDelete(e.target.value)}
        value={roomToDelete || ""}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="">-- Select Your Room --</option>
        {rooms
          .filter((room) => room.owner === loggedInUser)
          .map((room) => (
            <option key={room._id} value={room._id}>
              {room.roomName}
            </option>
          ))}
      </select>

      <div className="flex justify-between">
        <button
          onClick={() => {
            setShowDeleteModal(false);
            setRoomToDelete(null);
          }}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>

        <button
          disabled={!roomToDelete}
          onClick={() => {
            deleteRoom(roomToDelete);
            setShowDeleteModal(false);
            setRoomToDelete(null);
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </div>

  );
}
