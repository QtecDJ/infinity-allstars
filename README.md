# Elite Squad - Cheerleading Portfolio Website

A modern, production-ready portfolio website for a professional cheerleading team, built with Vite, React, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- ✨ Modern, premium sports brand aesthetic
- 🎨 Dark theme with black, red, white, and gold accents
- 📱 Fully responsive design
- ⚡ Lightning-fast performance with Vite
- 🎭 Smooth animations and transitions
- 🧩 Modular component architecture
- 🔧 Type-safe with TypeScript
- 🎯 SEO optimized
- 📦 Production-ready build configuration

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## Project Structure

```
Shadcen/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── src/
│   ├── components/
│   │   ├── sections/           # Page sections
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Teams.tsx
│   │   │   ├── Achievements.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── CallToAction.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/                 # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       ├── dialog.tsx
│   │       ├── separator.tsx
│   │       └── navigation-menu.tsx
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   ├── index.css               # Global styles
│   └── vite-env.d.ts           # Vite type definitions
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── components.json             # shadcn/ui configuration
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Shadcen
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to GitHub Pages (using gh-pages)

## Deployment to GitHub Pages

### Method 1: Using GitHub Actions (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Enable GitHub Pages in your repository:
   - Go to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

3. The workflow will automatically deploy on every push to `main` branch

4. Your site will be available at: `https://<username>.github.io/<repo-name>/`

### Method 2: Using gh-pages package

1. Update the `base` in `vite.config.ts` if needed:
```typescript
base: '/repo-name/'  // Replace with your repository name
```

2. Deploy:
```bash
npm run deploy
```

3. Enable GitHub Pages:
   - Go to **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Select **gh-pages** branch

## Customization

### Colors

Edit the color scheme in [tailwind.config.ts](tailwind.config.ts) and [src/index.css](src/index.css):

```css
--primary: 0 72% 51%;        /* Deep red */
--accent: 45 93% 47%;        /* Gold */
--background: 0 0% 3%;       /* Near black */
```

### Content

Update content in the section components:
- Team data: [src/components/sections/Teams.tsx](src/components/sections/Teams.tsx)
- Achievements: [src/components/sections/Achievements.tsx](src/components/sections/Achievements.tsx)
- Gallery images: [src/components/sections/Gallery.tsx](src/components/sections/Gallery.tsx)

### Images

Replace placeholder images with your own:
- Use WebP format for optimal performance
- Recommended services: Unsplash, Cloudinary, or your own CDN
- Update image URLs in component files

## Performance Optimization

- Images are lazy-loaded
- CSS is optimized with Tailwind's purge
- Code splitting with Vite
- Minified production builds
- Optimized bundle sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

Built with ❤️ for Elite Squad
