import express from 'express';
import { pool } from '../config/database';

const router = express.Router();

// Get messages for a task
router.get('/:taskId', async (req: any, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.userId;

    const result = await pool.query(
      'SELECT m.*, u.first_name, u.last_name FROM messages m JOIN users u ON m.sender_id = u.id WHERE m.task_id = $1 AND (m.sender_id = $2 OR m.receiver_id = $2) ORDER BY m.created_at ASC',
      [taskId, userId]
    );

    res.json({ messages: result.rows });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send message
router.post('/', async (req: any, res) => {
  try {
    const userId = req.user.userId;
    const { receiverId, taskId, message } = req.body;

    const result = await pool.query(
      'INSERT INTO messages (sender_id, receiver_id, task_id, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, receiverId, taskId, message]
    );

    res.status(201).json({ message: 'Message sent successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;