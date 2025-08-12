
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useNavigate, Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const PRIORITY_COLORS = {
  High: "border-red-500 bg-red-50",
  Medium: "border-yellow-500 bg-yellow-50",
  Low: "border-green-500 bg-green-50",
};

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    setLoading(true);
    axios.get("http://localhost:5000/api/task/")
      .then(res => {
        setTasks(res.data.filter(task => task.status !== "completed"));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      axios.delete(`http://localhost:5000/api/task/${id}`)
        .then(() => fetchTasks());
    }
  };

  const handleComplete = (id) => {
    // Fetch the task first, then update with all fields
    console.log(id)
    axios.get(`http://localhost:5000/api/task/${id}`)
      .then(res => {
        const task = res.data;
        console.log(task)
        return axios.put(`http://localhost:5000/api/task/${id}`, {
          ...task,
          status: "completed"
        });
      })
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 max-w-3xl mx-auto ml-52 w-full relative">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>
        {loading ? (
          <div>Loading...</div>
        ) : tasks.length === 0 ? (
          <div className="text-gray-500">No pending tasks.</div>
        ) : (
          <div className="flex flex-col gap-2">
            {tasks.map(task => (
              <div
                key={task._id}
                className={`flex items-center border-l-4 rounded px-4 py-3 cursor-pointer transition-colors ${PRIORITY_COLORS[task.priority] || "border-gray-300"}`}
                onClick={() => setExpanded(expanded === task._id ? null : task._id)}
              >
                <input
                  type="checkbox"
                  className="mr-3 accent-green-600"
                  onClick={e => e.stopPropagation()}
                  onChange={() => handleComplete(task._id)}
                />
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold">{task.title}</span>
                    <span className="text-xs text-gray-500 ml-2">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}</span>
                    <div className="flex items-center ml-3 gap-2">
                      <Link
                        to={`/edit/${task._id}`}
                        onClick={e => e.stopPropagation()}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit Task"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={e => { e.stopPropagation(); handleDelete(task._id); }}
                        className="text-red-500 hover:text-red-700"
                        title="Delete Task"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  {expanded === task._id && (
                    <div className="text-gray-600 mt-2">{task.description}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Floating + button */}
        <button
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg z-50"
          onClick={() => setShowAdd(true)}
        >
          +
        </button>
        {/* Add Task Modal */}
        {showAdd && <AddTaskModal onClose={() => { setShowAdd(false); fetchTasks(); }} />}
      </div>
    </div>
  );
};

const AddTaskModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post("http://localhost:5000/api/task/add", {
      title,
      description,
      dueDate,
      priority,
      status: "pending"
    }).then(() => {
      setLoading(false);
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative">
        <button type="button" className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-xl font-bold mb-4">Add Task</h2>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Title</label>
          <input type="text" className="w-full border rounded px-3 py-2" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Description</label>
          <textarea className="w-full border rounded px-3 py-2" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Due Date</label>
          <input type="date" className="w-full border rounded px-3 py-2" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="block mb-1 font-medium">Priority</label>
          <div className="flex gap-3">
            <label className="flex items-center gap-1">
              <input type="radio" name="priority" value="High" checked={priority === "High"} onChange={() => setPriority("High")}/>
              <span className="w-4 h-4 bg-red-500 rounded-full inline-block"></span> High
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="priority" value="Medium" checked={priority === "Medium"} onChange={() => setPriority("Medium")}/>
              <span className="w-4 h-4 bg-yellow-400 rounded-full inline-block"></span> Medium
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="priority" value="Low" checked={priority === "Low"} onChange={() => setPriority("Low")}/>
              <span className="w-4 h-4 bg-green-500 rounded-full inline-block"></span> Low
            </label>
          </div>
        </div>
        <button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded" disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default Dashboard;