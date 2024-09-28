import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Fetch all tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Handle task edit
  const handleEditTask = (task) => {
    setTaskToEdit(task);
  };

  // Reset the edit task state
  const handleResetEdit = () => {
    setTaskToEdit(null);
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component mounts
  }, []);

  return (
    <div className="app-container">
      <h1>To-Do List</h1>
      <TaskForm fetchTasks={fetchTasks} taskToEdit={taskToEdit} resetEdit={handleResetEdit} />
      <TaskList tasks={tasks} fetchTasks={fetchTasks} handleEditTask={handleEditTask} />
    </div>
  );
};

export default App;
