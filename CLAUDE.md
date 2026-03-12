# Handlebars Template Preview - Project Overview

## Project Purpose

This is a production-ready web application for previewing Handlebars templates across multiple message formats: Email, SMS, Push Notifications, and Viber. It allows users to paste template content and instantly see how it renders with dummy data across different platforms and devices.

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Template Engine**: Handlebars
- **Deployment**: Vercel

### Project Structure

```
src/
├── app/
│   ├── page.tsx           # Main application UI
│   ├── layout.tsx         # Root layout with metadata
│   └── globals.css        # Global styles
├── components/
│   ├── EmailPreview.tsx   # Email rendering in iframe
│   ├── SMSPreview.tsx     # iOS/Android SMS mockups
│   ├── ViberPreview.tsx   # iOS/Android Viber mockups
│   └── PushPreview.tsx    # iOS/Android push notification mockups
└── lib/
    ├── templateUtils.ts    # Type detection, variable extraction, dummy data
    └── handlebarsRenderer.ts # Template compilation & rendering

public/
├── sample_email.hbs       # Sample email template
├── sample_sms.hbs         # Sample SMS template
├── sample_push.hbs        # Sample push notification template
└── sample_viber.hbs       # Sample Viber template
```

## Key Features

### 1. Template Type Auto-Detection
- **Email**: Detects HTML tags (`<html>`, `<body>`, etc.)
- **SMS/Viber/Push**: Defaults to SMS for plain text
- Users can manually override via tabs

### 2. Multi-Platform Previews

**Email**
- Full HTML rendering in sandboxed iframe
- Gmail-style header with sender info
- Supports all HTML/CSS (tables, inline styles, media queries)

**SMS**
- iOS: iMessage-style blue bubbles
- Android: WhatsApp-style interface
- Realistic device frames with status bars

**Push Notifications**
- iOS: Lock screen notification with gradient background
- Android: Dark material design notification
- Separate title field for push notifications

**Viber**
- iOS/Android: Purple-branded Viber interface
- Business account styling
- Read receipts and timestamps

### 3. Handlebars Features

**Supported Syntax**
- Variables: `{{variableName}}`
- Conditionals: `{{#if}}`, `{{else}}`, `{{/if}}`
- Loops: `{{#each}}`, `{{/each}}`
- Helpers: `eq`, `ne`, `gt`, `lt`, `and`, `or`

**Dummy Data Generation**
- Automatically detects variable types by name patterns
- Pre-configured mappings for common names (userName, email, code, etc.)
- Generic fallbacks for unknown variables
- Displays all extracted variables with their values in UI

### 4. User Interface

**Editor Panel (Left)**
- Syntax highlighting for Handlebars
- Character count
- Auto-detection indicator
- Conditional push title field
- Sample template quick-load buttons

**Preview Panel (Right)**
- Type switcher tabs (Email/SMS/Push/Viber)
- Live rendering on every keystroke
- Responsive device mockups
- Dark mode support

**Variables Panel (Below Editor)**
- List of all template variables
- Shows variable name and dummy value
- Scrollable for templates with many variables
- Only appears when variables are detected

## Development Commands

```bash
npm run dev    # Start development server (http://localhost:3000)
npm run build  # Production build
npm start      # Serve production build
npm run lint   # Run ESLint
```

## Deployment

### Vercel (Recommended)
```bash
vercel          # Deploy to Vercel
```

Configuration is in `vercel.json`:
- Framework: Next.js
- Build command: `npm run build`
- Output directory: `.next`

### Manual
Build artifacts are in `.next/` and can be deployed to any Node.js hosting platform.

## Design System

### Salmon Color Palette

The application uses the Salmon design system color palette for consistent branding and visual hierarchy. All colors are defined as CSS variables in `src/app/globals.css` for easy maintenance and theming.

**Core Neutral Colors:**
- `#FFFFFF` - White (neutral.white._100) - Primary backgrounds
- `#F4F4F3` - Off-white (neutral.black._25) - Page background
- `#EBEBEB` - Light gray (neutral.black._50) - Secondary backgrounds
- `#E3E3E3` - Border gray (neutral.black._100) - Primary borders
- `#BDBCBC` - Medium gray (neutral.black._200) - Dark borders
- `#918F8F` - Text gray (neutral.black._300) - Placeholders
- `#656263` - Dark gray (neutral.black._400) - Secondary text
- `#231F20` - Almost black (neutral.black._600) - Primary text

