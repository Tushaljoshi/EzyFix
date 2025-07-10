# 📘 EzyFix – Coupon & Deals Web App Documentation

## 🔰 Overview

EzyFix is a responsive ReactJS-based web application that allows users to discover, purchase, and redeem coupons and deals across various categories such as Restaurants, Travel, Fashion, Fitness, etc. It includes user authentication, wallet integration, secure purchase, and coupon management features.

---

## 📁 Project Structure

```
├── public/                # Static files
├── src/
│   ├── assets/            # Logos, images, icons
│   ├── components/        # Reusable UI components (Navbar, Footer, etc.)
│   ├── pages/             # Main pages (Home, SignIn, SignUp, Profile, etc.)
│   ├── data/              # Static deal/category data
│   ├── App.jsx            # Main React app
│   └── index.js           # React DOM entry point
```

---

## 🚀 Features

### 🧑 User Authentication

* Sign up with full name, phone (OTP verification), email, password.
* Login with email/password or via OTP (sent to registered phone).
* Persistent login using `localStorage`.

### 🎟️ Coupons

* View featured and categorized deals.
* Add coupons to cart or buy directly using coins.
* See only relevant coupons based on login.
* Dynamic filtering via search or category.

### 💰 Wallet System

* Coins represent currency (1 coin = ₹1).
* Add coins via Razorpay payment gateway.
* Purchase coupons only if sufficient coins available.
* Transaction history logs wallet top-ups and purchases.

### 🧾 MyCoupons Page

* Track coupons: active, redeemed, expired.
* Option to filter and view only redeemed.
* Coins deducted upon successful purchase.

### 👤 Profile

* View/edit user details (address, DOB, gender).
* Upload custom profile photo.
* Mobile number verification with OTP.
* Terms and Conditions section.
* Rate app via star rating.

### 📄 Pages Included

* Home (Hero, CTA, FeaturedDeals, Categories)
* Coupons (modal view, filters, add to cart)
* MyCoupons
* Sign In / Sign Up
* Profile
* Wallet
* AddCoin (payment page)
* TransactionHistory
* Query/Support

---

## 🧠 Technologies Used

* **Frontend:** ReactJS, Tailwind CSS, Lucide React Icons
* **Storage:** `localStorage` for user session, wallet, coupons
* **OTP:** Simulated via alert (for demo)
* **Payment:** Razorpay (placeholder for integration)

---

## 🛠 Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/your-username/ezyfix.git
cd ezyfix
```

### 2. Install Dependencies

```
npm install
```

### 3. Start Development Server

```
npm start
```

### 4. Open in Browser

```
http://localhost:3000
```

---

## ✅ To-Do / Future Improvements

* Backend integration for real OTP and secure login
* Firebase/Auth0-based authentication
*  Razorpay/Stripe live payments
* Admin panel to manage coupons and users
* Backend database with MongoDB or Firebase

---

## 👨‍💻 Developer Notes

* All logic is kept client-side for demo purposes.
* OTP is simulated via alert — not secure for production.
* Payment gateway is a UI mockup unless integrated.

---

## 📩 Support / Contact

For any issues or queries, users can:

* Visit the **Query** page in the app
* Or contact: `support@ezyfix.com`

---

## 📝 License

This project is licensed under the MIT License.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
