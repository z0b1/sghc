# 🚀 Deployment Guide for Hack Club Website

## Quick Start (5 minutes)

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it: `hack-club-website` or similar
3. Choose **Public** (optional, for visibility)
4. Click **Create repository**

### Step 2: Push Your Code to GitHub

```bash
cd /path/to/sghc
git add .
git commit -m "Initial commit: Hack Club website launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hack-club-website.git
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (easier!)
3. Click **Import Project**
4. Select your GitHub repository
5. Click **Import**

### Step 4: Configure Environment Variables

Vercel will show a screen to add environment variables. Add these:

```
ADMIN_PASSWORD=hackclub2026
ADMIN_SECRET_KEY=your-super-secret-key-change-this-in-production
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBU_rq5mVX1gGPwEHwRkqM9P3g5zqZ3K-0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hackclub-sghc.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hackclub-sghc
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hackclub-sghc.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

### Step 5: Deploy!

Click the **Deploy** button and wait ~2-3 minutes for deployment to complete.

Your site will be live at: `https://[project-name].vercel.app`

---

## Custom Domain Setup (Optional)

If you have a domain (e.g., `hackclub.yourschool.edu`):

1. In Vercel Dashboard, go to your project
2. Click **Settings** → **Domains**
3. Enter your domain name
4. Follow the DNS instructions provided
5. Wait 24-48 hours for propagation

---

## Updating Your Site

Every time you push to GitHub, Vercel automatically deploys:

```bash
# Make changes locally
git add .
git commit -m "Update events page"
git push origin main
```

Vercel will deploy automatically! Check the deployment status in the Vercel dashboard.

---

## Important: Security Checklist for Production

Before sharing the website with everyone:

- [ ] **Change ADMIN_PASSWORD** in Vercel environment variables
- [ ] **Generate new ADMIN_SECRET_KEY** (use a strong random string)
- [ ] **Update Firebase credentials** (get real credentials from Firebase Console)
- [ ] **Enable HTTPS** (Vercel does this automatically)
- [ ] **Test the admin login** with new password
- [ ] **Test on mobile** to ensure responsive design
- [ ] **Check Lighthouse score** (aim for 90+)
- [ ] **Verify all links** work correctly

---

## Firebase Setup (For Live Data)

To use real data instead of mock data:

1. Go to [firebase.google.com](https://firebase.google.com)
2. Click **Get Started**
3. Create a new project: `hackclub-sghc` (or similar)
4. Enable **Firestore Database** (Start in test mode initially)
5. Copy the config credentials to `.env.local` and Vercel environment variables

Then update these files to fetch from Firestore instead of using mock data:
- `app/events/page.tsx`
- `app/members/page.tsx`
- `app/projects/page.tsx`

---

## Troubleshooting

### Build Fails on Vercel
- Check the build logs in Vercel dashboard
- Ensure all environment variables are set
- Run `npm run build` locally to test

### Website Shows 404 Errors
- Check file paths and imports
- Verify all files were committed to GitHub
- Check Vercel build logs

### Admin Login Not Working
- Verify `ADMIN_PASSWORD` is correct
- Check browser console for errors (F12)
- Clear browser cache/cookies and try again

### Styles Not Loading
- Check if Tailwind CSS is configured
- Verify `globals.css` is imported in `layout.tsx`
- Check for CSS errors in browser DevTools (F12)

---

## Next Steps After Launch

### High Priority
1. **Set up Firebase** with real database
2. **Update admin password** to something secure
3. **Test event registration** functionality
4. **Notify members** to start using the site

### Medium Priority
1. Add member photos/avatars
2. Implement email notifications for registrations
3. Set up live leaderboard during events
4. Add Discord integration

### Lower Priority
1. Analytics (Google Analytics)
2. Search functionality
3. Mobile app version
4. Social media sharing

---

## Support & Help

- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Firebase Docs**: [firebase.google.com/docs](https://firebase.google.com/docs)
- **Hack Club**: [hackclub.com](https://hackclub.com)

---

## Maintenance

**Weekly**:
- Monitor site performance in Vercel dashboard
- Check for any error alerts

**Monthly**:
- Review analytics
- Update events and news
- Backup important data

**Quarterly**:
- Update dependencies: `npm update`
- Security audit
- Feature planning

---

## Estimated Timeline

- **Setup**: 5 minutes
- **First deployment**: 5-10 minutes
- **Custom domain**: 24-48 hours DNS propagation
- **Firebase setup**: 15-30 minutes
- **Full feature launch**: 2-4 weeks

---

## Questions?

Contact your Hack Club leadership or check the [README_HACKCLUB.md](README_HACKCLUB.md) for more details.

**Let's ship it! 🚀**
