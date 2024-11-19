import express, { Request, Response } from "express";

import cors from "cors";
import dotenv from "dotenv";

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

// Defining Endpoints and Routes
app.get("/", (req: Request, res: Response) => {
    res.json("Hello World!");
    res.status(200);
});

export default app;
