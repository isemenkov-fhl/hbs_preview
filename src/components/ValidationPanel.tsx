'use client';

import { ValidationResult, ValidationSeverity } from '@/lib/templateValidator';

interface ValidationPanelProps {
  results: ValidationResult[];
}

function getSeverityIcon(severity: ValidationSeverity): string {
  switch (severity) {
    case 'error':
      return '❌';
    case 'warning':
      return '⚠️';
    case 'info':
      return 'ℹ️';
  }
}

function getSeverityColor(severity: ValidationSeverity): string {
  switch (severity) {
    case 'error':
      return 'var(--message-red-500)';
    case 'warning':
      return '#F59E0B'; // Amber-500
    case 'info':
      return 'var(--message-blue-600)';
  }
}

function getSeverityBgColor(severity: ValidationSeverity): string {
  switch (severity) {
    case 'error':
      return 'var(--message-red-50)';
    case 'warning':
      return '#FEF3C7'; // Amber-50
    case 'info':
      return 'var(--message-blue-100)';
  }
}

function getSeverityBorderColor(severity: ValidationSeverity): string {
  switch (severity) {
    case 'error':
      return 'var(--message-red-100)';
    case 'warning':
      return '#FDE68A'; // Amber-100
    case 'info':
      return 'var(--message-blue-200)';
  }
}

export default function ValidationPanel({ results }: ValidationPanelProps) {
  if (results.length === 0) {
    return null;
  }

  const errors = results.filter(r => r.severity === 'error');
  const warnings = results.filter(r => r.severity === 'warning');
  const infos = results.filter(r => r.severity === 'info');

  return (
    <div className="border border-[var(--color-border-primary)] rounded-lg overflow-hidden bg-[var(--color-background-primary)]">
      {/* Header */}
      <div className="bg-[var(--color-brand-primary)] text-white px-4 py-2 flex items-center justify-between">
        <h3 className="font-semibold">Validation</h3>
        <div className="flex items-center gap-3 text-sm">
          {errors.length > 0 && (
            <span className="flex items-center gap-1">
              <span>❌</span>
              <span>{errors.length}</span>
            </span>
          )}
          {warnings.length > 0 && (
            <span className="flex items-center gap-1">
              <span>⚠️</span>
              <span>{warnings.length}</span>
            </span>
          )}
          {infos.length > 0 && (
            <span className="flex items-center gap-1">
              <span>ℹ️</span>
              <span>{infos.length}</span>
            </span>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
        {results.map((result, index) => (
          <div
            key={`${result.ruleId}-${index}`}
            className="p-3 rounded-lg border"
            style={{
              backgroundColor: getSeverityBgColor(result.severity),
              borderColor: getSeverityBorderColor(result.severity)
            }}
          >
            <div className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0">
                {getSeverityIcon(result.severity)}
              </span>
              <div className="flex-1 min-w-0">
                <p
                  className="font-medium text-sm"
                  style={{ color: getSeverityColor(result.severity) }}
                >
                  {result.message}
                </p>
                {result.details && (
                  <p className="text-xs mt-1 text-[var(--color-text-secondary)]">
                    {result.details}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
