# 🛒 EverShop - Complete E-commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC)](https://tailwindcss.com/)

A comprehensive, production-ready e-commerce platform built with Next.js 15, featuring a complete admin dashboard, secure payment processing, and real-time functionality. Designed specifically for the Bangladeshi market with BDT currency integration.

## 🌟 Live Demo

- **Customer Interface**: [View Live Site](https://your-app-name.vercel.app)
- **Admin Dashboard**: [Admin Panel](https://your-app-name.vercel.app/admin)
  - Email: `admin@evershop.com`
  - Password: `Admin@123`

## ✨ Features

### 🛍️ **Customer Features**
- **Product Browsing**: Advanced search, filtering, and category navigation
- **Shopping Cart**: Real-time cart management with BDT currency
- **User Authentication**: Secure signup/login with JWT tokens
- **Profile Management**: Complete profile editing with address management
- **Order Placement**: Secure checkout with payment validation
- **Payment Methods**: Card, Internet Banking, bKash, Nagad support
- **Order History**: Real-time order tracking with auto-refresh
- **Wishlist**: Save favorite products with easy management
- **Product Reviews**: Rate and review purchased products
- **Responsive Design**: Mobile-first responsive interface

### 👨‍💼 **Admin Features**
- **Complete Dashboard**: Analytics and overview metrics
- **Product Management**: Full CRUD operations for products
- **Category Management**: Organize products with categories
- **Order Management**: Track and update order statuses
- **User Management**: View and manage customer accounts
- **Real-time Updates**: Automatic data synchronization
- **Secure Access**: Role-based authentication system

### 🔧 **Technical Features**
- **Next.js 15.5.4**: Latest React framework with Turbopack
- **TypeScript**: Full type safety and IntelliSense
- **MongoDB**: Scalable NoSQL database
- **Edge Runtime**: Optimized for serverless deployment
- **JWT Authentication**: Secure token-based auth
- **Real-time Updates**: Auto-refreshing data
- **SEO Optimized**: Meta tags, sitemap, robots.txt
- **Performance**: Image optimization and lazy loading

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/evershop-ecommerce.git
   cd evershop-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your values:
   ```env
   MONGODB_URI=mongodb://localhost:27017/evershop-ecommerce
   JWT_SECRET=your-super-secure-jwt-secret-at-least-32-characters
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Customer site: `http://localhost:3000`
   - Admin panel: `http://localhost:3000/admin`

## 📦 Project Structure

```
evershop-ecommerce/
├── src/
│   ├── app/                 # Next.js 13+ App Router
│   │   ├── admin/          # Admin dashboard pages
│   │   ├── api/            # API routes
│   │   ├── auth/           # Authentication pages
│   │   ├── cart/           # Shopping cart
│   │   ├── checkout/       # Checkout process
│   │   ├── products/       # Product pages
│   │   └── account/        # User account pages
│   ├── components/         # Reusable React components
│   ├── lib/               # Utility libraries
│   ├── models/            # MongoDB schemas
│   ├── store/             # Zustand state management
│   └── utils/             # Helper functions
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🔐 Authentication System

### Customer Authentication
- Secure JWT-based authentication
- Profile management with address storage
- Password change functionality
- Account deletion with safety checks

### Admin Authentication
- Role-based access control
- Secure admin panel access
- Edge Runtime compatible tokens

### Default Admin Account
- **Email**: `admin@evershop.com`
- **Password**: `Admin@123`

## 💳 Payment Integration

### Supported Payment Methods
- **Credit/Debit Cards**: Complete validation
- **Internet Banking**: Major Bangladeshi banks
- **bKash**: Mobile wallet integration
- **Nagad**: Mobile wallet support

### Payment Validation
- Real-time form validation
- Secure payment detail verification
- Order placement only with valid payment info

## 🗄️ Database Schema

### Collections
- **users**: Customer and admin accounts
- **products**: Product catalog
- **categories**: Product categories
- **orders**: Order history and tracking
- **reviews**: Product reviews and ratings

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
```

### Code Style
- ESLint configuration included
- TypeScript strict mode
- Prettier formatting
- Component-based architecture

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository
   - Set environment variables
   - Deploy automatically

3. **Set up MongoDB Atlas**
   - Create a MongoDB Atlas cluster
   - Update `MONGODB_URI` in production

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 🔧 Configuration

### Environment Variables
```env
MONGODB_URI=           # MongoDB connection string
JWT_SECRET=            # JWT signing secret
NEXTAUTH_SECRET=       # NextAuth secret
NEXTAUTH_URL=          # Application URL
NODE_ENV=              # Environment (development/production)
```

### Currency Configuration
- Primary currency: Bangladeshi Taka (৳)
- Conversion rate: 1 USD = 110 BDT
- All prices displayed in BDT

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Product browsing and search
- [ ] Add to cart functionality
- [ ] Checkout process with payment validation
- [ ] Order placement and history
- [ ] Admin dashboard access
- [ ] Product management (CRUD)
- [ ] Order management

## 📱 Mobile Responsiveness

- Fully responsive design
- Mobile-first approach
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CSRF protection
- Secure cookie handling
- Role-based access control

## 🎯 Performance

- Next.js Image optimization
- Lazy loading components
- Efficient database queries
- Edge Runtime compatibility
- Optimized bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions:

1. Check the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Review the [Issues](https://github.com/YOUR_USERNAME/evershop-ecommerce/issues)
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the robust database
- Tailwind CSS for the utility-first CSS framework
- Lucide React for the beautiful icons

---

**Built with ❤️ for the Bangladeshi e-commerce market**