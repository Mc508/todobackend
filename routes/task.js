import express from "express";
import {
  newTask,
  myTask,
  updateTask,
  deleteTask
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/new", isAuthenticated, newTask);
router.get("/my", isAuthenticated, myTask);
router.put("/:id", isAuthenticated, updateTask);
router.delete("/:id", isAuthenticated, deleteTask);

export default router;
