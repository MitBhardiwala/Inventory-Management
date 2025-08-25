import express, { type Request, type Response } from "express";
import morgan from "morgan";
import cors from "cors";
import apiRoutes from "./routes/index.ts";

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/", apiRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running properly ");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
