/**
 * Template validation engine
 * Based on validation rules from NotificationTest.kt
 */

export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationResult {
  severity: ValidationSeverity;
  message: string;
  details?: string;
  ruleId: string;
}

export type TemplateType = 'email' | 'sms' | 'push' | 'viber';

/**
 * SMS length calculation for multi-part messages
 * - Single SMS: up to 160 characters (but we use 159 to be safe)
 * - Multi-part SMS: 153 characters per message (7 chars reserved for concatenation headers)
 */
function calculateSMSParts(length: number): { parts: number; isMultiPart: boolean } {
  if (length === 0) {
    return { parts: 0, isMultiPart: false };
  }

  if (length <= 160) {
    return { parts: 1, isMultiPart: false };
  }

  // Multi-part: each part is 153 characters
  const parts = Math.ceil(length / 153);
  return { parts, isMultiPart: true };
}

/**
 * Validate SMS templates
 */
function validateSMS(content: string): ValidationResult[] {
  const results: ValidationResult[] = [];

  // Rule 1: ASCII-only characters
  const nonAsciiChars: string[] = [];
  const positions: number[] = [];

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (char.charCodeAt(0) > 127) {
      if (!nonAsciiChars.includes(char)) {
        nonAsciiChars.push(char);
        positions.push(i);
      }
    }
  }

  if (nonAsciiChars.length > 0) {
    results.push({
      severity: 'error',
      message: 'SMS templates must contain only ASCII characters',
      details: `Found non-ASCII characters: ${nonAsciiChars.map(c => `'${c}'`).join(', ')}`,
      ruleId: 'sms-ascii-only'
    });
  }

  // Rule 2: Triple braces only (checked in validateNonEmailTemplates)

  // Rule 3: SMS length warning - exclude variable placeholders from count
  // Remove all {{{ }}} patterns to get the static text length
  const staticText = content.replace(/\{\{\{[^}]+\}\}\}/g, '');
  const length = staticText.length;
  const { parts, isMultiPart } = calculateSMSParts(length);

  if (isMultiPart) {
    results.push({
      severity: 'warning',
      message: `Long SMS: will be sent as ${parts} messages`,
      details: `Current length: ${length} characters. Messages over 160 characters are split into ${parts} parts (153 chars each), which may cost extra.`,
      ruleId: 'sms-multipart'
    });
  } else if (length > 0) {
    // Info: show current length
    results.push({
      severity: 'info',
      message: `SMS length: ${length}/160 characters`,
      details: 'Single SMS message',
      ruleId: 'sms-length-info'
    });
  }

  return results;
}

/**
 * Validate non-email templates (push, sms, viber, voice)
 * Must use only triple braces {{{ }}}
 */
function validateNonEmailTemplates(content: string, type: TemplateType): ValidationResult[] {
  const results: ValidationResult[] = [];

  // Check for EXACTLY 3 braces on each side
  // Find all sequences of { and } with adjacent word characters
  const openingBracesPattern = /\{{1,}/g;
  const closingBracesPattern = /\}{1,}/g;

  const invalidPatterns: string[] = [];

  // Check opening braces - must be exactly {{{
  const openMatches = Array.from(content.matchAll(openingBracesPattern));
  for (const match of openMatches) {
    const braceCount = match[0].length;
    if (braceCount !== 3) {
      const startIndex = match.index!;
      const endIndex = Math.min(startIndex + 15, content.length);
      const example = content.substring(startIndex, endIndex);
      invalidPatterns.push(`${braceCount} opening brace(s): "${example}"`);
      break; // Just show first error
    }
  }

  // Check closing braces - must be exactly }}}
  const closeMatches = Array.from(content.matchAll(closingBracesPattern));
  for (const match of closeMatches) {
    const braceCount = match[0].length;
    if (braceCount !== 3) {
      const startIndex = Math.max(0, match.index! - 10);
      const endIndex = Math.min(match.index! + braceCount + 5, content.length);
      const example = content.substring(startIndex, endIndex);
      invalidPatterns.push(`${braceCount} closing brace(s): "${example}"`);
      break; // Just show first error
    }
  }

  if (invalidPatterns.length > 0) {
    results.push({
      severity: 'error',
      message: `${type.toUpperCase()} templates must use exactly 3 braces {{{ }}}`,
      details: `Found incorrect brace count: ${invalidPatterns[0]}. All variables must use exactly {{{ }}} (3 braces on each side).`,
      ruleId: 'non-email-triple-braces'
    });
  }

  return results;
}

/**
 * Validate email templates
 * - Text content: must use double braces {{ }}
 * - Links (href): must use triple braces {{{ }}}
 * - Links must start with http/https/mailto or contain variables
 */
