import express from "express";
import router from "./routes/user.js";
import taskrouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middlewares/error.js";
import cors from "cors"

export const app = express();

config({
  path: "./config.env"
});

//using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:['GET', 'POST','PUT', 'DELETE'],
  credentials:true,
}))

//using routes
app.use("/api/v1/users", router);
app.use("/api/v1/task", taskrouter);

app.get("/", (req, res) => {
  res.send("Let's build api");
});

app.use(ErrorMiddleware);
