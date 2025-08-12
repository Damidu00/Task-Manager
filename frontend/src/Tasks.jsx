
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { FaTrash } from "react-icons/fa";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    setLoading(true);
    axios.get("http://localhost:5000/api/task/")
      .then(res => {
        setTasks(res.data.filter(task => task.status === "completed"));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/task/${id}`)
      .then(() => fetchTasks());
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 max-w-3xl mx-auto ml-52 w-full">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <h2 className="text-lg font-semibold mb-2">Completed Tasks</h2>
        {loading ? (
          <div>Loading...</div>
        ) : tasks.length === 0 ? (
          <div className="text-gray-500">No completed tasks.</div>
        ) : (
          <div className="grid gap-4">
            {tasks.map(task => (
              <div key={task._id} className="bg-white rounded shadow p-4 border-l-4 border-green-500">
                <div className="flex justify-between items-center">
                  <div className="font-semibold">{task.title}</div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-400">Completed</div>
                    <button onClick={() => handleDelete(task._id)} className="text-red-500 hover:text-red-700" title="Delete Task">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="text-gray-600 mt-2">{task.description}</div>
                <div className="mt-2 text-xs text-gray-500">Priority: {task.priority}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
