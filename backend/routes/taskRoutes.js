import express from "express";
import { addTask, getAllTasks, getTaskById, updateTask, deleteTask } from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.post("/add", addTask); // Route to add a new task
taskRouter.get("/", getAllTasks); // Route to get all tasks
taskRouter.get("/:id", getTaskById); // Route to get a single task by ID
taskRouter.put("/:id", updateTask); // Route to update a task by ID
taskRouter.delete("/:id", deleteTask); // Route to delete a task by ID

export default taskRouter;
