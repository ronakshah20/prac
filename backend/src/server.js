import express, { json } from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import path from "path";
import { config } from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import { setServers } from 'dns';
setServers(['8.8.8.8', '8.8.4.4']);

config();
// mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
// SRV: mongodb+srv://[username:password@]host[/[defaultauthdb][?options]]

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// middleware
if(process.env.NODE_ENV !== "production"){
    app.use(cors({
        origin:"http://localhost:5173",
    }));
}
app.use(json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get(/.*/, (req, res) =>{
        res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Start server on PORT:", PORT);
    });
});

//Use Ctrl + Alt + I to open chat