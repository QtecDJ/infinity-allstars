# Deployment Guide

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git
- GitHub account

## Pre-Deployment Checklist

1. **Test the build locally**
```bash
npm run build
npm run preview
```

2. **Verify all assets load correctly**
   - Check images
   - Check fonts
   - Check CSS
   - Test all interactive elements

3. **Update configuration**
   - Ensure `vite.config.ts` has correct `base` path
   - Update meta tags in `index.html`
   - Replace placeholder content with actual data

## Deployment Methods

### Option 1: GitHub Actions (Automated) ⭐ Recommended

**Advantages:**
- Automatic deployment on every push
- No manual steps required
- Built-in CI/CD pipeline

**Steps:**

1. **Push your code to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: Elite Squad portfolio"
git branch -M main
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

2. **Configure GitHub Pages:**
   - Navigate to your repository on GitHub
   - Go to **Settings** → **Pages**
   - Under **Build and deployment**:
     - Source: **GitHub Actions**
   - Save changes

3. **Wait for deployment:**
   - Go to **Actions** tab
   - Monitor the deployment workflow
   - Once complete (green checkmark), your site is live

4. **Access your site:**
   - URL: `https://your-username.github.io/your-repo-name/`
   - Link appears in **Settings** → **Pages**

**Troubleshooting:**
- If workflow fails, check the Actions tab for error logs
- Ensure GitHub Pages is enabled
- Verify permissions are set correctly in `.github/workflows/deploy.yml`

---

### Option 2: gh-pages Package (Manual)

**Advantages:**
- Simple command-line deployment
- Good for quick updates
- Full control over deployment timing

**Steps:**

1. **Update base path in `vite.config.ts`:**
```typescript
export default defineConfig({
  // ... other config
  base: '/your-repo-name/',  // ← Change this to your actual repo name
});
```

2. **Install dependencies (if not already done):**
```bash
npm install
```

3. **Deploy:**
```bash
npm run deploy
```

4. **Configure GitHub Pages:**
   - Go to **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** → **/ (root)**
   - Save

5. **Access your site:**
   - URL: `https://your-username.github.io/your-repo-name/`

**Troubleshooting:**
- If `gh-pages` branch doesn't appear, wait a few minutes and refresh
- Clear browser cache if changes don't appear
- Verify the `base` path matches your repository name

---

### Option 3: Custom Domain

If you want to use a custom domain (e.g., `elitesquad.com`):

1. **Add CNAME file:**
```bash
echo "yourdomain.com" > public/CNAME
```

2. **Configure DNS:**
   - Add A records pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or add CNAME record: `your-username.github.io`

3. **Update GitHub Pages settings:**
   - Go to **Settings** → **Pages**
   - Enter your custom domain
   - Enable **Enforce HTTPS**

4. **Update `vite.config.ts`:**
```typescript
base: '/',  // Use root for custom domain
```

---

## Post-Deployment

### Verification Steps

1. **Test all pages/sections:**
   - [ ] Hero section loads
   - [ ] About section displays
   - [ ] Teams cards render correctly
   - [ ] Achievements timeline shows
   - [ ] Gallery images load
   - [ ] Call-to-action buttons work
   - [ ] Footer displays properly

2. **Test navigation:**
   - [ ] Navbar links scroll to sections
   - [ ] Mobile menu works
   - [ ] Smooth scrolling functions

3. **Test interactive elements:**
   - [ ] Team detail dialogs open
   - [ ] Gallery filters work
   - [ ] Buttons respond to clicks
   - [ ] Form submissions (if applicable)

4. **Test responsiveness:**
   - [ ] Mobile (320px - 480px)
   - [ ] Tablet (768px - 1024px)
   - [ ] Desktop (1280px+)
   - [ ] Large screens (1920px+)

5. **Performance check:**
   - Run Lighthouse audit
   - Target scores:
     - Performance: 90+
     - Accessibility: 95+
     - Best Practices: 95+
     - SEO: 95+

### Common Issues & Solutions

**Issue: 404 errors on page refresh**
- **Cause:** GitHub Pages doesn't support client-side routing
- **Solution:** Project uses anchor links (no routing), so this shouldn't occur

**Issue: Images not loading**
- **Cause:** Incorrect base path
- **Solution:** Verify `base` in `vite.config.ts` matches deployment URL

**Issue: CSS not applied**
- **Cause:** Asset paths incorrect
- **Solution:** Ensure `base: './'` for GitHub Pages

**Issue: Blank page after deployment**
- **Cause:** JavaScript errors
- **Solution:** Check browser console, verify build completed successfully

**Issue: Changes not appearing**
- **Cause:** Browser cache or CDN delay
- **Solution:** Hard refresh (Ctrl+Shift+R), clear cache, wait a few minutes

---

## Continuous Deployment Workflow

**Recommended Git workflow:**

1. **Develop locally:**
```bash
git checkout -b feature/new-feature
# Make changes
npm run dev  # Test locally
```

2. **Test build:**
```bash
npm run build
npm run preview
```

3. **Commit and push:**
```bash
git add .
git commit -m "Add: descriptive message"
git push origin feature/new-feature
```

4. **Create pull request:**
   - Review changes
   - Merge to `main`

5. **Automatic deployment:**
   - GitHub Actions triggers
   - Site updates automatically

---

## Rollback Procedure

If deployment introduces issues:

**Using GitHub Actions:**
1. Go to **Actions** tab
2. Find successful previous workflow
3. Click **Re-run all jobs**

**Using gh-pages:**
1. Checkout previous commit:
```bash
git checkout <previous-commit-hash>
```
2. Deploy:
```bash
npm run deploy
```

---

## Environment-Specific Configurations

**Development:**
```typescript
// vite.config.ts
base: './',
```

**Production (GitHub Pages):**
```typescript
// vite.config.ts
base: './',  // or '/repo-name/' depending on method
```

**Production (Custom Domain):**
```typescript
// vite.config.ts
base: '/',
```

---

## Security Considerations

1. **Never commit sensitive data:**
   - API keys
   - Passwords
   - Private configuration

2. **Use environment variables:**
   - Create `.env.local` for local secrets
   - Use GitHub Secrets for CI/CD

3. **Keep dependencies updated:**
```bash
npm audit
npm update
```

---

## Monitoring & Analytics

**Add Google Analytics (optional):**

1. Create GA4 property
2. Add tracking code to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Support

For deployment issues:
1. Check GitHub Actions logs
2. Review this guide
3. Consult Vite documentation
4. Open issue on GitHub

---

**Deployment complete! Your Elite Squad portfolio is now live! 🎉**
