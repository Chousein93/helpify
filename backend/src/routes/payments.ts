import express from 'express';
import Stripe from 'stripe';
import { pool } from '../config/database';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

// Create payment intent
router.post('/create-intent', async (req: any, res) => {
  try {
    const { amount, taskId } = req.body;
    const userId = req.user.userId;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'eur',
      metadata: {
        taskId,
        userId
      },
      payment_method_types: ['card'],
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Payment intent error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Handle payment success
router.post('/success', async (req: any, res) => {
  try {
    const { paymentIntentId, taskId } = req.body;
    const userId = req.user.userId;

    // Update payment status in database
    await pool.query(
      'INSERT INTO payments (task_id, seeker_id, amount, platform_fee, stripe_payment_intent_id, status) VALUES ($1, $2, $3, $4, $5, $6)',
      [taskId, userId, req.body.amount, req.body.amount * 0.05, paymentIntentId, 'held']
    );

    res.json({ message: 'Payment processed successfully' });
  } catch (error) {
    console.error('Payment success error:', error);
    res.status(500).json({ error: 'Failed to process payment' });
  }
});

export default router;