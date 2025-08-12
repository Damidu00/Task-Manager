import express from "express";
import { addTask } from "../controllers/taskController.js";

const taskRouter = express.Router();

// Route to add a new task
taskRouter.post("/add", addTask);

export default taskRouter;
