import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/task/")
      .then(res => {
        // Filter only completed tasks
        setTasks(res.data.filter(task => task.status === "Completed"));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
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
                <div className="text-sm text-gray-400">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}</div>
              </div>
              <div className="text-gray-600 mt-2">{task.description}</div>
              <div className="mt-2 text-xs text-gray-500">Priority: {task.priority}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
