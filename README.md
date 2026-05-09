# Manevia: Full-Stack Luxury Wig Store & Virtual Try-On Platform

Manevia is an enterprise-grade Next.js application built to deliver a premium eCommerce experience. Inspired by top-tier beauty platforms, Manevia features deep product categorization, a frictionless slide-out cart, multi-step checkout, and the revolutionary **Nano Banana AI Try-On Studio**.

## 🌟 Key Features

* **Premium Storefront**: Mega-menu navigation, rich Product Listing Pages (PLP) with advanced filtering, and high-converting Product Detail Pages (PDP).
* **Nano Banana Virtual Try-On**: A robust AI pipeline where users can upload a selfie and see themselves wearing the wig in real-time.
* **Optimized Checkout**: Zustand-powered slide-out cart and an express multi-step checkout flow supporting Apple Pay and Shop Pay.
* **Admin Dashboard**: Comprehensive back-office tools for Product Information Management (PIM), Order Fulfillment, Vendor Onboarding, and Platform Settings.
* **"Run As" Feature**: Allows admins to securely impersonate customers for troubleshooting.

---

## 🚀 The Zero-Dependency Demo Mode

This repository is currently configured for a **Zero-Dependency Client Demo**.
To ensure a flawless presentation out of the box, the frontend UI, the AI Virtual Try-On, and the Checkout process are utilizing hardcoded mock data and simulated API delays.

**You do NOT need any environment variables to run or deploy the demo.**

### Running Locally
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) to view the storefront. The Admin dashboard is located at `/admin`.

### Deploying the Demo
You can deploy this repository directly to **Vercel** with zero configuration required. Just link your GitHub repository and hit Deploy.

---

## ⚙️ Production Launch Requirements

When transitioning from the demo to a live, production-ready application, the mock data must be removed, and you **must** configure the following environment variables in Vercel. See `.env.example` for the formatting.

### 1. Database (MongoDB Atlas)
Manevia utilizes **MongoDB** for its NoSQL flexibility, which is crucial for handling complex wig variants (combinations of length, density, texture, and lace type).
* `MONGODB_URI`

### 2. Payments (Paystack)
For securely processing transactions and routing vendor payouts via Subaccounts.
* `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
* `PAYSTACK_SECRET_KEY`

### 3. Image Storage (Cloudinary or Vercel Blob)
For hosting product marketing images and the transparent AI source assets.
* `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
* `CLOUDINARY_API_KEY`
* `CLOUDINARY_API_SECRET`

### 4. Nano Banana AI Pipeline
The API key for the generative AI engine (e.g., Google Gemini or Fal.ai) that performs the image blending.
* `GEMINI_API_KEY`

### 5. Emails & Notifications
Manevia uses **Resend** to send automated transactional emails (Order confirmations, Vendor approvals).
* `RESEND_API_KEY`

### 6. Authentication
* `NEXTAUTH_SECRET`
* `NEXTAUTH_URL`

---

## 👑 Vendor Onboarding & AI Image Guidelines

For the Nano Banana AI Try-On to function flawlessly without artifacts, vendors must upload specific "Source Assets" during product creation. A dedicated Vendor Onboarding UI is available in the Admin panel (`/admin/vendor-onboarding`) detailing these requirements:
* Images must be **Transparent PNGs**.
* Ghost mannequin technique is required (no mannequin faces inside the cap).
* Wigs must be photographed at a perfect zero-degree angle with flat studio lighting.
