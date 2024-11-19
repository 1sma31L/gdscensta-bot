import cors from "cors";
import express from "express";
const app = express();
const PORT = 8080;

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World");
	res.status(200);
});

app.listen(PORT, () => {
	console.log(`Server is running : http://localhost:${PORT}`);
});

export default app;
