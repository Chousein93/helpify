import express from 'express';
import { pool } from '../config/database';

const router = express.Router();

// Get user profile
router.get('/profile', async (req: any, res) => {
  try {
    const userId = req.user.userId;
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, user_type, phone, profile_picture, address, city, country FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', async (req: any, res) => {
  try {
    const userId = req.user.userId;
    const { firstName, lastName, phone, address, city, country } = req.body;

    const result = await pool.query(
      'UPDATE users SET first_name = $1, last_name = $2, phone = $3, address = $4, city = $5, country = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [firstName, lastName, phone, address, city, country, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;