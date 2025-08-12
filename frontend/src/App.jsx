
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import Tasks from "./Tasks";
import EditTask from "./EditTask";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;
