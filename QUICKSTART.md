# Quick Start Guide

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React & React DOM
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons
- All necessary build tools

### 2. Start Development Server

```bash
npm run dev
```

Your site will be available at: `http://localhost:5173`

The dev server includes:
- Hot Module Replacement (instant updates)
- Fast Refresh for React
- TypeScript type checking
- Tailwind CSS compilation

### 3. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder with:
- Minified JavaScript and CSS
- Optimized images
- Code splitting
- Tree shaking (removes unused code)
- Source maps (optional)

### 4. Preview Production Build

```bash
npm run preview
```

Test your production build locally before deploying.

---

## Quick Deploy to GitHub Pages

### Automated Deployment (Recommended)

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git push -u origin main
```

2. **Enable GitHub Pages:**
   - Go to repository **Settings** → **Pages**
   - Source: **GitHub Actions**
   
3. **Done!** Your site deploys automatically on every push.

### Manual Deployment

```bash
npm run deploy
```

Then enable GitHub Pages:
- **Settings** → **Pages**
- Source: **Deploy from a branch**
- Branch: **gh-pages**

---

## Customization Quick Tips

### Change Colors

Edit [src/index.css](src/index.css):
```css
--primary: 0 72% 51%;      /* Red - change these values */
--accent: 45 93% 47%;      /* Gold */
--background: 0 0% 3%;     /* Black */
```

### Update Content

- **Teams**: [src/components/sections/Teams.tsx](src/components/sections/Teams.tsx) → `teamsData` array
- **Achievements**: [src/components/sections/Achievements.tsx](src/components/sections/Achievements.tsx) → `achievementsData` array
- **Gallery**: [src/components/sections/Gallery.tsx](src/components/sections/Gallery.tsx) → `galleryData` array

### Replace Images

1. Update image URLs in component files
2. Recommended: Use WebP format for better performance
3. Use services like Unsplash, Cloudinary, or host your own

### Change Typography

Edit [src/index.css](src/index.css) and add custom fonts:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

body {
  font-family: 'Your Font', sans-serif;
}
```

---

## Project Structure Overview

```
Shadcen/
├── src/
│   ├── components/
│   │   ├── sections/        ← Page sections (edit content here)
│   │   └── ui/              ← shadcn/ui components (don't modify)
│   ├── lib/                 ← Utility functions
│   ├── types/               ← TypeScript types
│   └── App.tsx              ← Main app component
├── public/                  ← Static assets (add images/icons here)
├── index.html               ← HTML entry point
├── package.json             ← Dependencies and scripts
├── vite.config.ts           ← Vite configuration
├── tailwind.config.ts       ← Tailwind configuration
└── README.md                ← Full documentation
```

---

## Common Tasks

### Add a New Section

1. Create component: `src/components/sections/NewSection.tsx`
2. Import in `src/App.tsx`
3. Add to JSX in `<main>`

### Add a New UI Component

```bash
# If you need more shadcn/ui components:
npx shadcn-ui@latest add [component-name]
```

### Update Site Metadata

Edit [index.html](index.html):
```html
<title>Your Title</title>
<meta name="description" content="Your description">
```

### Change Site Name

1. [src/components/sections/Navbar.tsx](src/components/sections/Navbar.tsx) → Update "ELITE SQUAD"
2. [src/components/sections/Footer.tsx](src/components/sections/Footer.tsx) → Update footer text
3. [index.html](index.html) → Update `<title>`

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use different port
npm run dev -- --port 3000
```

### Build Fails
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build
```

### TypeScript Errors
```bash
# Reinstall dependencies
npm install
# Check tsconfig.json is correct
```

### Styles Not Applying
```bash
# Ensure Tailwind is properly configured
# Check postcss.config.js exists
# Restart dev server
```

---

## Performance Tips

1. **Optimize Images:**
   - Use WebP format
   - Compress images before using
   - Use appropriate sizes

2. **Lazy Loading:**
   - Images have `loading="lazy"` attribute
   - Consider code splitting for large components

3. **Build Optimization:**
   - Already configured in `vite.config.ts`
   - Automatic code splitting
   - Tree shaking enabled

---

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

## Need Help?

1. Check [README.md](README.md) for detailed documentation
2. Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
3. Review error messages in terminal
4. Check browser console for client-side errors

---

**Ready to build something amazing! 🚀**