function validateEmail(content: string): ValidationResult[] {
  const results: ValidationResult[] = [];

  // Parse HTML
  if (typeof window === 'undefined') {
    // Server-side: skip HTML parsing
    return results;
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    // Rule 1: Check text content for correct brace count (must be exactly 2)
    const textContent = doc.body.textContent || '';

    // Check for braces in text
    const textOpenBraces = Array.from(textContent.matchAll(/\{{1,}/g));
    const textCloseBraces = Array.from(textContent.matchAll(/\}{1,}/g));

    for (const match of textOpenBraces) {
      const braceCount = match[0].length;
      if (braceCount !== 2) {
        results.push({
          severity: 'warning',
          message: 'Email text should use exactly 2 braces {{ }}',
          details: `Found ${braceCount} opening brace(s) in text content. Email text variables must use exactly {{ }} (2 braces on each side).`,
          ruleId: 'email-text-double-braces'
        });
        break;
      }
    }

    for (const match of textCloseBraces) {
      const braceCount = match[0].length;
      if (braceCount !== 2) {
        results.push({
          severity: 'warning',
          message: 'Email text should use exactly 2 braces {{ }}',
          details: `Found ${braceCount} closing brace(s) in text content. Email text variables must use exactly {{ }} (2 braces on each side).`,
          ruleId: 'email-text-double-braces'
        });
        break;
      }
    }

    // Rule 2: Links must use {{{ }}} and start with valid protocol
    const links = doc.querySelectorAll('a[href]');
    const invalidLinks: string[] = [];

    links.forEach((link) => {
      const href = link.getAttribute('href') || '';

      // Skip valid protocols
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) {
        return;
      }

      // Check if href contains variables with correct brace count
      const hrefOpenBraces = Array.from(href.matchAll(/\{{1,}/g));
      const hrefCloseBraces = Array.from(href.matchAll(/\}{1,}/g));

      // Check opening braces in href - must be exactly 3
      for (const match of hrefOpenBraces) {
        const braceCount = match[0].length;
        if (braceCount !== 3) {
          results.push({
            severity: 'error',
            message: 'Email links must use exactly 3 braces {{{ }}}',
            details: `Link "${href}" has ${braceCount} opening brace(s). URLs must use exactly {{{ }}} (3 braces on each side) for proper escaping.`,
            ruleId: 'email-href-triple-braces'
          });
          break;
        }
      }

      // Check closing braces in href - must be exactly 3
      for (const match of hrefCloseBraces) {
        const braceCount = match[0].length;
        if (braceCount !== 3) {
          results.push({
            severity: 'error',
            message: 'Email links must use exactly 3 braces {{{ }}}',
            details: `Link "${href}" has ${braceCount} closing brace(s). URLs must use exactly {{{ }}} (3 braces on each side) for proper escaping.`,
            ruleId: 'email-href-triple-braces'
          });
          break;
        }
      }

      // If it doesn't start with valid protocol and has no variables, warn
      if (hrefOpenBraces.length === 0 && hrefCloseBraces.length === 0) {
        invalidLinks.push(href);
      }
    });

    if (invalidLinks.length > 0) {
      results.push({
        severity: 'warning',
        message: 'Links should start with http://, https://, or mailto:',
        details: `Found ${invalidLinks.length} link(s) without valid protocol: ${invalidLinks.slice(0, 3).join(', ')}${invalidLinks.length > 3 ? '...' : ''}`,
        ruleId: 'email-link-protocol'
      });
    }

  } catch (error) {
    // If HTML parsing fails, skip validation
    results.push({
      severity: 'info',
      message: 'Unable to validate email HTML structure',
      details: 'HTML parsing failed. Ensure template is valid HTML.',
      ruleId: 'email-parse-error'
    });
  }

  return results;
}

/**
 * Main validation function
 */
export function validateTemplate(
  content: string,
  type: TemplateType
): ValidationResult[] {
  if (!content.trim()) {
    return [];
  }

  const results: ValidationResult[] = [];

  switch (type) {
    case 'email':
      results.push(...validateEmail(content));
      break;

    case 'sms':
      results.push(...validateSMS(content));
      results.push(...validateNonEmailTemplates(content, type));
      break;

    case 'push':
    case 'viber':
      results.push(...validateNonEmailTemplates(content, type));
      break;
  }

  return results;
}

/**
 * Get validation summary
 */
export function getValidationSummary(results: ValidationResult[]): {
  errorCount: number;
  warningCount: number;
  infoCount: number;
  isValid: boolean;
} {
  const errorCount = results.filter(r => r.severity === 'error').length;
  const warningCount = results.filter(r => r.severity === 'warning').length;
  const infoCount = results.filter(r => r.severity === 'info').length;

  return {
    errorCount,
    warningCount,
    infoCount,
    isValid: errorCount === 0
  };
}
