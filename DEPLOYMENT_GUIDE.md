# EverShop E-commerce Platform - Deployment Guide

## 🚀 Live Website Deployment Guide

This guide will help you deploy your EverShop e-commerce platform to GitHub and host it live on Vercel.

## 📋 Prerequisites

- GitHub account
- Git installed on your system
- Node.js 18+ installed

## 🗂️ Project Overview

Your EverShop e-commerce platform includes:

### ✅ **Completed Features**
- **Customer Features:**
  - Product browsing and search
  - Shopping cart with BDT currency
  - User authentication and profiles
  - Order placement with payment validation
  - Wishlist functionality
  - Product reviews and ratings
  - Profile management with address

- **Admin Features:**
  - Complete admin dashboard
  - Product management (CRUD)
  - Category management
  - Order management
  - User management
  - Analytics and reporting

- **Technical Features:**
  - Next.js 15.5.4 with Turbopack
  - MongoDB database integration
  - JWT authentication
  - Edge Runtime compatible
  - Responsive design
  - SEO optimized

## 🌐 Step 1: GitHub Repository Setup

### 1.1 Commit Your Current Changes

```bash
# Navigate to your project directory
cd /home/nafizur-nayem/E_Comm_Website/evershop-ecommerce

# Add all files to git
git add .

# Commit with a descriptive message
git commit -m "feat: Complete e-commerce platform with admin panel and payment integration

- Add complete admin dashboard with CRUD operations
- Implement secure payment validation (Card, Banking, bKash, Nagad)
- Add wishlist and order history with auto-refresh
- Implement user profile management with address support
- Add product reviews and rating system
- Include BDT currency throughout the platform
- Add comprehensive authentication system
- Implement real-time order tracking
- Add SEO optimization and responsive design"
```

### 1.2 Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository: `evershop-ecommerce`
5. Add description: "Complete e-commerce platform with admin panel, payment integration, and real-time features"
6. Make it **Public** (so it can be deployed for free)
7. **Don't** initialize with README (you already have one)
8. Click "Create repository"

### 1.3 Connect Local Repository to GitHub

```bash
# Add your GitHub repository as remote origin
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/evershop-ecommerce.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

## 🌍 Step 2: Deploy to Vercel (Recommended)

Vercel is perfect for Next.js applications and offers free hosting.

### 2.1 Prepare for Deployment

Create a production environment file:

```bash
# Copy your environment variables
cp .env.local .env.example
```

Edit `.env.example` to remove sensitive values:

```env
# Database
MONGODB_URI=your_mongodb_connection_string_here

# Authentication
JWT_SECRET=your_jwt_secret_here
NEXTAUTH_SECRET=your_nextauth_secret_here

# App URL (will be updated after deployment)
NEXTAUTH_URL=http://localhost:3000
```

### 2.2 Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign up with your GitHub account
2. Click "New Project"
3. Import your `evershop-ecommerce` repository
4. Configure the project:
   - **Project Name**: `evershop-ecommerce`
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add each variable from your `.env.local` file
   - **Important**: Update `NEXTAUTH_URL` to your Vercel domain (you'll get this after deployment)

6. Click "Deploy"

### 2.3 Set Up MongoDB Atlas (If not already done)

If you're using a local MongoDB, you'll need to migrate to MongoDB Atlas for production:

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Whitelist all IP addresses (0.0.0.0/0) for global access
6. Get your connection string
7. Update the `MONGODB_URI` in Vercel environment variables

## 🔧 Step 3: Custom Domain (Optional)

### 3.1 Add Custom Domain to Vercel

1. In your Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS

### 3.2 Update Environment Variables

After getting your domain, update:
- `NEXTAUTH_URL` to your production domain

## 📊 Step 4: Environment Configuration

### 4.1 Production Environment Variables

Make sure these are set in Vercel:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/evershop-ecommerce

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-min-32-characters
NEXTAUTH_SECRET=your-super-secure-nextauth-secret

# App Configuration
NEXTAUTH_URL=https://your-app-name.vercel.app
NODE_ENV=production
```

### 4.2 Database Setup

Your MongoDB should include these collections:
- `users` (with admin user)
- `products`
- `categories`
- `orders`
- `reviews`

## 🎉 Step 5: Post-Deployment

### 5.1 Test Your Live Website

1. Visit your Vercel URL
2. Test customer features:
   - Browse products
   - Add to cart
   - Register/Login
   - Place test order
   - Check wishlist

3. Test admin features:
   - Login to admin panel: `/admin`
   - Admin credentials: `admin@evershop.com` / `Admin@123`
   - Test CRUD operations

### 5.2 Set Up Monitoring

1. Vercel provides built-in analytics
2. Consider adding:
   - Google Analytics
   - Error monitoring (Sentry)
   - Performance monitoring

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel will automatically deploy when you push to the `main` branch:

```bash
# Make changes to your code
git add .
git commit -m "feat: add new feature"
git push origin main
# Vercel will automatically deploy the changes
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Errors**: Check your environment variables are set correctly
2. **Database Connection**: Ensure MongoDB Atlas is properly configured
3. **Authentication Issues**: Verify JWT_SECRET and NEXTAUTH_URL are correct
4. **Missing Features**: Make sure all files are committed to GitHub

### Build Commands:

If you encounter build issues, you can customize:

- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

## 📞 Support

If you encounter any issues:

1. Check Vercel deployment logs
2. Verify environment variables
3. Test locally first with `npm run build` and `npm start`
4. Check MongoDB Atlas connection

## 🎯 Final Result

Your live e-commerce platform will be available at:
- **Vercel URL**: `https://your-app-name.vercel.app`
- **Custom Domain**: `https://your-domain.com` (if configured)

### Platform Features Live:
- ✅ Full e-commerce functionality
- ✅ Admin dashboard
- ✅ Payment processing
- ✅ User management
- ✅ Real-time updates
- ✅ Mobile responsive
- ✅ SEO optimized

Your EverShop platform is now ready for production use! 🚀