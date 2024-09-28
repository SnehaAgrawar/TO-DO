const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all users
router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
