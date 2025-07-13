# HelperHand - Peer-to-Peer Local Assistance Platform

A modern, responsive web application connecting people needing help ("Seekers") with people offering services ("Helpers") in their local community.

## 🚀 Features

### Core Functionality
- **Dual User Types**: Seekers (need help) and Helpers (offer services)
- **Real-time Helper Map**: Find nearby available helpers with Google Maps integration
- **Task Management**: Post tasks, receive bids, manage assignments
- **Secure Payments**: Stripe integration with escrow system
- **In-app Chat**: Real-time messaging with Socket.IO
- **Rating System**: Mutual ratings and reviews after task completion

### Multi-language Support
- **7 Languages**: English, Turkish, German, French, Spanish, Greek, Arabic
- **RTL Support**: Full right-to-left layout for Arabic
- **Dynamic Language Switching**: Real-time language updates

### Trust & Safety
- **ID Verification**: Passport/Driver's License upload for Helpers
- **Background Checks**: Optional premium feature
- **Payment Protection**: Funds held in escrow until completion
- **Report/Block System**: User safety features

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **i18next** for internationalization
- **Socket.IO Client** for real-time features
- **Axios** for API communication
- **React Hook Form** with Yup validation

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Socket.IO** for real-time communication
- **PostgreSQL** with connection pooling
- **JWT** authentication
- **Stripe** for payments
- **Multer** for file uploads
- **bcryptjs** for password hashing

### Infrastructure
- **PostgreSQL** database
- **Google Maps API** for location services
- **Stripe Connect** for escrow payments
- **Nodemailer** for emails

## 📁 Project Structure

```
helperhand/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Layout/       # Header, Footer, etc.
│   │   │   └── UI/          # Buttons, Forms, etc.
│   │   ├── pages/           # Main application pages
│   │   ├── context/         # React Context (Auth, Socket)
│   │   ├── i18n/           # Internationalization
│   │   │   └── locales/    # Translation files
│   │   └── utils/          # Helper functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Authentication, validation
│   │   ├── config/         # Database, environment
│   │   └── socket/         # Socket.IO handlers
│   └── package.json
└── docs/                   # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 12+
- Google Maps API key
- Stripe account (for payments)

### 1. Clone and Setup
```bash
git clone <your-repo>
cd helperhand
```

### 2. Backend Setup
```bash
cd backend
npm install

# Copy environment template
cp .env.example .env
# Edit .env with your configuration
```

### 3. Database Setup
```bash
# Create PostgreSQL database
createdb helperhand

# Tables are auto-created on first run
npm run dev
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install --legacy-peer-deps

# Start development server
npm start
```

### 5. Environment Variables

#### Backend (.env)
```bash
# Server
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=helperhand
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Google Maps
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

#### Frontend (.env)
```bash
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

## 📱 Application Flow

### For Seekers (Need Help)
1. **Register/Login** with basic information
2. **Post Task** with description, budget, location
3. **Review Bids** from nearby helpers
4. **Choose Helper** and make secure payment
5. **Chat** with helper during task
6. **Rate & Review** after completion

### For Helpers (Offer Help)
1. **Register/Login** with skills and rates
2. **Complete Profile** with ID verification
3. **Go Online** to appear in searches
4. **Browse Tasks** or receive notifications
5. **Submit Bids** with custom pricing
6. **Complete Tasks** and earn money

## 🔧 Development Scripts

### Backend
```bash
npm run dev        # Start development server with hot reload
npm run build      # Build TypeScript to JavaScript
npm start          # Start production server
```

### Frontend
```bash
npm start          # Start development server (port 3000)
npm run build      # Build for production
npm test           # Run tests
```

## 🌍 Internationalization

### Adding New Language
1. Create translation file: `frontend/src/i18n/locales/[code].json`
2. Add language to list in: `frontend/src/components/Layout/Header.tsx`
3. Configure in: `frontend/src/i18n/i18n.ts`

### Translation Structure
```json
{
  "nav": { "home": "Home", "login": "Log In" },
  "hero": { "title": "Get help for everyday tasks" },
  "auth": { "email": "Email", "password": "Password" }
}
```

## 💳 Payment Flow

1. **Task Creation**: Seeker sets budget
2. **Bid Acceptance**: Helper selected and payment intent created
3. **Payment Capture**: Funds held in escrow (Stripe)
4. **Task Completion**: Funds released to helper (minus fees)
5. **Fee Structure**: Seekers pay 5%, Helpers pay 10%

## 🔒 Security Features

- **JWT Authentication** with secure token storage
- **Password Hashing** using bcryptjs with salt rounds
- **Rate Limiting** to prevent abuse
- **Input Validation** on all endpoints
- **CORS Protection** with specific origins
- **Helmet** for security headers
- **SQL Injection Protection** with parameterized queries

## 📊 Database Schema

### Key Tables
- **users**: User accounts and basic info
- **helper_profiles**: Helper-specific data (skills, rates, availability)
- **tasks**: Task postings with location and budget
- **bids**: Helper offers for tasks
- **messages**: In-app chat system
- **payments**: Transaction records with Stripe integration
- **reviews**: Mutual rating system

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production` in backend
2. Configure production database
3. Set up SSL certificates
4. Configure domain and CORS settings
5. Set up process manager (PM2)
6. Configure reverse proxy (Nginx)

### Docker Deployment
```dockerfile
# Example Docker setup available in docs/
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

### Task Endpoints
- `GET /api/tasks` - List available tasks
- `POST /api/tasks` - Create new task
- `POST /api/tasks/:id/bids` - Submit bid

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

### Payment Endpoints
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/success` - Confirm payment

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql
# Check connection details in .env
```

**TypeScript Errors**
```bash
# Install missing dependencies
npm install --legacy-peer-deps
```

**Maps Not Loading**
- Verify Google Maps API key is correct
- Check API key has required permissions
- Ensure Maps JavaScript API is enabled

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the excellent framework
- Tailwind CSS for beautiful styling
- Socket.IO for real-time features
- Stripe for secure payments
- All the amazing open-source contributors

---

**HelperHand** - Building stronger communities through mutual assistance 🤝