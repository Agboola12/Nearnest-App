import React from 'react';
import { CheckCircle2, Circle, Clock3, RotateCcw } from 'lucide-react';
import { PaymentStatus } from '../../../types';

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

const paymentStyles: Record<
  PaymentStatus,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    classes: string;
  }
> = {
  paid: {
    label: 'Paid',
    icon: CheckCircle2,
    classes: 'bg-status-confirmed-bg text-status-confirmed-text',
  },
  pending: {
    label: 'Payment pending',
    icon: Clock3,
    classes: 'bg-status-pending-bg text-status-pending-text',
  },
  refunded: {
    label: 'Refunded',
    icon: RotateCcw,
    classes: 'bg-surface-container text-text-secondary',
  },
  not_charged: {
    label: 'Not charged',
    icon: Circle,
    classes: 'bg-surface-container-low text-text-muted border border-border-subtle',
  },
};

export const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({
  status,
  className = '',
}) => {
  const style = paymentStyles[status];
  const Icon = style.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${style.classes} ${className}`}
    >
      <Icon className="w-3 h-3" />
      {style.label}
    </span>
  );
};
