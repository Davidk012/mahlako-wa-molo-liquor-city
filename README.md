# Style Funeral Services (SFS) - Funeral Equipment Booking Web App

A modern, responsive web application for funeral homes to browse, select, book, and pay for funeral equipment rental packages. Replaces messy WhatsApp/call-based bookings with a clean, real-time availability system.

## 🚀 Features

### Client Features
- **User Registration & Login** - Secure authentication for funeral home clients

### Core Functionality
- **Age Verification Gate** - Mandatory 18+ verification with 24-hour session cookie
- **WhatsApp Ordering System** - Direct order submission via WhatsApp API
- **Dual Notification System** - WhatsApp + backup email notifications
- **Product Catalog** - Filterable catalog with categories (Whiskey, Wine, Beer, Spirits, Ciders, Specials)
- **Live Store Status** - Real-time open/closed indicator based on South African time
- **Mobile-First Design** - Responsive design optimized for mobile users

### Design & UX
- **Premium Dark Theme** - Sophisticated dark theme with gold/amber accents
- **Modern UI Components** - Smooth animations and micro-interactions
- **Accessibility** - WCAG compliant with proper ARIA labels
- **SEO Optimized** - Local business schema markup and meta tags

### E-commerce Features
- **Shopping Cart System** - Add/remove items with quantity management
- **Order Management** - Persistent cart with localStorage
- **Product Filtering** - Search, category, and price filtering
- **Special Offers** - Featured products and promotional pricing

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Hook Form** for form management
- **React Query** for state management

### Backend
- **Node.js** with Express
- **Nodemailer** for email notifications
- **MongoDB** with Mongoose (optional)
- **JWT** for authentication (if needed)

## Project Structure

```
mahlako-wa-molo-liquor-city/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── AgeVerification.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── OrderSummary.tsx
│   │   │   ├── StoreStatus.tsx
│   │   │   └── SEOHead.tsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.tsx
│   │   │   └── Shop.tsx
│   │   ├── hooks/              # Custom hooks
│   │   │   └── useOrder.ts
│   │   ├── types/              # TypeScript types
│   │   │   └── product.ts
│   │   ├── data/               # Static data
│   │   │   └── products.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── public/                 # Static assets
│       └── images/
├── server/                     # Express backend
│   ├── controllers/
│   │   └── orderController.js
│   ├── index.js
│   └── package.json
└── package.json                # Root package.json
```

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- MongoDB (optional, for data persistence)

### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd mahlako-wa-molo-liquor-city
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp server/.env.example server/.env
   
   # Configure environment variables
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ORDER_EMAIL=mahlakowamolo@gmail.com
   CLIENT_URL=http://localhost:3000
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

   This starts both frontend (port 3000) and backend (port 5000) concurrently.

## Configuration

### WhatsApp Number
Update the WhatsApp number in:
- `client/src/components/OrderSummary.tsx` (line ~108)
- `client/src/pages/Home.tsx` (line ~68)

### Email Configuration
Configure email settings in `server/.env`:
- `EMAIL_HOST` - SMTP server
- `EMAIL_USER` - Sender email
- `EMAIL_PASS` - Email password/app password
- `ORDER_EMAIL` - Recipient for order notifications

### Business Information
Update business details in:
- `client/src/components/SEOHead.tsx` - Schema markup
- `client/src/components/Layout.tsx` - Footer and header info
- `client/src/components/StoreStatus.tsx` - Trading hours

## Deployment

### Frontend Build
```bash
cd client
npm run build
```

2. **Configure Production Environment**
```bash
# Set production environment variables
export NODE_ENV=production
export MONGODB_URI=mongodb://production-server/sfs-funeral-booking
```

3. **Start Production Server**
```bash
cd server
npm start
```

### Docker Deployment
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d
```

## 📊 Monitoring & Analytics

### Key Metrics
- **Booking Conversion Rate** - Quote to booking conversion
- **Equipment Utilization** - Percentage of equipment in use
- **Average Booking Value** - Revenue per booking
- **Client Retention** - Repeat booking rate
- **Response Time** - Average time from quote to booking

### Success Targets
- **Booking Time** - Reduce from 30min to <5min
- **Double Bookings** - Zero double-bookings
- **WhatsApp Adoption** - 80% of clients using auto-confirm
- **Admin Efficiency** - One-click weekly reports

## 🔒 Security

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds
- **Input Validation** - Joi validation for all inputs
- **Rate Limiting** - Express rate limiter
- **CORS Protection** - Configured CORS policies
- **HTTPS Only** - SSL/TLS encryption in production

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and inquiries:
- **Email**: info@sfs.co.za
- **Phone**: +27 12 345 6789
- **Address**: 123 Funeral Street, Pretoria, South Africa

## 🗺 Roadmap (Phase 2)

- [ ] **Live Streaming Module** - YouTube/Vimeo integration
- [ ] **Client Dashboard** - Enhanced client management
- [ ] **Recurring Bookings** - Monthly maintenance packages
- [ ] **Barcode Scanning** - Equipment tracking
- [ ] **Mobile Apps** - Native iOS/Android apps
- [ ] **Advanced Analytics** - AI-powered insights
- [ ] **Multi-location Support** - Multiple warehouse management

---

**Style Funeral Services** - Professional funeral equipment rental since 2024
