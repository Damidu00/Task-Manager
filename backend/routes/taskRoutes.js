import express from "express";
import { addTask, getAllTasks } from "../controllers/taskController.js";

const taskRouter = express.Router();



taskRouter.post("/add", addTask); // Route to add a new task
taskRouter.get("/", getAllTasks); // Route to get all tasks

export default taskRouter;
