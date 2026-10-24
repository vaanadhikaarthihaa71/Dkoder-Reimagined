import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'yellow' | 'purple' | 'green' | 'amber' | 'slate' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'md',
  className = '',
  icon
}) => {
  const variantStyles = {
    yellow: 'bg-[#FFF8D6] text-[#211B2B] border border-[#FFD84D]/60',
    purple: 'bg-[#F3EDFF] text-[#5425A8] border border-[#E8E2EF]',
    green: 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]',
    amber: 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]',
    slate: 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]',
    outline: 'bg-white text-[#6F687A] border border-[#E8E2EF]'
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md gap-1 font-medium',
    md: 'text-xs px-2.5 py-0.5 rounded-lg gap-1.5 font-medium'
  };

  return (
    <span className={`inline-flex items-center tracking-normal ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
