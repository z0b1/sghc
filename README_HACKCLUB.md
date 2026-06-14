# Hack Club Website - SGHC

A modern, fullstack website for your school's Hack Club built with Next.js, TypeScript, Tailwind CSS, and Firebase.

## 🚀 Features

- **Home Page**: Hero section with club introduction and call-to-action
- **Events Management**: Browse and register for upcoming hackathons and workshops
- **Member Directory**: See all club members with their roles and bios
- **Project Showcase**: Gallery of amazing projects built by members
- **Admin Dashboard**: Secure admin panel to manage events, members, and projects
  - Create/edit/delete events
  - Manage member profiles
  - Showcase member projects
  - Live leaderboard for hackathon events
- **Modern Design**: Uses official Hack Club branding (colors, fonts, logo)
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Real-time Updates**: Powered by Firebase Firestore for live data

## 🎨 Design

Uses the official **Hack Club brand colors and design system**:
- Primary Red: `#ec3750`
- Blue: `#338eda`
- Green: `#33d6a6`
- And more from the official palette

## 🛠️ Tech Stack

- **Frontend**: Next.js 16+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Firebase Firestore
- **Authentication**: JWT (for admin)
- **Deployment**: Vercel
- **Icons**: Hack Club Icons, Heroicons

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd sghc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy `.env.local.example` to `.env.local` and fill in your values:
   ```bash
   cp .env.local.example .env.local
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Admin Login

- URL: `http://localhost:3000/admin/login`
- Default Password: `hackclub2026`

**⚠️ IMPORTANT**: Change the password in `.env.local` for production!

## 📁 Project Structure

```
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Home page
│   ├── events/page.tsx          # Events page
│   ├── members/page.tsx         # Members directory
│   ├── projects/page.tsx        # Project showcase
│   ├── admin/
│   │   ├── login/page.tsx       # Admin login
│   │   └── dashboard/page.tsx   # Admin dashboard
│   ├── api/
│   │   └── admin/
│   │       └── login/route.ts   # Login API
│   └── layout.tsx               # Root layout
├── src/
│   ├── components/
│   │   └── Navigation.tsx       # Header/nav component
│   ├── config/
│   │   └── branding.ts          # Hack Club brand config
│   ├── lib/
│   │   ├── auth.ts              # JWT auth utilities
│   │   └── firebase.ts          # Firebase setup
│   └── ...
└── public/                       # Static assets
```

## 🗄️ Database Schema (Firebase Firestore)

### Collections

**events** - Upcoming events and hackathons
```
{
  name: string
  date: string
  time: string
  description: string
  location: string
  registrationLimit: number
  registered: number
  leaderboard: Array<{rank, teamName, score, members}>
  status: "upcoming" | "active" | "completed"
}
```

**members** - Club members
```
{
  name: string
  role: string
  bio: string
  grade?: string
  email?: string
}
```

**projects** - Showcase projects
```
{
  title: string
  description: string
  members: Array<string>
  technologies: Array<string>
  link?: string
}
```

## 🚀 Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables from `.env.local`
   - Click "Deploy"

## 📝 Environment Variables

### Required for Production

```env
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx

ADMIN_PASSWORD=your_secure_password_here
ADMIN_SECRET_KEY=your_secure_jwt_secret_here
```

## 🎯 Next Steps / TODOs

- [ ] Connect to real Firebase project
- [ ] Implement event registration forms
- [ ] Build live leaderboard for events
- [ ] Add team formation tool
- [ ] Email notifications for registrations
- [ ] Discord integration
- [ ] Member photo upload
- [ ] Multi-admin support
- [ ] Analytics dashboard
- [ ] Mobile app (optional)

## 🤝 Contributing

This is a school project! Feel free to:
- Add new features
- Improve the design
- Fix bugs
- Suggest improvements

## 📞 Support

For questions or issues, contact the Hack Club leadership or open an issue on GitHub.

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ by the Hack Club team**

Powered by [Hack Club](https://hackclub.com)
