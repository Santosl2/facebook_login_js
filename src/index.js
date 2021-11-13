import "dotenv/config";
import express from "express";
import { fbRoutes } from "./routes/facebook.routes.js";

const app = express();

app.use(express.json());
app.use(fbRoutes);

app.listen(3333, () => {
  console.log("Listening PORT 3333");
});
