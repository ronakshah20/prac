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

//Project prac
// mongodb://codehubnoreply_db_user:g9wnSSVeOAdo9AO4@cluster0.7d9ojc4.mongodb.net:27017,cluster1.7d9ojc4.mongodb.net:27017,cluster2.7d9ojc4.mongodb.net:27017/?appName=Cluster0
// mongodb+srv://codehubnoreply_db_user:g9wnSSVeOAdo9AO4@cluster0.7d9ojc4.mongodb.net/?appName=Cluster0

//Project prac-1
// mongodb+srv://codehubdb:codehubdb@cluster0.fmcmv9g.mongodb.net/?appName=Cluster0

//Project prac-2
// mongodb+srv://codehub_db:codehub_db@cluster0.npdrxls.mongodb.net/?appName=Cluster0

const app = express();
const PORT = process.env.PORT || 5001;
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
    app.use(express.json(__dirname, "../frontend/dist"));

    app.get(/.*/, (req, res) =>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Start server on PORT:", PORT);
    });
});

//Use Ctrl + Alt + I to open chat