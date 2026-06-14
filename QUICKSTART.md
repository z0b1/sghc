# ⚡ Hack Club Website - Quick Start Guide

Welcome! This is a modern fullstack website for your school's Hack Club. Get it running in 3 steps!

## 🎯 What You Get

✅ Beautiful landing page with hero section  
✅ Events listing with registration status  
✅ Member directory with profiles  
✅ Project showcase gallery  
✅ Admin dashboard to manage everything  
✅ Official Hack Club branding (colors, fonts, logo)  
✅ Responsive design (mobile, tablet, desktop)  
✅ Deploy-ready for Vercel  

---

## 🚀 Get Started Locally (Development)

### 1. Start the Dev Server

```bash
cd path/to/sghc
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser

### 2. Explore the Site

- **Home**: http://localhost:3000
- **Events**: http://localhost:3000/events
- **Members**: http://localhost:3000/members
- **Projects**: http://localhost:3000/projects
- **Admin Login**: http://localhost:3000/admin/login

### 3. Admin Login

Default credentials (⚠️ Change for production!):
- **URL**: http://localhost:3000/admin/login
- **Password**: `hackclub2026`

Once logged in, you can:
- Manage events (create, edit, delete)
- Add club members
- Showcase projects
- Update live leaderboard scores

---

## 📦 Production Deployment (Vercel)

### 3-Minute Setup

1. **Create GitHub repo**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Add environment variables from `.env.local`
   - Click Deploy!

3. **Your site is live!** 🎉
   - Will be at: `https://[project-name].vercel.app`
   - Or use your own domain

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

---

## 🔧 Customize Your Site

### Change Colors

Edit [app/config/branding.ts](app/config/branding.ts):
```typescript
export const HackClubBrand = {
  colors: {
    red: '#ec3750',      // Main color
    blue: '#338eda',     // Accent
    // ... more colors
  }
}
```

### Update Content

**Home Page**: [app/page.tsx](app/page.tsx)  
**Events Page**: [app/events/page.tsx](app/events/page.tsx)  
**Members Page**: [app/members/page.tsx](app/members/page.tsx)  
**Projects Page**: [app/projects/page.tsx](app/projects/page.tsx)

Find the mock data (events, members, projects) and replace with real data.

### Change Admin Password

Edit `.env.local`:
```env
ADMIN_PASSWORD=your_new_secure_password
```

(Don't forget to update in Vercel environment variables too!)

---

## 📁 Project Structure

```
sghc/
├── app/                    # Next.js app (all pages)
│   ├── page.tsx           # Home page
│   ├── events/            # Events page
│   ├── members/           # Members page
│   ├── projects/          # Projects page
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── components/        # Reusable components
│   ├── config/            # Configuration (branding, etc)
│   ├── lib/               # Utilities (auth, firebase, etc)
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── public/                # Static assets
├── .env.local             # Environment variables (local only)
├── package.json           # Dependencies
└── README_HACKCLUB.md     # Detailed documentation
```

---

## 🎨 Pages Overview

### Home Page
- Hero section with CTA buttons
- Feature cards (Hackathons, Learning, Community)
- Call to action section

### Events Page
- List of upcoming events
- Registration status bars
- Event details (date, time, location, description)

### Members Page
- Grid of member profiles
- Name, role, grade, bio
- "Sign Up" button for new members

### Projects Page
- Showcase of member projects
- Project descriptions, tech stack, team info
- Links to project repos/demos

### Admin Dashboard
- Secure password-protected login
- Tabbed interface (Events, Members, Projects, Leaderboard)
- Create/edit/delete functionality (coming soon)

---

## 🔐 Security Notes

**⚠️ Before deploying to production:**

1. **Change the admin password** in `.env.local` and Vercel
2. **Generate a new JWT secret key** (use a long random string)
3. **Update Firebase credentials** (optional but recommended)
4. **Test the login** with the new password
5. **Enable HTTPS** (Vercel does this automatically)

**Never commit .env.local to GitHub!** (It's in .gitignore)

---

## 🔗 Useful Links

- [Official Hack Club](https://hackclub.com)
- [Hack Club Brand](https://hackclub.com/brand)
- [Hack Club Theme](https://theme.hackclub.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)

---

## 🐛 Troubleshooting

**Dev server won't start?**
```bash
rm -rf node_modules .next
npm install
npm run dev
```

**Module not found errors?**
- Check file paths (should be relative: `./components/Navigation`)
- Ensure files exist in the app directory

**Styles not loading?**
- Check that `globals.css` is imported in `layout.tsx`
- Clear browser cache (Ctrl+Shift+Delete)

**Build fails on Vercel?**
- Check Vercel build logs
- Run `npm run build` locally to debug
- Ensure all environment variables are set

---

## 📞 Need Help?

- Check [README_HACKCLUB.md](README_HACKCLUB.md) for detailed docs
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- Ask your Hack Club leadership!

---

## 🎓 Next Steps

1. ✅ Run locally and test all pages
2. ✅ Customize content (events, members, projects)
3. ✅ Update colors/branding (optional)
4. ✅ Deploy to Vercel
5. ✅ Set up custom domain (optional)
6. ✅ Connect to Firebase for real data (optional)
7. ✅ Share with your club members! 🎉

---

## 📝 Tips

- **Make changes locally** → `npm run dev` to test → **Push to GitHub** → Vercel auto-deploys
- **Mock data** is in the page files (look for `const mock...`)
- **Hack Club branding** is respected throughout (colors, fonts, design)
- **Mobile-first** design - test on your phone!

---

**You're ready! 🚀 Start building!**
