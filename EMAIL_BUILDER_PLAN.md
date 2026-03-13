# Email Builder Feature Plan

## Project Overview
Adding a drag-and-drop email builder to the Handlebars template preview application. This will allow users to visually construct emails using reusable components extracted from 170 existing email templates.

## Email Template Analysis Summary

Analyzed 170 email templates and identified clear structural patterns. All emails follow a consistent table-based layout structure that's compatible with various email clients (including Outlook).

### Common Components Identified:

1. **Header Section (Logo)**
   - Centered Salmon logo (200px width)
   - Standard 45px top/bottom padding
   - Linked to https://salmon.ph/

2. **Hero Image** (optional)
   - Full-width images (540px)
   - Used in promotional/collection emails
   - Often custom per email type

3. **Title/Headline** (optional)
   - Centered, bold text
   - Font size: 26px
   - Color: #222222

4. **Body Text Content**
   - Left or center-aligned
   - Font: Helvetica Neue, Arial fallback
   - Font size: 20px
   - Color: #444444
   - Line height: 1.4
   - Supports Handlebars variables

5. **Call-to-Action Button**
   - Rounded button (16px border-radius)
   - Background: #f05a5a (Salmon brand color)
   - White text, bold (19px)
   - Padding: 20px 42px
   - Outlook-compatible with VML fallback

6. **QR Code** (in some templates)
   - 300-400px width
   - Centered
   - Dynamic via `{{{qr_payment_link}}}`

7. **FAQ/Additional Info Section**
   - Text blocks with Q&A format
   - Links styled with coral color
   - Border-bottom underline style

8. **Social Media Footer**
   - Facebook, Instagram, Telegram icons
   - 34px × 34px icons
   - 9px horizontal padding between icons
   - Links to social profiles

9. **Spacer Elements**
   - 30px height spacers for vertical spacing

## Proposed Email Builder Architecture
1
### 1. Component Library

Reusable, draggable components:

**Structural Components:**
- `Spacer` - Adjustable height spacing (default: 30px)
- `Container` - Wrapper with customizable padding

**Content Components:**
- `Logo` - Salmon logo (editable link, size, alignment)
- `Image` - Full-width or custom-width images (upload or URL)
- `Heading` - Title text (font size, color, alignment, bold/normal)
- `TextBlock` - Rich text editor with Handlebars support
- `Button` - CTA button (text, link, colors, padding, border-radius)
- `QRCode` - Dynamic QR code (variable input)
- `Divider` - Horizontal line separator

**Composite Components:**
- `SocialFooter` - Pre-configured social media icons
- `FAQBlock` - Q&A section with styled links

### 2. Tech Stack

For the drag-and-drop builder:
- **DnD Library**: `@dnd-kit/core` (modern, accessible, works great with React)
- **Email Rendering**: Continue using table-based HTML for email client compatibility
- **WYSIWYG Editor**: `react-quill` or `tiptap` for rich text editing
- **Email Preview**: `react-frame-component` for iframe sandboxing

### 3. Project Structure

```
src/
├── app/
│   ├── builder/
│   │   └── page.tsx                  # Email builder page
│   ├── preview/
│   │   └── page.tsx                  # Current preview (renamed)
│   └── layout.tsx                    # Updated with navigation
│
├── components/
│   ├── builder/
│   │   ├── BuilderCanvas.tsx         # Main drag-and-drop area
│   │   ├── ComponentSidebar.tsx      # Draggable components palette
│   │   ├── PropertiesPanel.tsx       # Edit component properties
│   │   ├── BuilderToolbar.tsx        # Actions (save, preview, export)
│   │   └── ComponentWrapper.tsx      # Wrapper with drag handles
│   │
│   ├── email-components/             # Draggable email components
│   │   ├── Logo.tsx
│   │   ├── Image.tsx
│   │   ├── Heading.tsx
│   │   ├── TextBlock.tsx
│   │   ├── Button.tsx
│   │   ├── QRCode.tsx
│   │   ├── Spacer.tsx
│   │   ├── SocialFooter.tsx
│   │   └── FAQBlock.tsx
│   │
│   └── shared/
│       └── Navigation.tsx            # App navigation (Preview/Builder)
│
├── lib/
│   ├── email-builder/
│   │   ├── emailRenderer.ts          # Converts components to HTML tables
│   │   ├── componentRegistry.ts      # Component definitions
│   │   └── templates.ts              # Pre-built template library
│   └── storage/
│       └── templateStorage.ts        # Local storage for saved templates
```

### 4. Data Structure

Each email will be stored as a JSON structure:

```typescript
interface EmailTemplate {
  id: string;
  name: string;
  components: EmailComponent[];
  metadata: {
    createdAt: string;
    updatedAt: string;
  };
}

interface EmailComponent {
  id: string;
  type: 'logo' | 'image' | 'heading' | 'textblock' | 'button' | 'qrcode' | 'spacer' | 'socialfooter' | 'faqblock';
  props: Record<string, any>;
}

// Example:
{
  id: 'template-1',
  name: 'Payment Reminder',
  components: [
    { id: '1', type: 'spacer', props: { height: 30 } },
    { id: '2', type: 'logo', props: { width: 200, link: 'https://salmon.ph' } },
    { id: '3', type: 'heading', props: { text: 'Payment Reminder', fontSize: 26, align: 'center' } },
    { id: '4', type: 'textblock', props: { content: 'Hi {{first_name}}...' } },
    { id: '5', type: 'button', props: { text: 'Make Payment', link: '{{payment_link}}', bgColor: '#f05a5a' } },
    { id: '6', type: 'socialfooter', props: {} }
  ]
}
```