**Brand Colors (Coral):**
- `#F05A5A` - Coral primary (brand.coral._400) - Main brand color, buttons, accents
- `#FFECEF` - Coral lightest (brand.coral._50) - Light backgrounds
- `#FECFD5` - Coral light (brand.coral._100) - Borders, hover states
- `#D4393A` - Coral dark (brand.coral._700) - Text on light backgrounds
- `#E74241` - Coral darker (brand.coral._600) - Dark accents

**Supporting Colors (Turquoise):**
- `#DCF1F2` - Turquoise light (brand.turquoise._50)
- `#A8DDDD` - Turquoise medium (brand.turquoise._100)
- `#18B2AE` - Turquoise primary (brand.turquoise._300)
- `#00736B` - Turquoise dark (brand.turquoise._700)

**Message Colors:**
- Green: `#E4F5EC` (bg), `#BEE7CF` (hover), `#00B064` (primary), `#008F4D` (dark)
- Blue: `#E4F4FE` (bg), `#C6DFFC` (hover), `#4295F6` (primary), `#3488EA` (dark)
- Red: `#FEF2EE` (bg), `#FFCCD1` (hover), `#FF3129` (primary), `#E41324` (dark)

**CSS Variables (defined in globals.css):**

Neutral Colors:
- `--neutral-white`, `--neutral-black-25` through `--neutral-black-600`

Brand Coral:
- `--brand-coral-50` through `--brand-coral-700`

Brand Turquoise:
- `--brand-turquoise-50`, `--brand-turquoise-100`, `--brand-turquoise-200`, `--brand-turquoise-300`, `--brand-turquoise-700`

Message Colors:
- `--message-green-50/100/500/700`
- `--message-blue-100/200/600/700`
- `--message-red-50/100/500/700`

**Semantic Tokens (use these for consistency):**
- `--color-background-primary` - Main backgrounds
- `--color-background-secondary` - Secondary backgrounds
- `--color-background-tertiary` - Tertiary backgrounds
- `--color-text-primary` - Primary text
- `--color-text-secondary` - Secondary text
- `--color-text-tertiary` - Placeholders
- `--color-border-primary` - Main borders
- `--color-border-secondary` - Hover/active borders
- `--color-brand-primary` - Main brand color (#E74241)
- `--color-brand-hover` - Brand hover state
- `--color-brand-light` - Brand light backgrounds
- `--color-brand-border` - Brand borders

**Usage Guidelines:**
- Always use CSS variables (e.g., `var(--color-brand-primary)`) instead of hex codes
- Primary actions use `--color-brand-primary`
- All focus rings use `--color-brand-primary`
- Borders use `--color-border-primary` and `--color-border-secondary`
- Text hierarchy uses `--color-text-primary/secondary/tertiary`
- Panel headers use `--color-brand-primary` background with white text
- Variable cards use `--color-brand-light` with `--color-brand-border`

**Example Usage:**
```css
/* Good - using semantic tokens */
.button {
  background: var(--color-brand-primary);
  color: var(--neutral-white);
  border: 1px solid var(--color-brand-border);
}

.button:hover {
  background: var(--color-brand-hover);
}

/* Also good - using specific palette colors */
.alert {
  background: var(--message-red-50);
  color: var(--message-red-700);
}

/* Bad - hardcoded colors */
.button {
  background: #E74241;  /* DON'T DO THIS */
}
```

## Key Implementation Details

### Template Rendering Flow
1. User pastes template → `setTemplateContent()`
2. Auto-detect type → `detectTemplateType()`
3. Extract variables → `extractHandlebarsVariables()`
4. Generate dummy data → `generateDummyData()`
5. Compile & render → `Handlebars.compile()` → `template(data)`
6. Display in appropriate preview component

### Security Considerations
- Email iframe uses `sandbox="allow-same-origin"` to prevent XSS
- No external script execution
- All data processing happens client-side
- No sensitive data storage

### Responsive Design
- Mobile: Stacked vertical layout
- Desktop: Side-by-side editor/preview
- Device mockups scale appropriately
- Max width constraints for readability

## Future Enhancement Ideas

- Custom dummy data editing
- Template saving/loading from local storage
- Export rendered HTML/text
- Copy to clipboard functionality
- Multiple template tabs
- Variable highlighting in editor
- Real-time collaboration
- Template validation warnings
- More device mockups (tablets, web)

## Maintenance Notes

- Sample templates in `public/` for quick testing
- All components are client-side (`'use client'`)
- No API routes needed (pure client-side rendering)
- Handlebars helpers registered globally in `handlebarsRenderer.ts`
- Type detection logic in `templateUtils.ts` can be extended for more formats
