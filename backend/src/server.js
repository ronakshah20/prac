import express, { json } from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import connect from "./config/db.js";
const { connectDB } = connect;
import { config } from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import { setServers } from 'dns';
setServers(['8.8.8.8', '8.8.4.4']);

config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors({
    origin:"http://localhost:5173",
}));
app.use(json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Start server on PORT:", PORT);
    });
});

//Use Ctrl + Alt + I to open chat