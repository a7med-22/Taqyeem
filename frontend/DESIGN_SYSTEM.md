# Design System Documentation

## Overview

This project uses a modern, professional design system with a beautiful Ocean theme. The design is built with CSS variables for easy customization and uses a combination of Tailwind CSS and custom components.

## Color Palette

### Current Theme: Ocean Professional

- **Primary (Ocean Blue)**: Modern cyan/teal tones (#06b6d4)
- **Secondary (Deep Navy)**: Professional dark grays for contrast
- **Accent (Coral Orange)**: Energetic orange for highlights (#ff5722)

### Color Usage

```css
/* Primary - Main brand elements */
.text-primary-500    /* Buttons, links, brand elements */
/* Buttons, links, brand elements */
.bg-primary-50       /* Light backgrounds */
.border-primary-200  /* Subtle borders */

/* Secondary - Text and neutral elements */
.text-secondary-700  /* Body text */
.bg-secondary-50     /* Card backgrounds */

/* Accent - Call-to-actions and highlights */
.bg-accent-500       /* CTAs, notifications */
.text-accent-600; /* Important highlights */
```

## Components

### Modern Button Variants

```jsx
// Primary button with shimmer effect
<Button variant="default">Primary Action</Button>

// Secondary outlined button
<Button variant="outline">Secondary Action</Button>

// Accent button for important actions
<Button variant="accent">Important Action</Button>

// Glass effect button
<Button variant="glass">Glass Effect</Button>
```

### Enhanced Card Components

```jsx
// Modern card with hover effects
<Card variant="modern">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>

// Glass morphism card
<Card variant="glass">Glass content</Card>

// Professional gradient card
<Card variant="professional">Professional content</Card>
```

### Input Components

```jsx
// Modern input with enhanced focus
<Input variant="modern" placeholder="Enter text..." />

// Glass effect input
<Input variant="glass" placeholder="Glass input..." />

// Error state input
<Input variant="error" placeholder="Error state..." />
```

## Utility Classes

### Background Effects

```css
.bg-animated          /* Animated gradient background */
/* Animated gradient background */
.bg-animated-hero     /* Hero section animation */
.bg-mesh             /* Subtle mesh pattern */
.bg-gradient-primary /* Primary gradient */
.bg-gradient-ocean   /* Ocean gradient */
.bg-gradient-sunset; /* Sunset gradient */
```

### Glass Morphism

```css
.glass               /* Basic glass effect */
/* Basic glass effect */
.glass-card         /* Glass card with enhanced shadow */
.card-glass; /* Pre-built glass card */
```

### Modern Effects

```css
.card-modern        /* Modern card with top accent */
/* Modern card with top accent */
.nav-modern         /* Modern navigation bar */
.input-modern       /* Modern input styling */
.btn-primary        /* Enhanced primary button */
.text-gradient      /* Gradient text effect */
.pulse-glow         /* Pulsing glow animation */
.float; /* Floating animation */
```

### Navigation

```css
.nav-link           /* Modern navigation links */
/* Modern navigation links */
.nav-link.active; /* Active navigation state */
```

### Badges & Status

```css
.badge-primary      /* Primary badge */
/* Primary badge */
.badge-success      /* Success badge */
.badge-warning      /* Warning badge */
.badge-accent; /* Accent badge */
```

## Animations

### Available Animations

1. **Gradient Shift**: Smooth color transitions
2. **Float**: Gentle up-down movement
3. **Pulse Glow**: Pulsing shadow effect
4. **Shimmer**: Button hover effect
5. **Loading Dots**: Loading indicator

### Custom Animation Classes

```css
.animate-shimmer    /* Shimmer effect for buttons */
/* Shimmer effect for buttons */
.loading-dots; /* Loading dots animation */
```

## Customization

### Quick Color Changes

1. **Update CSS Variables** in `src/index.css`:

```css
:root {
  --color-primary-500: #your-color;
  --color-accent-500: #your-accent;
}
```

2. **Use Theme Config** in `src/config/theme.js`:

   - Choose from predefined alternative schemes
   - Copy colors to CSS variables

3. **Alternative Schemes Available**:
   - Purple Professional
   - Creative Pink
   - Nature Green
   - Sunset Orange

### Color Scheme Examples

#### Purple Professional

```css
--color-primary-500: #8b5cf6; /* violet */
--color-accent-500: #f59e0b; /* amber */
```

#### Creative Pink

```css
--color-primary-500: #ec4899; /* pink */
--color-accent-500: #8b5cf6; /* violet */
```

#### Nature Green

```css
--color-primary-500: #059669; /* emerald */
--color-accent-500: #f59e0b; /* amber */
```

## Best Practices

### Using the Design System

1. **Consistent Spacing**: Use CSS variables for spacing

```css
padding: var(--spacing-4);
margin: var(--spacing-6);
```

2. **Color Hierarchy**:

   - Primary for brand elements
   - Secondary for content
   - Accent for CTAs and highlights

3. **Component Variants**: Always use predefined variants

```jsx
<Button variant="default">    // ✅ Good
<button className="custom">   // ❌ Avoid
```

4. **Responsive Design**: All components are mobile-first

5. **Accessibility**: Components include focus states and ARIA support

### Performance Tips

1. CSS variables enable instant theme switching
2. Animations use `transform` for hardware acceleration
3. Glass effects use `backdrop-filter` where supported
4. Gradients are optimized for performance

## Dark Mode Support

The design system includes dark mode variables:

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode color overrides */
  }
}
```

## Browser Support

- Modern browsers with CSS Grid support
- Backdrop-filter for glass effects (fallback provided)
- CSS custom properties support required
- Optimized for Chrome, Firefox, Safari, Edge

## Getting Started

1. All styles are in `src/index.css`
2. Component styles in `src/components/ui/`
3. Theme configuration in `src/config/theme.js`
4. Use provided utility classes for consistency

## Contributing

When adding new components:

1. Follow the existing naming convention
2. Use CSS variables for colors
3. Include hover and focus states
4. Add animation with `transition-all`
5. Test in both light and dark modes
6. Update this documentation

For questions or contributions, refer to the theme configuration file for available options and examples.
