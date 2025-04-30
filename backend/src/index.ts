import express from "express";
import "dotenv/config";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  console.log("Server running on http://localhost:" + process.env.PORT);
});
