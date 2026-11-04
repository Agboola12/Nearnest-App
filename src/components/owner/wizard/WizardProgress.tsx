import React from 'react';
import { Check } from 'lucide-react';

interface WizardProgressProps {
  steps: string[];
  currentStep: number;
}

export const WizardProgress: React.FC<WizardProgressProps> = ({ steps, currentStep }) => {
  const percent = Math.round((currentStep / steps.length) * 100);

  return (
    <div className="bg-surface-card rounded-2xl shadow-subtle border border-border-subtle p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-text-muted">
            Listing creation progress
          </span>
          <span className="px-2 py-0.5 rounded-full bg-teal-wash text-primary text-[11px] font-bold">
            Step {currentStep} of {steps.length}
          </span>
        </div>
        <span className="text-[11px] font-bold text-primary bg-teal-wash/70 px-2.5 py-0.5 rounded-md">
          {percent}% Complete
        </span>
      </div>

      <div
        className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-6 p-0.5"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={`Listing creation progress: ${percent}% complete`}
      >
        <div
          className="bg-primary h-full rounded-full transition-all duration-500 shadow-sm"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isComplete = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={label}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border transition-colors ${
                isCurrent
                  ? 'bg-teal-wash border-primary/30 shadow-sm'
                  : isComplete
                    ? 'bg-surface-container-low/70 border-border-subtle/50'
                    : 'bg-surface-container-lowest border-border-subtle/40 opacity-70'
              }`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${
                  isComplete
                    ? 'bg-status-confirmed-bg text-status-confirmed-text'
                    : isCurrent
                      ? 'bg-primary text-white'
                      : 'bg-surface-container-high text-text-muted'
                }`}
              >
                {isComplete ? <Check className="w-3 h-3" strokeWidth={3} /> : stepNumber}
              </span>
              <span
                className={`text-[11px] font-semibold truncate ${
                  isCurrent
                    ? 'text-primary'
                    : isComplete
                      ? 'text-text-secondary'
                      : 'text-text-muted'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
