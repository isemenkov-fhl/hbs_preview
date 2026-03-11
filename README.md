# Handlebars Template Preview

A production-ready web application for previewing Handlebars templates across different message types: **Email**, **SMS**, **Push Notifications**, and **Viber**.

## Features

- **Real-time Preview**: Instantly see how your templates render as you type
- **Multi-Format Support**:
  - Email templates with full HTML rendering
  - SMS messages with iOS and Android device mockups
  - Push notifications with iOS and Android lock screen previews
  - Viber messages with branded UI mockups
- **Auto-Detection**: Automatically detects template type based on content
- **Handlebars Support**: Full support for Handlebars syntax with common helpers
- **Dummy Data Generation**: Automatically fills in template variables with realistic dummy data
- **Dark Mode**: Native dark mode support
- **Responsive Design**: Works on all screen sizes

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## Usage

1. **Paste Your Template**: Copy your Handlebars template into the editor
2. **Auto-Detection**: The app automatically detects if it's an email (HTML) or text-based template
3. **Switch Types**: Use the tabs to preview your template as Email, SMS, Push, or Viber
4. **Push Notifications**: When in Push mode, a title field appears for the notification title
5. **Load Samples**: Click the sample buttons to load pre-made templates

## Handlebars Support

The app supports standard Handlebars syntax including:

- Variables: `{{userName}}`
- Conditionals: `{{#if condition}}...{{/if}}`
- Loops: `{{#each items}}...{{/each}}`
- Helpers: `eq`, `ne`, `gt`, `lt`, `and`, `or`

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or manually:

```bash
vercel
```

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Handlebars** - Template rendering

## License

MIT
