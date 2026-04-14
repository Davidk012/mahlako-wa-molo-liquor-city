# Style Funeral Services (SFS) - Funeral Equipment Booking Web App

A modern, responsive web application for funeral homes to browse, select, book, and pay for funeral equipment rental packages. Replaces messy WhatsApp/call-based bookings with a clean, real-time availability system.

## 🚀 Features

### Client Features
- **User Registration & Login** - Secure authentication for funeral home clients
- **Equipment Catalog** - Browse tents, chairs, lowering devices, artificial grass, drapes, sound systems, CCTV
- **Package Selection** - Pre-bundled packages (Basic, Professional, VIP) or custom selections
- **Real-time Availability** - Check equipment availability for specific dates
- **Instant Quote Generator** - Dynamic pricing with delivery fees and add-ons
- **Online Booking** - Complete booking process with date, time, and location details
- **Payment Integration** - Support for PayFast, Yoco, and Ozow (South African payment gateways)
- **Booking History** - View past and upcoming bookings with status tracking
- **WhatsApp Confirmations** - Automated booking confirmations and reminders

### Admin Features
- **Dashboard Analytics** - Revenue, bookings, and utilization metrics
- **Booking Management** - View, update, and manage all bookings
- **Equipment Inventory** - Track equipment availability, maintenance, and rental status
- **User Management** - Manage client and staff accounts
- **Staff Assignment** - Assign drivers and setup crews to bookings
- **Financial Reports** - Monthly revenue, popular items, client rankings
- **System Settings** - Configure pricing, delivery zones, and notifications

### Staff Features
- **Mobile-Friendly Dashboard** - View daily assignments and tasks
- **Task Management** - Mark tasks as picked up, delivered, setup, collected
- **Photo Upload** - Upload proof of delivery/condition photos
- **Contact Information** - Quick access to client contact details
- **GPS Integration** - Get directions to cemetery locations

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Joi** - Input validation
- **Multer** - File uploads
- **Twilio** - WhatsApp API integration

## 📋 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB 5.0+
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd sfs-funeral-booking
```

2. **Install dependencies**
```bash
npm run install-all
```

3. **Environment Configuration**
```bash
# Copy environment template
cp server/.env.example server/.env

# Edit environment variables
nano server/.env
```

4. **Database Setup**
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env file
```

5. **Start Development Servers**
```bash
# Start both client and server
npm run dev

# Or start individually
npm run server  # Backend on port 5000
npm run client  # Frontend on port 3000
```

## 🗂 Project Structure

```
sfs-funeral-booking/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Node.js backend
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   ├── controllers/      # Route controllers
│   ├── utils/           # Utility functions
│   └── package.json
├── shared/               # Shared types/utilities
└── package.json          # Root package.json
```

## 🔧 Configuration

### Environment Variables

#### Server Configuration
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sfs-funeral-booking
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
```

#### Payment Gateways
```env
# PayFast
PAYFAST_MERCHANT_ID=your-payfast-merchant-id
PAYFAST_MERCHANT_KEY=your-payfast-merchant-key

# Yoco
YOCO_SECRET_KEY=your-yoco-secret-key
YOCO_PUBLIC_KEY=your-yoco-public-key
```

#### WhatsApp Integration
```env
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

## 📱 Usage

### For Funeral Homes (Clients)

1. **Register Account** - Create an account with your funeral home details
2. **Browse Equipment** - View available equipment and packages
3. **Select Items** - Choose individual items or pre-configured packages
4. **Set Date & Location** - Provide funeral date, time, and cemetery details
5. **Get Quote** - Instant price calculation with delivery fees
6. **Book & Pay** - Complete booking with online payment
7. **Track Status** - Monitor booking status and receive WhatsApp updates

### For SFS Administrators

1. **Login as Admin** - Access admin dashboard
2. **Manage Bookings** - View and manage all client bookings
3. **Track Inventory** - Monitor equipment availability and maintenance
4. **Assign Staff** - Assign drivers and setup crews to bookings
5. **Generate Reports** - View financial and operational reports
6. **Configure System** - Update pricing, delivery zones, and settings

### For SFS Staff

1. **Login as Staff** - Access mobile-friendly dashboard
2. **View Tasks** - See daily assignments and delivery schedules
3. **Update Status** - Mark tasks as picked up, delivered, setup, collected
4. **Upload Photos** - Provide proof of delivery/condition
5. **Contact Clients** - Quick access to client contact information

## 🔄 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Equipment Endpoints
- `GET /api/equipment` - Get all equipment
- `GET /api/equipment/:id` - Get single equipment
- `POST /api/equipment` - Create equipment (Admin)
- `PUT /api/equipment/:id` - Update equipment (Admin)
- `GET /api/equipment/:id/availability` - Check availability

### Booking Endpoints
- `GET /api/bookings` - Get bookings (with filters)
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get single booking
- `PUT /api/bookings/:id` - Update booking
- `POST /api/bookings/quote` - Calculate quote

### Package Endpoints
- `GET /api/packages` - Get all packages
- `POST /api/packages` - Create package (Admin)
- `GET /api/packages/:id/availability` - Check package availability

## 🧪 Testing

```bash
# Run backend tests
cd server && npm test

# Run frontend tests
cd client && npm test

# Run with coverage
npm run test:coverage
```

## 🚀 Deployment

### Production Deployment

1. **Build Frontend**
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
