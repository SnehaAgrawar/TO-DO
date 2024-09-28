import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/TaskForm.css';  
 

const TaskForm = ({ fetchTasks, taskToEdit, resetEdit }) => {
  // State and form logic remains the same
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
  const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');
  const [status, setStatus] = useState(taskToEdit ? taskToEdit.status : 'Pending');
  const [dueDate, setDueDate] = useState(taskToEdit ? taskToEdit.due_date : '');
  const [assignTo, setAssignTo] = useState(taskToEdit ? taskToEdit.assign_to : '');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { title, description, status, due_date: dueDate, assign_to: assignTo };
    if (taskToEdit) {
      axios.put(`http://localhost:5000/api/tasks/${taskToEdit.id}`, taskData)
        .then(() => {
          fetchTasks();
          resetEdit();
        });
    } else {
      axios.post('http://localhost:5000/api/tasks', taskData)
        .then(() => fetchTasks());
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select value={assignTo} onChange={(e) => setAssignTo(e.target.value)}>
        <option value="">Assign to user</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.city})
          </option>
        ))}
      </select>
      <button type="submit">{taskToEdit ? 'Update' : 'Add'} Task</button>
    </form>
  );
};

export default TaskForm;