### 5. UI/UX Layout Design

**Email Builder Page:**

```
┌─────────────────────────────────────────────────────────────────┐
│ [Preview] [Email Builder]  <-- Navigation tabs                 │
├─────────────────────────────────────────────────────────────────┤
│ Email Builder                                                   │
├────────────┬──────────────────────────────┬─────────────────────┤
│            │                              │                     │
│ Components │   Canvas (Email Preview)     │  Properties Panel   │
│  Sidebar   │                              │                     │
│            │  ┌────────────────────────┐  │  Component: Button  │
│ [+ Logo]   │  │  [Logo - drag handle]  │  │                     │
│ [+ Image]  │  └────────────────────────┘  │  Text: [        ]   │
│ [+ Heading]│                              │  Link: [        ]   │
│ [+ Text]   │  ┌────────────────────────┐  │  BG Color: [    ]   │
│ [+ Button] │  │ [Heading - drag handle]│  │  Border Radius: []  │
│ [+ QRCode] │  │   Payment Reminder      │  │                     │
│ [+ Spacer] │  └────────────────────────┘  │  [Delete Component] │
│ [+ Social] │                              │                     │
│ [+ FAQ]    │  ┌────────────────────────┐  │                     │
│            │  │ [Button - drag handle] │  │                     │
│            │  │    Make Payment         │  │                     │
│ Templates: │  └────────────────────────┘  │                     │
│ [Blank]    │                              │                     │
│ [Payment]  │  ┌────────────────────────┐  │                     │
│ [Birthday] │  │[Social Footer - drag]  │  │                     │
│ [Alert]    │  └────────────────────────┘  │                     │
│            │                              │                     │
├────────────┴──────────────────────────────┴─────────────────────┤
│ [Save Template] [Export HTML] [Preview in Browser] [Test Email] │
└─────────────────────────────────────────────────────────────────┘
```

**Key UX Features:**

1. **Component Sidebar** (Left, 250px)
   - Draggable component buttons with icons
   - Template library at bottom
   - Categorized sections (Content, Layout, Composite)

2. **Canvas** (Center, flexible width)
   - Live email preview (600px max-width, centered)
   - Drag handles on hover
   - Click to select component
   - Drop zones with visual indicators
   - Real-time rendering

3. **Properties Panel** (Right, 300px)
   - Context-sensitive based on selected component
   - Forms for editing props
   - Color pickers, sliders, text inputs
   - Delete button
   - Variable suggestion dropdown for Handlebars

4. **Toolbar** (Bottom/Top)
   - Save template (to local storage/backend)
   - Export HTML (download .hbs file)
   - Preview in new tab
   - Send test email

### 6. Navigation Structure

Update the root layout to include navigation:

```typescript
// app/layout.tsx - Add navigation links
<nav>
  <Link href="/preview">Template Preview</Link>
  <Link href="/builder">Email Builder</Link>
</nav>
```

Rename current homepage:
- `/` or `/preview` → Current template preview functionality
- `/builder` → New email builder

## Implementation Phases

### Phase 1: Foundation (Week 1)
1. Install dependencies (`@dnd-kit/core`, `@dnd-kit/sortable`, `react-quill`)
2. Restructure routing (create `/preview` and `/builder` pages)
3. Add navigation component
4. Set up basic builder layout (3-column)

### Phase 2: Core Components (Week 2)
1. Create email component library (Logo, Image, Heading, TextBlock, Button, Spacer)
2. Implement component registry
3. Build HTML table renderer for email output
4. Test email client compatibility

### Phase 3: Drag & Drop (Week 3)
1. Implement drag-and-drop canvas with @dnd-kit
2. Add component sidebar with draggable items
3. Create drop zones and visual feedback
4. Implement component reordering

### Phase 4: Properties & Customization (Week 4)
1. Build properties panel
2. Create form controls for each component type
3. Add Handlebars variable autocomplete
4. Implement component deletion

### Phase 5: Templates & Export (Week 5)
1. Create pre-built templates from existing emails
2. Add template selector
3. Implement save/load from local storage
4. Build HTML export functionality
5. Add preview in new window

### Phase 6: Advanced Features (Future)
- Image upload integration
- Backend API for template storage
- Send test email functionality
- Version history
- Undo/redo
- Component duplication
- Responsive preview toggle

## Design System Integration

All builder UI will use existing Salmon color palette:
- Primary actions: `var(--color-brand-primary)` (#E74241)
- Sidebar background: `var(--color-background-secondary)` (#F4F4F3)
- Borders: `var(--color-border-primary)` (#E3E3E3)
- Selected component: `var(--color-brand-light)` (#FFECEF)
- Text: `var(--color-text-primary)` (#231F20)

## Key Implementation Notes

1. **Email Compatibility**: Continue using table-based layouts for email rendering
2. **Handlebars Support**: All text components support `{{variable}}` syntax
3. **Responsive**: Builder UI responsive, but email output fixed 600px (email standard)
4. **Accessibility**: Proper ARIA labels for drag-and-drop
5. **Performance**: Debounce property changes, lazy load templates
6. **Type Safety**: Full TypeScript coverage for component props
