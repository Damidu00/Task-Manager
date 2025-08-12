import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/task/${id}`)
      .then(res => {
        const task = res.data;
        setTitle(task.title || "");
        setDescription(task.description || "");
        setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "");
        setPriority(task.priority || "Low");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.put(`http://localhost:5000/api/task/${id}` , {
      title,
      description,
      dueDate,
      priority
    }).then(() => {
      setLoading(false);
      navigate("/");
    });
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
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
              <input type="radio" name="priority-edit" value="High" checked={priority === "High"} onChange={() => setPriority("High")} />
              <span className="w-4 h-4 bg-red-500 rounded-full inline-block"></span> High
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="priority-edit" value="Medium" checked={priority === "Medium"} onChange={() => setPriority("Medium")} />
              <span className="w-4 h-4 bg-yellow-400 rounded-full inline-block"></span> Medium
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="priority-edit" value="Low" checked={priority === "Low"} onChange={() => setPriority("Low")} />
              <span className="w-4 h-4 bg-green-500 rounded-full inline-block"></span> Low
            </label>
          </div>
        </div>
        <button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded" disabled={loading}>
          {loading ? "Updating..." : "Update Task"}
        </button>
      </form>
    </div>
  );
};

export default EditTask;
