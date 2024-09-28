const db = require('../db');

// Get all tasks
const getTasks = (req, res) => {
  db.query(
    `SELECT tasks.*, users.name as assigned_user 
     FROM tasks 
     JOIN users ON tasks.assign_to = users.id 
     ORDER BY tasks.due_date`,
    (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json(results);
      }
    }
  );
};

// Add a new task
const addTask = (req, res) => {
  const { title, description, status, due_date, assign_to } = req.body;
  db.query(
    'INSERT INTO tasks (title, description, status, due_date, assign_to) VALUES (?, ?, ?, ?, ?)',
    [title, description, status, due_date, assign_to],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.status(201).json({ message: 'Task created successfully' });
      }
    }
  );
};

// Update a task
const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status, due_date, assign_to } = req.body;
  db.query(
    'UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ?, assign_to = ? WHERE id = ?',
    [title, description, status, due_date, assign_to, id],
    (err) => {
      if (err) {
        res.status(500).json({ error: 'Database error' });
      } else {
        res.json({ message: 'Task updated successfully' });
      }
    }
  );
};

// Delete a task
const deleteTask = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json({ message: 'Task deleted successfully' });
    }
  });
};

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask
};
