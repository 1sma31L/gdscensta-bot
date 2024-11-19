import express, { Request, Response } from "express";

import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import morgan from "morgan";
import path from "path";

// Loading enviorement variables
dotenv.config();

// Initializing the server
const app = express();
const PORT = process.env.PORT || "3000";

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running : http://localhost:${PORT}`);
});

// Using Middlewares
app.use(cors());
app.use(express.json());

// create a write stream (in append mode)
const accessLogStream: fs.WriteStream = fs.createWriteStream(
    path.join(process.cwd(), "logs", "access.log"),
    {
        flags: "a",
    },
);

// setup the logger
app.use(morgan("common", { stream: accessLogStream }));
app.use(morgan("dev"));

// Defining Endpoints and Routes
app.get("/", (req: Request, res: Response) => {
    res.json("Hello World!");
    res.status(200);
});

export default app;
