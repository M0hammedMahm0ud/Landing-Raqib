# Raqib Landing Page

Modern, animated landing page for the Raqib AI-Powered Shoplifting Detection System.

## 📁 Files

- **index.html** - Main HTML structure
- **styles.css** - Complete styling with animations and glass morphism effects
- **script.js** - Interactive functionality and animations

## 🎨 Features

### Design Elements
- **Animated Background** - Floating gradient circles with glass morphism
- **Glass Morphism** - Modern frosted glass effects throughout
- **Smooth Animations** - Framer Motion-inspired animations using CSS and vanilla JS
- **Responsive Design** - Mobile-first approach with breakpoints at 768px and 480px
- **Dark Theme** - Professional dark color scheme with gradient accents

### Sections

1. **Hero Section**
   - Animated title with gradient text
   - Floating notification cards
   - Camera grid mockup visualization
   - Call-to-action buttons
   - Key statistics display

2. **Features Grid** (6 features)
   - Real-time Detection
   - Instant Alerts
   - 24/7 Monitoring
   - Mobile App
   - Smart Analytics
   - Privacy First

3. **How It Works** (3 steps)
   - Install Cameras
   - AI Analysis
   - Real-time Response

4. **Pricing Section** (3 plans)
   - Pro ($199/month)
   - Ultra ($399/month) - Featured
   - Enterprise (Custom pricing)

5. **Testimonials** (3 cards)
   - Customer reviews with ratings

6. **Contact Form**
   - Name, Email, Company, Message fields
   - Form validation
   - Success/error notifications

7. **Footer**
   - Product links
   - Company information
   - Legal links
   - Social media links

## 🚀 Interactive Features

### JavaScript Functionality

1. **Mobile Menu**
   - Hamburger menu toggle
   - Smooth slide-in animation
   - Auto-close on link click

2. **Smooth Scrolling**
   - Animated scroll to anchor links
   - Offset for fixed navbar

3. **Scroll Effects**
   - Navbar background change on scroll
   - Parallax effect on hero section
   - Fade-in animations for sections

4. **Form Handling**
   - Email validation
   - Loading states during submission
   - Success/error notifications

5. **Notifications System**
   - Toast-style notifications
   - Auto-dismiss after 4 seconds
   - Success, error, and info variants

6. **Pricing Interactions**
   - Plan selection buttons
   - Enterprise plan → Contact form scroll
   - Other plans → Signup redirect (ready for integration)

## 🎯 Usage

### Accessing the Landing Page

**Option 1: Direct File Access**
```
file:///D:/Graduation/GraduationCode/src/admin-portal/public/landing/index.html
```

**Option 2: Via Express Server**
Add to your Express app configuration:
```javascript
app.use('/landing', express.static('public/landing'));
```
Then access at: `http://localhost:YOUR_PORT/landing`

**Option 3: Production Deployment**
The landing page is completely static and can be hosted on:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

### Integration Points

1. **Login Redirect**
   - Update `/app` href in navbar and mobile menu to your admin portal login page

2. **Contact Form API**
   - In `script.js`, replace the TODO comment with your actual contact API endpoint:
   ```javascript
   const response = await fetch('/api/contact', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(formData)
   });
   ```

3. **Signup Links**
   - Update pricing button click handlers in `script.js` to redirect to your signup flow

4. **Analytics**
   - Add Google Analytics or other tracking in the `<head>` section

## 🎨 Customization

### Colors
Main color variables are defined in `:root` in `styles.css`:
```css
--violet-600: #8b5cf6;
--violet-700: #7c3aed;
--blue-600: #3b82f6;
--green-600: #10b981;
```

### Fonts
Currently using **Plus Jakarta Sans** from Google Fonts. Change in `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet">
```

### Content
All text content is in `index.html` and can be easily modified to match your branding.

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Dependencies

- **Font Awesome 6.5.1** - Icons
- **Google Fonts** - Plus Jakarta Sans typeface

No JavaScript frameworks required - pure vanilla JS for maximum performance!

## 📈 Performance

- Lightweight (~15KB HTML + ~20KB CSS + ~8KB JS gzipped)
- Fast initial load
- Optimized animations using CSS transforms
- Lazy loading ready

## 🌐 SEO Ready

- Semantic HTML5 structure
- Meta description and title tags
- Proper heading hierarchy
- Alt text ready for images (add when replacing mockups)

---

**Built for Raqib - AI-Powered Shoplifting Detection System**
