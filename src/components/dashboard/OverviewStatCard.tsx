import React from 'react';
import { 
  Activity, 
  Flame, 
  Trophy, 
  Target, 
  ChevronRight 
} from 'lucide-react';

interface OverviewStatCardProps {
  onNavigateToPractice: () => void;
  onNavigateToLeaderboard: () => void;
  onNavigateToBundles: () => void;
}

export const OverviewStatCard: React.FC<OverviewStatCardProps> = ({
  onNavigateToPractice,
  onNavigateToLeaderboard,
  onNavigateToBundles
}) => {
  const cards = [
    {
      id: 'activity',
      title: "Today's Activity",
      value: 'Not active yet',
      helperText: 'Practice to log today',
      icon: Activity,
      iconColor: 'text-[#5425A8]',
      iconBg: 'bg-[#F1E9FF]',
      badgeColor: 'bg-[#FAF8FD] text-[#706879] border-[#E8E2EF]',
      onClick: onNavigateToPractice,
      actionText: 'Start practice'
    },
    {
      id: 'streak',
      title: 'Solve Streak',
      value: '0 days',
      helperText: 'Solve a problem to start',
      icon: Flame,
      iconColor: 'text-[#F59E0B]',
      iconBg: 'bg-[#FEF3C7]',
      badgeColor: 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]',
      onClick: onNavigateToPractice,
      actionText: 'Start streak'
    },
    {
      id: 'leaderboard',
      title: 'Leaderboard',
      value: 'Unranked',
      helperText: 'Earn XP to get ranked',
      icon: Trophy,
      iconColor: 'text-[#5425A8]',
      iconBg: 'bg-[#F1E9FF]',
      badgeColor: 'bg-[#FAF8FD] text-[#706879] border-[#E8E2EF]',
      onClick: onNavigateToLeaderboard,
      actionText: 'View ranks'
    },
    {
      id: 'focus',
      title: 'Focus Topic',
      value: 'All on track',
      helperText: 'No weak topics right now',
      icon: Target,
      iconColor: 'text-[#059669]',
      iconBg: 'bg-emerald-50',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      onClick: onNavigateToBundles,
      actionText: 'Explore topics'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            onClick={card.onClick}
            className="bg-white rounded-2xl border border-[#E8E2EF] p-4 flex flex-col justify-between hover:border-[#5425A8]/50 hover:shadow-sm transition-all duration-200 cursor-pointer group shadow-2xs"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.onClick();
              }
            }}
          >
            <div>
              {/* Header: Icon & Category Title */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-[#706879]">
                  {card.title}
                </span>
                <div className={`w-8 h-8 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0 border border-black/5`}>
                  <IconComponent className={`w-4 h-4 ${card.iconColor}`} />
                </div>
              </div>

              {/* Status Value */}
              <div className="my-1">
                <span className="text-lg font-bold text-[#211B2B] tracking-tight">
                  {card.value}
                </span>
              </div>

              {/* Helper text */}
              <p className="text-xs text-[#706879] mt-0.5 leading-relaxed">
                {card.helperText}
              </p>
            </div>

            {/* Bottom interaction cue */}
            <div className="mt-3 pt-2.5 border-t border-[#E8E2EF] flex items-center justify-between text-[11px] text-[#5425A8] font-semibold opacity-90 group-hover:opacity-100">
              <span>{card.actionText}</span>
              <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
