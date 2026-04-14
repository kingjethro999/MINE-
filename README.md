# Mines Platform 🚀

A high-performance, premium web application for mining, arbitrage intelligence, and interactive gaming. Built with state-of-the-art technologies to provide a seamless user experience across all devices.

![Platform Dashboard](/public/icon.png)

## ✨ Features

- **📊 Arbitrage Intelligence Dashboard**: Real-time tracking and execution of arbitrage opportunities.
- **⛏️ Mining Engine**: Automated mining sessions with customizable durations and tiered rewards.
- **🎮 Game Arcade**: Integrated gaming environment with coins awarded based on playtime.
- **💎 Staking & Plans**: Tiered membership system (Basic, Pro, Premium) with dynamic execution limits and features.
- **🔗 Referral System**: Multi-level referral tracking and automated commission payouts.
- **💳 Payment Integration**: Secure payments and upgrades via Paystack.
- **🏧 Withdrawal System**: Automated withdrawal requests with admin approval workflows.
- **📱 PWA Ready**: Installable on mobile and desktop for a native-like experience.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [NextAuth.js v5](https://authjs.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **PWA Support**: [Serwist](https://serwist.pages.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: Lucide Icons, Sonner (Toasts)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS)
- [pnpm](https://pnpm.io/) (Recommended)
- PostgreSQL Database

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd mines
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mines"
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   
   # Paystack
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_..."
   PAYSTACK_SECRET_KEY="sk_..."
   
   # GameMonetize
   GAMEMONETIZE_FEED_URL="..."
   ```

4. **Database Migration:**
   ```bash
   npx prisma db push
   ```

5. **Seeding (Optional):**
   ```bash
   npx ts-node scripts/seed-test-user.ts
   ```

6. **Run the Development Server:**
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `/app`: Next.js App Router (Dashboard, Admin, Auth, API)
- `/components`: Reusable UI components and complex dashboard widgets.
- `/lib`: Shared utilities, API clients, and constants.
- `/prisma`: Database schema and migrations.
- `/public`: Static assets and PWA icons.
- `/scripts`: Maintenance and seeding scripts.

## 🛡️ License

Private Project - All Rights Reserved.
