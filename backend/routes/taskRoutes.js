import express from "express";
import { addTask, getAllTasks, getTaskById, updateTask, deleteTask } from "../controllers/taskController.js";
import { body } from "express-validator";

const taskRouter = express.Router();

// Validation rules
const taskValidation = [
	body("title").notEmpty().withMessage("Title is required"),
	body("description").optional().isString(),
	body("status").optional().isIn(["pending", "in progress", "completed"]),
	body("dueDate").optional().isISO8601().toDate()
];

taskRouter.post("/add", taskValidation, addTask); // Route to add a new task
taskRouter.get("/", getAllTasks); // Route to get all tasks
taskRouter.get("/:id", getTaskById); // Route to get a single task by ID
taskRouter.put("/:id", taskValidation, updateTask); // Route to update a task by ID
taskRouter.delete("/:id", deleteTask); // Route to delete a task by ID

export default taskRouter;
