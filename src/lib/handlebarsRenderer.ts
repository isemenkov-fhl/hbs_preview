import Handlebars from 'handlebars';

// Register common helpers
Handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

Handlebars.registerHelper('ne', function(a, b) {
  return a !== b;
});

Handlebars.registerHelper('gt', function(a, b) {
  return a > b;
});

Handlebars.registerHelper('lt', function(a, b) {
  return a < b;
});

Handlebars.registerHelper('and', function(...args) {
  // Remove the options object from args
  const values = args.slice(0, -1);
  return values.every(Boolean);
});

Handlebars.registerHelper('or', function(...args) {
  // Remove the options object from args
  const values = args.slice(0, -1);
  return values.some(Boolean);
});

/**
 * Renders a Handlebars template with the provided data
 */
export function renderTemplate(templateContent: string, data: Record<string, any>): string {
  try {
    const template = Handlebars.compile(templateContent);
    return template(data);
  } catch (error) {
    console.error('Error rendering template:', error);
    return `Error rendering template: ${error instanceof Error ? error.message : String(error)}`;
  }
}
