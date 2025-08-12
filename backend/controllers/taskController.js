import Task from "../models/taskModel.js";

// Add a new task
export const addTask = async (req, res) => {
	try {
		const { title, description, status, dueDate } = req.body;
		const newTask = new Task({
			title,
			description,
			status,
			dueDate
		});
		const savedTask = await newTask.save();
		res.status(201).json(savedTask);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Get all tasks
export const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find();
		res.status(200).json(tasks);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
