const db = require('../db');

// Get all tasks
const getTasks = (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
};

// Add new task
const addTask = (req, res) => {
  const { title } = req.body;
  db.query('INSERT INTO tasks (title) VALUES (?)', [title], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(201).json({ message: 'Task created successfully' });
    }
  });
};

// Update a task
const updateTask = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  db.query('UPDATE tasks SET title = ? WHERE id = ?', [title, id], (err) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json({ message: 'Task updated successfully' });
    }
  });
};

// Delete task
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
