import Room from "@/app/models/Room";
import dbConnect from "@/app/lib/mongodb";

export async function DELETE(req) {
    try {
        await dbConnect();
        
        const { pathname } = req.nextUrl;
        const roomId = pathname.split("/").at(-2);
        
        const deletedRoom = await Room.findByIdAndDelete(roomId);
        
        if (!deletedRoom) {
            return Response.json({ error: "Apartment not found" }, { status: 404 });
        }

        return Response.json({ message: "Apartment deleted successfully" });
    } catch (error) {
        console.error("Error deleting apartment:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
