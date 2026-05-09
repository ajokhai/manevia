# Manevia: Full-Stack Luxury Wig Store & Virtual Try-On Platform

Manevia is an enterprise-grade Next.js application built to deliver a premium eCommerce experience. Inspired by top-tier beauty platforms, Manevia features deep product categorization, a frictionless slide-out cart, multi-step checkout, and the revolutionary **Nano Banana AI Try-On Studio**.

## 🌟 Key Features

* **Premium Storefront**: Mega-menu navigation, rich Product Listing Pages (PLP) with advanced filtering, and high-converting Product Detail Pages (PDP).
* **Nano Banana Virtual Try-On**: A robust AI pipeline where users can upload a selfie and see themselves wearing the wig in real-time.
* **Optimized Checkout**: Zustand-powered slide-out cart and an express multi-step checkout flow supporting Apple Pay and Shop Pay.
* **Admin Dashboard**: Comprehensive back-office tools for Product Information Management (PIM), Order Fulfillment, Vendor Onboarding, and Platform Settings.
* **"Run As" Feature**: Allows admins to securely impersonate customers for troubleshooting.

---

## 🚀 The "Double Architecture" Deployment

Manevia is built with a **Seamless Dual-Mode Architecture**, designed specifically so non-technical users can launch the site immediately, and upgrade to full production later without writing code or rebuilding the app.

### Phase 1: Live MVP (Vercel Infrastructure)
Right now, the application is set up to run a LIVE, fully functional MVP using Vercel's zero-config infrastructure. **You do not need to hunt down external API keys to launch this.**

1. Push this repository to GitHub.
2. Go to [Vercel.com](https://vercel.com/new).
3. Import the GitHub repository and click **Deploy**.
4. Once deployed, click on the **"Storage"** tab in your Vercel Dashboard.
5. Provision two things:
   - **Vercel Postgres** (For the Database)
   - **Vercel Blob** (For the Image Uploads)
6. Vercel will automatically inject the necessary environment variables (`POSTGRES_URL` and `BLOB_READ_WRITE_TOKEN`) into your app.

*The site is now live! Your database works, image uploads work, and you can start onboarding real users immediately.*

---

### Phase 2: The Production Upgrade (Custom Infrastructure)
When you are ready to process real money and move data to a dedicated MongoDB cluster, you do not need to change the application code. 

#### Step 1: Porting the Data
If you have live users from Phase 1, you need to migrate their data from Vercel Postgres to MongoDB. We have built an automated script for this.
1. Ensure both `POSTGRES_URL` (from Vercel) and `MONGODB_URI` (your new MongoDB Atlas string) are in your local `.env` file.
2. Run the migration script:
   ```bash
   npx tsx scripts/migrate-to-mongo.ts
   ```
   *This script will safely extract all users, products, and orders from Postgres and inject them into MongoDB.*

#### Step 2: Injecting the API Keys
Once the data is ported, simply paste your new API keys into the **Vercel Settings > Environment Variables** tab and change `NEXT_PUBLIC_APP_MODE` to `"production"`.

Where to get your keys:
1. **Database (`MONGODB_URI`)**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. **Payments (`PAYSTACK_PUBLIC_KEY` / `SECRET_KEY`)**: [Paystack](https://dashboard.paystack.com/#/settings/api-keys-webhooks)
3. **Emails (`RESEND_API_KEY`)**: [Resend](https://resend.com/api-keys)
4. **AI Engine (`GEMINI_API_KEY`)**: [Google AI Studio](https://aistudio.google.com/app/apikey)
5. **Image Storage (`NEXT_PUBLIC_CLOUDINARY...`)**: [Cloudinary](https://cloudinary.com/) (Only if moving away from Vercel Blob)

Once you paste these into Vercel, the app upgrades itself instantly!

---

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
