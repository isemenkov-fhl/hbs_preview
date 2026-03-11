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
