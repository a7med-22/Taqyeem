# Taqyeem Backend API

A comprehensive backend API for the Taqyeem bilingual interview & learning platform.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Interview Management**: Create days, slots, reservations, and sessions
- **Evaluation System**: Comprehensive evaluation criteria and feedback
- **Educational Content**: Articles, FAQs, and tips with bilingual support
- **File Upload**: Cloudinary integration for avatars and recordings
- **Database**: MongoDB with Mongoose ODM
- **Security**: Rate limiting, CORS, Helmet, input validation

## 📁 Project Structure

```
backend/
├── server.js                 # Main server file
├── package.json              # Dependencies and scripts
├── env.example              # Environment variables template
├── config/
│   ├── database.js          # MongoDB connection
│   └── cloudinary.js        # Cloudinary configuration
├── middleware/
│   ├── auth.js              # JWT authentication
│   ├── upload.js            # File upload handling
│   ├── validation.js         # Request validation
│   ├── error-handler.js     # Error handling
│   └── not-found.js         # 404 handler
├── models/
│   ├── User.js              # User model
│   ├── Day.js               # Interview day model
│   ├── Slot.js              # Time slot model
│   ├── Reservation.js       # Reservation model
│   ├── Session.js           # Interview session model
│   ├── Evaluation.js        # Evaluation model
│   ├── Feedback.js          # Feedback model
│   └── EducationalContent.js # Educational content model
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── userController.js    # User management
│   ├── dayController.js     # Interview days
│   ├── slotController.js    # Time slots
│   ├── reservationController.js # Reservations
│   ├── sessionController.js # Interview sessions
│   ├── evaluationController.js # Evaluations
│   ├── feedbackController.js # Feedback
│   └── learnController.js   # Educational content
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── users.js             # User routes
│   ├── days.js             # Interview day routes
│   ├── slots.js            # Time slot routes
│   ├── reservations.js     # Reservation routes
│   ├── sessions.js         # Session routes
│   ├── evaluations.js      # Evaluation routes
│   ├── feedbacks.js        # Feedback routes
│   └── learn.js            # Educational content routes
└── utils/
    ├── jwt.js              # JWT utilities
    ├── time.js             # Time utilities
    ├── response.js          # Response helpers
    └── validators.js        # Validation schemas
```

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd taqyeem-platform/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp env.example .env
   ```

   Update the `.env` file with your configuration:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taqyeem
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the server**

   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api/v1
```

### Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <jwt-token>
```

### Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Format

```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ] // For validation errors
}
```

## 🔐 User Roles

- **candidate**: Can reserve slots, attend sessions, view evaluations
- **interviewer**: Can create slots, manage reservations, conduct sessions
- **admin**: Full access to all features and user management

## 📋 API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user profile

### Users

- `GET /users` - Get all users (admin)
- `GET /users/:id` - Get user by ID
- `PUT /users/me` - Update profile
- `PUT /users/me/avatar` - Update avatar
- `PUT /users/me/deactivate` - Deactivate account

### Interview Days

- `GET /days` - Get all interview days
- `GET /days/:id` - Get day by ID
- `POST /days` - Create interview day (admin)
- `PUT /days/:id` - Update interview day (admin)
- `DELETE /days/:id` - Delete interview day (admin)

### Time Slots

- `GET /slots/:dayId` - Get slots by day
- `POST /slots` - Create time slot (interviewer)
- `GET /slots/my` - Get my slots (interviewer)
- `PUT /slots/:id` - Update time slot (interviewer)
- `DELETE /slots/:id` - Delete time slot (interviewer)

### Reservations

- `POST /reservations` - Create reservation (candidate)
- `GET /reservations/me` - Get my reservations
- `GET /reservations/pending` - Get pending reservations (interviewer)
- `POST /reservations/:id/accept` - Accept reservation (interviewer)
- `POST /reservations/:id/reject` - Reject reservation (interviewer)

### Sessions

- `GET /sessions/me` - Get my sessions
- `GET /sessions/:id` - Get session by ID
- `POST /sessions/:id/start` - Start session (interviewer)
- `POST /sessions/:id/recording` - Upload recording (interviewer)
- `POST /sessions/:id/complete` - Complete session (interviewer)
- `POST /sessions/:id/cancel` - Cancel session

### Evaluations

- `POST /evaluations` - Create evaluation (interviewer)
- `GET /evaluations/:sessionId` - Get evaluation by session
- `PUT /evaluations/:id` - Update evaluation (interviewer)
- `GET /evaluations/my` - Get my evaluations
- `GET /evaluations/stats` - Get evaluation statistics (admin)

### Feedback

- `POST /feedbacks` - Create feedback
- `GET /feedbacks/:sessionId` - Get feedbacks by session
- `GET /feedbacks/my` - Get my feedbacks
- `PUT /feedbacks/:id` - Update feedback
- `DELETE /feedbacks/:id` - Delete feedback
- `GET /feedbacks/public` - Get public feedbacks

### Educational Content

- `GET /learn` - Get all content
- `GET /learn/:id` - Get content by ID
- `GET /learn/categories` - Get content categories
- `POST /learn` - Create content (admin)
- `PUT /learn/:id` - Update content (admin)
- `DELETE /learn/:id` - Delete content (admin)
- `GET /learn/stats` - Get content statistics (admin)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Authorization**: Different access levels for different user types
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet**: Security headers
- **Password Hashing**: bcrypt for secure password storage

## 🌐 Bilingual Support

The API supports both Arabic and English content:

- User language preference
- Bilingual educational content
- Localized error messages
- RTL/LTR layout support

## 📊 Database Schema

### Key Relationships

- User (1) ───< Reservation >───(1) Slot
- User (1) ───< Session >───(1) Reservation
- Session (1) ───< Evaluation
- Session (1) ───< Feedback
- User (1) ───< EducationalContent

### Indexes

- `email` (unique)
- `role`
- `dayId` on Slots
- `sessionId` on Evaluation/Feedback
- `category` on EducationalContent

## 🚀 Deployment

1. **Environment Variables**: Set production environment variables
2. **Database**: Configure MongoDB Atlas connection
3. **Cloudinary**: Set up Cloudinary for file storage
4. **Server**: Deploy to your preferred hosting platform

## 🧪 Testing

```bash
npm test
```

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please contact the development team.
