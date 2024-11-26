import express from "express";
import dotenv from "dotenv";
// Loading enviorement variables
dotenv.config();
// Initializing the server
const app = express();
const PORT = "3000";
// Using Middlewares
app.use(express.json());
// Defining Endpoints and Routes
app.get("/", (req, res) => {
    res.json("Hello World!");
    res.status(200);
});
app.post("/", (req, res) => {
    res.json("Hello World!");
    res.status(200);
});
app.get("/favicon.ico", (req, res) => {
    res.json("Not");
    res.status(204);
});
// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running at PORT:${PORT}`);
});
export default app;
