# Taqyeem Frontend

A modern, bilingual React frontend for the Taqyeem interview & learning platform.

## 🚀 Features

- **Modern React**: Built with React 19, Vite, and modern React patterns
- **Bilingual Support**: Full Arabic/English support with RTL/LTR layouts
- **Beautiful UI**: TailwindCSS + shadcn/ui components with blue/cyan theme
- **State Management**: React Query for server state, Context for app state
- **Routing**: React Router for navigation
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth animations
- **Responsive**: Mobile-first responsive design
- **Accessibility**: WCAG compliant components

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── layout/         # Layout components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── context/            # React Context providers
├── api/                # API service functions
├── config/             # Configuration files
├── utils/              # Utility functions
├── locales/            # Translation files
└── styles/             # Global styles
```

## 🛠️ Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment Setup**

   ```bash
   cp env.example .env
   ```

   Update the `.env` file with your configuration:

   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   VITE_APP_NAME=Taqyeem
   VITE_APP_NAME_AR=تقييم
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🎨 Design System

### Color Palette

- **Primary**: Blue shades (#3b82f6, #2563eb, #1d4ed8)
- **Secondary**: Cyan shades (#06b6d4, #0891b2, #0e7490)
- **Accent**: Sky shades (#0ea5e9, #0284c7, #0369a1)

### Typography

- **English**: Inter font family
- **Arabic**: Cairo font family
- **Responsive**: Fluid typography scales

### Components

- **Buttons**: Multiple variants (default, outline, secondary, ghost)
- **Cards**: Clean, modern card layouts
- **Forms**: Accessible form components with validation
- **Navigation**: Responsive navigation with mobile menu
- **Badges**: Status indicators and labels

## 🌐 Internationalization

The app supports both Arabic and English with:

- **RTL/LTR Layout**: Automatic direction switching
- **Font Selection**: Appropriate fonts for each language
- **Translation Files**: JSON-based translations
- **Language Detection**: Browser language detection
- **Persistent Settings**: Language preference saved

### Adding Translations

1. Add new keys to `src/locales/en.json` and `src/locales/ar.json`
2. Use the `useTranslation` hook in components:
   ```jsx
   const { t } = useTranslation();
   return <h1>{t("navigation.home")}</h1>;
   ```

## 🔧 API Integration

The frontend uses React Query for efficient API management:

```jsx
import { useUsers } from "../hooks/api.js";

function UsersList() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## 🎭 User Roles

The app supports three user roles with different interfaces:

- **Candidate**: Can reserve slots, attend sessions, view evaluations
- **Interviewer**: Can create slots, manage reservations, conduct sessions
- **Admin**: Full access to all features and user management

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layouts**: CSS Grid and Flexbox for responsive layouts
- **Touch Friendly**: Appropriate touch targets and interactions

## 🚀 Deployment

1. **Build for production**

   ```bash
   npm run build
   ```

2. **Preview production build**

   ```bash
   npm run preview
   ```

3. **Deploy to your hosting platform**
   - Vercel, Netlify, or any static hosting service
   - Ensure environment variables are set
   - Configure redirects for SPA routing

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- **ESLint**: Configured for React best practices
- **Prettier**: Code formatting (if configured)
- **Conventions**:
  - PascalCase for components
  - camelCase for functions and variables
  - kebab-case for file names

## 🔒 Security

- **Environment Variables**: Sensitive data in .env files
- **API Security**: JWT token management
- **Input Validation**: Client-side validation with Zod
- **XSS Protection**: React's built-in XSS protection

## 📚 Dependencies

### Core

- **React 19**: Latest React with concurrent features
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **React Query**: Server state management

### UI & Styling

- **TailwindCSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality component library
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

### Forms & Validation

- **React Hook Form**: Performant forms
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Form validation resolvers

### Internationalization

- **react-i18next**: Internationalization framework
- **i18next**: Core internationalization library
- **i18next-browser-languagedetector**: Language detection

### Utilities

- **Axios**: HTTP client
- **date-fns**: Date utility library
- **clsx**: Conditional className utility
- **tailwind-merge**: Tailwind class merging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.
