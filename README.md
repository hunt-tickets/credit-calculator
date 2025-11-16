# Credit Calculator

A modern, SEO-optimized credit and loan calculator built with Next.js 15, featuring multi-language support (English & Spanish) and a minimalist design.

## Features

- **Multi-language Support**: Fully localized in English and Spanish
- **SEO Optimized**: Comprehensive metadata, sitemaps, and structured data
- **Instant Calculations**: Real-time loan payment calculations
- **Amortization Schedule**: Detailed payment breakdown for the entire loan term
- **Responsive Design**: Modern, minimalist UI that works on all devices
- **Zero Configuration**: No registration or API keys required

## Technologies

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Ready for Vercel, Netlify, or any Node.js hosting

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
credit-calculator/
├── app/
│   ├── [lang]/          # Dynamic language routes (en, es)
│   │   ├── layout.tsx   # Language-specific layout with metadata
│   │   └── page.tsx     # Main landing page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   ├── manifest.ts      # PWA manifest
│   ├── robots.ts        # Robots.txt configuration
│   └── sitemap.ts       # XML sitemap
├── components/
│   └── CreditCalculator.tsx  # Main calculator component
├── lib/
│   ├── dictionaries.ts  # Translations for EN & ES
│   └── i18n.ts          # Internationalization utilities
└── middleware.ts        # Language detection and routing
```

## SEO Features

- **Metadata**: Comprehensive title, description, and keywords for each language
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Sitemap**: Automatic XML sitemap generation
- **Robots.txt**: Search engine crawling configuration
- **Language Alternates**: Proper hreflang implementation
- **Semantic HTML**: Proper heading hierarchy and structure
- **Schema Markup**: Structured data for rich results

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/credit-calculator)

### Environment Variables

No environment variables required. The application works out of the box.

## Customization

### Adding More Languages

1. Add the locale to `lib/i18n.ts`
2. Add translations to `lib/dictionaries.ts`
3. Update `app/[lang]/layout.tsx` to generate static params

### Styling

Modify `tailwind.config.ts` and `app/globals.css` to customize colors and styles.

## License

MIT License - feel free to use this project for any purpose.

## Support

For issues and questions, please open an issue on GitHub.
