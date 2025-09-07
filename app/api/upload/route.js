import { IncomingForm } from "formidable";
import fs from "fs/promises";

export async function POST(req) {
    const form = new IncomingForm();
    
    return new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                reject(new Response(JSON.stringify({ error: "File upload failed" }), { status: 500 }));
                return;
            }

            // Save the file to the desired location
            const file = files.file[0]; // Adjust if your field name differs
            const data = await fs.readFile(file.filepath);
            await fs.writeFile(`./public/uploads/${file.originalFilename}`, data);

            resolve(new Response(JSON.stringify({ message: "File uploaded successfully" }), { status: 200 }));
        });
    });
}
