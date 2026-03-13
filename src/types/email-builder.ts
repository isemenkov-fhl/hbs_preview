// Email Builder Type Definitions

export type EmailComponentType =
  | 'spacer'
  | 'logo'
  | 'image'
  | 'heading'
  | 'textblock'
  | 'button'
  | 'qrcode'
  | 'divider'
  | 'socialfooter'
  | 'faqblock';

// Base component interface
export interface EmailComponent {
  id: string;
  type: EmailComponentType;
  props: ComponentProps;
}

// Union type for all component props
export type ComponentProps =
  | SpacerProps
  | LogoProps
  | ImageProps
  | HeadingProps
  | TextBlockProps
  | ButtonProps
  | QRCodeProps
  | DividerProps
  | SocialFooterProps
  | FAQBlockProps;

// Individual component prop interfaces
export interface SpacerProps {
  height: number; // in pixels
}

export interface LogoProps {
  width: number; // in pixels
  link: string;
  alignment: 'left' | 'center' | 'right';
  imageUrl: string;
}

export interface ImageProps {
  width: number | 'full'; // pixels or 'full' for 100%
  imageUrl: string;
  alt: string;
  link?: string;
  alignment: 'left' | 'center' | 'right';
}

export interface HeadingProps {
  text: string;
  fontSize: number; // in pixels
  color: string;
  alignment: 'left' | 'center' | 'right';
  fontWeight: 'normal' | 'bold';
}

export interface TextBlockProps {
  content: string; // HTML content with Handlebars support
  fontSize: number;
  color: string;
  alignment: 'left' | 'center' | 'right';
  lineHeight: number;
}

export interface ButtonProps {
  text: string;
  link: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  fontSize: number;
  paddingVertical: number;
  paddingHorizontal: number;
  alignment: 'left' | 'center' | 'right';
}

export interface QRCodeProps {
  variable: string; // Handlebars variable for QR code URL
  width: number;
  alignment: 'left' | 'center' | 'right';
}

export interface DividerProps {
  height: number; // thickness in pixels
  color: string;
  marginTop: number;
  marginBottom: number;
}

export interface SocialFooterProps {
  icons: SocialIcon[];
  iconSize: number;
  spacing: number;
  alignment: 'left' | 'center' | 'right';
}

export interface SocialIcon {
  platform: 'facebook' | 'instagram' | 'telegram' | 'twitter' | 'linkedin';
  url: string;
  iconUrl: string;
}

export interface FAQBlockProps {
  items: FAQItem[];
  fontSize: number;
  linkColor: string;
}

export interface FAQItem {
  question: string;
  answer: string; // Can include HTML and Handlebars
}

// Email template structure
export interface EmailTemplate {
  id: string;
  name: string;
  components: EmailComponent[];
  metadata: EmailTemplateMetadata;
}

export interface EmailTemplateMetadata {
  createdAt: string;
  updatedAt: string;
  description?: string;
  category?: string;
}

// Builder state
export interface BuilderState {
  currentTemplate: EmailTemplate | null;
  selectedComponentId: string | null;
  isDragging: boolean;
  history: EmailTemplate[];
  historyIndex: number;
}

// Component registry for drag and drop
export interface ComponentDefinition {
  type: EmailComponentType;
  label: string;
  icon: string; // SVG string or icon name
  category: 'layout' | 'content' | 'composite';
  defaultProps: ComponentProps;
  description: string;
}
