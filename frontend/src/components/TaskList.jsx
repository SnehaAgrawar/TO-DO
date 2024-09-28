import React from 'react';
import '../css/TaskList.css'; 

const TaskList = ({ tasks, fetchTasks, handleEditTask }) => {
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      fetchTasks(); // Refresh task list after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <p><strong>{task.title}</strong> (Due: {task.due_date}, Status: {task.status})</p>
          <p>{task.description}</p>
          <p>Assigned to: {task.assigned_user}</p>
          <button className="edit" onClick={() => handleEditTask(task)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
