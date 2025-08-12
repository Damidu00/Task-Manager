import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		trim: true
	},
	status: {
		type: String,
		enum: ["pending", "in progress", "completed"],
		default: "pending"
	},
	dueDate: {
		type: Date
	}
}, {
	timestamps: true
});

const Task = mongoose.model("tasks", taskSchema);
export default Task;