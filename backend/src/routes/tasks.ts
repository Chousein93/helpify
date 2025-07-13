import express from 'express';
import { pool } from '../config/database';

const router = express.Router();

// Get all tasks
router.get('/', async (req: any, res) => {
  try {
    const result = await pool.query(
      'SELECT t.*, u.first_name, u.last_name FROM tasks t JOIN users u ON t.seeker_id = u.id WHERE t.status = $1 ORDER BY t.created_at DESC',
      ['open']
    );
    res.json({ tasks: result.rows });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create task
router.post('/', async (req: any, res) => {
  try {
    const userId = req.user.userId;
    const { title, description, category, budget, urgency, locationAddress, latitude, longitude } = req.body;

    const result = await pool.query(
      'INSERT INTO tasks (seeker_id, title, description, category, budget, urgency, location_address, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [userId, title, description, category, budget, urgency, locationAddress, latitude, longitude]
    );

    res.status(201).json({ message: 'Task created successfully', task: result.rows[0] });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit bid
router.post('/:taskId/bids', async (req: any, res) => {
  try {
    const userId = req.user.userId;
    const { taskId } = req.params;
    const { amount, message } = req.body;

    const result = await pool.query(
      'INSERT INTO bids (task_id, helper_id, amount, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [taskId, userId, amount, message]
    );

    res.status(201).json({ message: 'Bid submitted successfully', bid: result.rows[0] });
  } catch (error) {
    console.error('Submit bid error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;