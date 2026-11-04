import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export interface LaunchChecklistItem {
  title: string;
  description: string;
  done: boolean;
}

interface LaunchChecklistProps {
  items: LaunchChecklistItem[];
}

export const LaunchChecklist: React.FC<LaunchChecklistProps> = ({ items }) => {
  const completed = items.filter((item) => item.done).length;

  return (
    <section className="bg-surface-card rounded-2xl p-5 sm:p-6 shadow-subtle border border-border-subtle">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="text-base font-bold text-text-primary">Launch checklist</h2>
        <span className="text-[10px] font-bold text-primary bg-teal-wash px-2 py-0.5 rounded border border-primary/20">
          {completed} of {items.length} done
        </span>
      </div>

      <ul className="space-y-2.5">
        {items.map((item) => (
          <li
            key={item.title}
            className={`flex items-start gap-2.5 p-3 rounded-lg border ${
              item.done
                ? 'bg-teal-wash border-primary/20'
                : 'bg-surface-container-lowest border-border-subtle/60'
            }`}
          >
            {item.done ? (
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-5 h-5 text-text-muted shrink-0 mt-0.5" />
            )}
            <div className="min-w-0">
              <p
                className={`text-xs font-semibold ${
                  item.done ? 'text-text-primary' : 'text-text-secondary'
                }`}
              >
                {item.title}
              </p>
              <p className="text-[11px] text-text-muted mt-0.5 leading-snug">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
