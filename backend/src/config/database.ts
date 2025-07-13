import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'helperhand',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
});

export async function initializeDatabase() {
  try {
    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully');
    
    // Create tables if they don't exist
    await createTables();
    console.log('✅ Database tables initialized');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    // Don't exit in development - we'll use mock data
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
  }
}

async function createTables() {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      phone VARCHAR(20),
      user_type VARCHAR(20) CHECK (user_type IN ('seeker', 'helper')) NOT NULL,
      profile_picture VARCHAR(500),
      address TEXT,
      city VARCHAR(100),
      country VARCHAR(100),
      latitude DECIMAL(10, 8),
      longitude DECIMAL(11, 8),
      is_verified BOOLEAN DEFAULT false,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createHelperProfilesTable = `
    CREATE TABLE IF NOT EXISTS helper_profiles (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      skills TEXT[],
      hourly_rate DECIMAL(10, 2),
      bio TEXT,
      availability JSONB,
      service_radius INTEGER DEFAULT 10,
      is_online BOOLEAN DEFAULT false,
      rating DECIMAL(3, 2) DEFAULT 0,
      total_reviews INTEGER DEFAULT 0,
      id_verification_status VARCHAR(20) DEFAULT 'pending',
      background_check_status VARCHAR(20) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createTasksTable = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      seeker_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      helper_id INTEGER,
      title VARCHAR(200) NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(50),
      budget DECIMAL(10, 2),
      urgency VARCHAR(20) CHECK (urgency IN ('low', 'medium', 'high')),
      status VARCHAR(20) CHECK (status IN ('open', 'assigned', 'in_progress', 'completed', 'cancelled')) DEFAULT 'open',
      location_address TEXT,
      latitude DECIMAL(10, 8),
      longitude DECIMAL(11, 8),
      scheduled_for TIMESTAMP,
      completed_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createBidsTable = `
    CREATE TABLE IF NOT EXISTS bids (
      id SERIAL PRIMARY KEY,
      task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
      helper_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      amount DECIMAL(10, 2) NOT NULL,
      message TEXT,
      status VARCHAR(20) CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(task_id, helper_id)
    )
  `;

  const createReviewsTable = `
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
      reviewer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      reviewee_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
      comment TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createMessagesTable = `
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      receiver_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
      message TEXT NOT NULL,
      is_read BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createPaymentsTable = `
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
      seeker_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      helper_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      amount DECIMAL(10, 2) NOT NULL,
      platform_fee DECIMAL(10, 2) NOT NULL,
      stripe_payment_intent_id VARCHAR(255),
      status VARCHAR(20) CHECK (status IN ('pending', 'held', 'released', 'refunded')) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const tables = [
    createUsersTable,
    createHelperProfilesTable,
    createTasksTable,
    createBidsTable,
    createReviewsTable,
    createMessagesTable,
    createPaymentsTable
  ];

  for (const table of tables) {
    await pool.query(table);
  }
}

export { pool };