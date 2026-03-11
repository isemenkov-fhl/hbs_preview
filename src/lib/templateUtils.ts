export type TemplateType = 'email' | 'sms' | 'push' | 'viber';

/**
 * Detects the template type based on content
 * - Email: Contains HTML tags
 * - Push: Contains title (detected separately in UI)
 * - SMS: Default fallback
 * - Viber: User selectable
 */
export function detectTemplateType(content: string): TemplateType {
  // Check for HTML tags - if present, it's likely an email
  const htmlTagRegex = /<\s*([a-z][a-z0-9]*)\b[^>]*>/i;

  if (htmlTagRegex.test(content)) {
    return 'email';
  }

  // Default to SMS for plain text
  return 'sms';
}

/**
 * Extracts Handlebars variables from template content
 * Matches patterns like {{variableName}}, {{{variableName}}}, {{#if condition}}, etc.
 */
export function extractHandlebarsVariables(content: string): string[] {
  // Match both double {{}} and triple {{{}}} braces
  const variableRegex = /\{\{\{?([^#\/}][^}]*?)\}?\}\}/g;
  const variables = new Set<string>();
  let match;

  while ((match = variableRegex.exec(content)) !== null) {
    // Extract the variable name, removing any helpers or modifiers
    const variable = match[1].trim().split(' ')[0];
    if (variable && !variable.startsWith('#') && !variable.startsWith('/')) {
      variables.add(variable);
    }
  }

  return Array.from(variables);
}

/**
 * Generates dummy data for common variable names
 */
export function generateDummyData(variables: string[]): Record<string, any> {
  const dummyData: Record<string, any> = {};

  const commonMappings: Record<string, any> = {
    userName: 'John Doe',
    userEmail: 'john.doe@example.com',
    email: 'john.doe@example.com',
    name: 'John Doe',
    firstName: 'John',
    first_name: 'John',
    lastName: 'Doe',
    last_name: 'Doe',
    code: '123456',
    verificationCode: '123456',
    otp: '123456',
    count: 3,
    orderId: 'ORD-2024-12345',
    trackingUrl: 'https://tracking.example.com/ABC123',
    trackingNumber: 'ABC123XYZ789',
    deliveryDate: 'March 15, 2024',
    actionUrl: 'https://example.com/action',
    supportEmail: 'support@example.com',
    companyName: 'Example Inc.',
    companyAddress: '123 Main St, San Francisco, CA 94105',
    currentYear: new Date().getFullYear().toString(),
    expiryMinutes: '10',
    productName: 'Premium Subscription',
    price: '$29.99',
    amount: '$29.99',
    total: '$29.99',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    // Additional mappings for examples
    information_type: 'mobile number',
    old_value: '+63 917 123 4567',
    new_value: '+63 917 987 6543',
    allowed_time: 'March 11, 2024 8:30 PM',
  };

  variables.forEach(variable => {
    if (commonMappings[variable]) {
      dummyData[variable] = commonMappings[variable];
    } else {
      // Generate generic dummy data based on variable name patterns
      if (variable.toLowerCase().includes('email')) {
        dummyData[variable] = 'user@example.com';
      } else if (variable.toLowerCase().includes('name')) {
        dummyData[variable] = 'Sample Name';
      } else if (variable.toLowerCase().includes('url') || variable.toLowerCase().includes('link')) {
        dummyData[variable] = 'https://example.com';
      } else if (variable.toLowerCase().includes('date')) {
        dummyData[variable] = new Date().toLocaleDateString();
      } else if (variable.toLowerCase().includes('time')) {
        dummyData[variable] = new Date().toLocaleTimeString();
      } else if (variable.toLowerCase().includes('count') || variable.toLowerCase().includes('number')) {
        dummyData[variable] = '5';
      } else {
        dummyData[variable] = `[${variable}]`;
      }
    }
  });

  return dummyData;
}
