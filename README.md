# Taqyeem Platform

**تقييم** - A comprehensive bilingual interview & learning platform built with modern web technologies.

## 🌟 Overview

Taqyeem is a full-stack platform designed to facilitate interview scheduling, conduct, and evaluation while providing educational content to help users improve their interview skills. The platform supports both Arabic and English languages with a beautiful, modern interface.

## 🏗️ Architecture

### Tech Stack

**Frontend:**

- React 19 + Vite
- TailwindCSS + shadcn/ui
- React Query + React Router
- React Hook Form + Zod
- Framer Motion
- i18next (Bilingual support)

**Backend:**

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (File storage)
- Multer (File uploads)

**Database:**

- MongoDB Atlas (Cloud)
- Mongoose ODM

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Cloudinary account (for file storage)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd taqyeem-platform
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   cp env.example .env
   # Update .env with your MongoDB and Cloudinary credentials
   npm run dev
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   cp env.example .env
   # Update .env with your API URL
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🧩 Features

### 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control (Candidate, Interviewer, Admin)
- Secure password hashing with bcrypt
- User profile management

### 📅 Interview Management

- **Interview Days**: Create and manage interview schedules
- **Time Slots**: Flexible slot creation and management
- **Reservations**: Candidates can book available slots
- **Sessions**: Real-time interview sessions with recording support
- **Evaluations**: Comprehensive evaluation system with criteria scoring

### 📚 Learning Platform

- **Educational Content**: Articles, FAQs, and tips
- **Bilingual Content**: Full Arabic/English support
- **Categories**: Organized content by topics
- **Search & Filter**: Easy content discovery

### 🎯 User Roles

#### Candidate

- Browse and book interview slots
- Attend scheduled interviews
- View evaluation results
- Access learning materials

#### Interviewer

- Create interview days and time slots
- Manage reservations (accept/reject)
- Conduct interview sessions
- Submit evaluations and feedback

#### Admin

- Manage all users and content
- Oversee platform operations
- Access analytics and statistics
- Content moderation

## 🌐 Bilingual Support

The platform provides complete bilingual support:

- **Languages**: Arabic (العربية) and English
- **RTL/LTR Layouts**: Automatic direction switching
- **Font Support**: Cairo for Arabic, Inter for English
- **Content Translation**: All UI text and content
- **User Preferences**: Language selection per user

## 📊 Database Schema

### Core Models

- **User**: Authentication, profile, and role management
- **Day**: Interview day scheduling
- **Slot**: Time slot management
- **Reservation**: Booking system
- **Session**: Interview sessions
- **Evaluation**: Performance assessment
- **Feedback**: Session feedback
- **EducationalContent**: Learning materials

### Relationships

```
User (1) ───< Reservation >───(1) Slot
User (1) ───< Session >───(1) Reservation
Session (1) ───< Evaluation
Session (1) ───< Feedback
User (1) ───< EducationalContent
```

## 🔧 API Documentation

### Base URL

```
http://localhost:5000/api/v1
```

### Authentication

All protected routes require a Bearer token:

```
Authorization: Bearer <jwt-token>
```

### Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Key Endpoints

- **Auth**: `/auth/login`, `/auth/register`, `/auth/me`
- **Users**: `/users`, `/users/me`
- **Days**: `/days`, `/days/:id`
- **Slots**: `/slots/:dayId`, `/slots/my`
- **Reservations**: `/reservations`, `/reservations/me`
- **Sessions**: `/sessions/me`, `/sessions/:id`
- **Evaluations**: `/evaluations`, `/evaluations/:sessionId`
- **Learning**: `/learn`, `/learn/:id`

## 🎨 Design System

### Color Palette

- **Primary**: Blue (#3b82f6, #2563eb, #1d4ed8)
- **Secondary**: Cyan (#06b6d4, #0891b2, #0e7490)
- **Accent**: Sky (#0ea5e9, #0284c7, #0369a1)

### Typography

- **English**: Inter font family
- **Arabic**: Cairo font family

### Components

- Modern, accessible UI components
- Responsive design patterns
- Consistent spacing and layout
- Smooth animations and transitions

## 🚀 Deployment

### Backend Deployment

1. Set up MongoDB Atlas cluster
2. Configure Cloudinary account
3. Set environment variables
4. Deploy to your preferred platform (Heroku, Railway, etc.)

### Frontend Deployment

1. Build the production bundle
2. Deploy to static hosting (Vercel, Netlify, etc.)
3. Configure environment variables
4. Set up redirects for SPA routing

## 🧪 Development

### Project Structure

```
taqyeem-platform/
├── backend/                 # Express.js API
│   ├── config/             # Database and service configs
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   └── utils/             # Utility functions
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── context/       # React Context
│   │   ├── api/           # API services
│   │   ├── config/        # App configuration
│   │   ├── utils/         # Utility functions
│   │   └── locales/       # Translation files
│   └── public/            # Static assets
└── README.md              # This file
```

### Development Commands

**Backend:**

```bash
npm run dev      # Start development server
npm start        # Start production server
npm test         # Run tests
```

**Frontend:**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Server-side validation with express-validator
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet**: Security headers
- **File Upload Security**: Secure file handling with Cloudinary

## 📈 Performance

- **React Query**: Efficient data fetching and caching
- **Code Splitting**: Lazy loading for better performance
- **Image Optimization**: Cloudinary for optimized images
- **Database Indexing**: Optimized MongoDB queries
- **CDN**: Cloudinary CDN for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure bilingual support for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation in each module

## 🙏 Acknowledgments

- React team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- MongoDB team for the flexible database
- All open-source contributors

---

**Taqyeem Platform** - Empowering interviews, enhancing skills, bridging languages.
