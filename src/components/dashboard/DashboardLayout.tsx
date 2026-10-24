import React, { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';

interface DashboardLayoutProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  onNavigate: (path: string) => void;
  studentName?: string;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeTab,
  onSelectTab,
  onNavigate,
  studentName = 'Karthik',
  children
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FAF8FD]">
      
      {/* Persistent Left Sidebar on Desktop & Drawer on Mobile */}
      <DashboardSidebar
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        onNavigateToSubscription={() => onNavigate('/student/subscription')}
        onNavigateHome={() => onNavigate('/')}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Dashboard Header */}
        <DashboardHeader
          studentName={studentName}
          onOpenMobileDrawer={() => setIsMobileOpen(true)}
          onNavigate={onNavigate}
          onSelectTab={onSelectTab}
        />

        {/* Dashboard View Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
          {children}
        </main>

        {/* Compact In-App Footer */}
        <footer className="px-6 py-3 border-t border-[#E8E2EF] bg-white text-[11px] text-[#706879] flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            DKODER Student Placement Learning Management System • Connected as <strong className="text-[#211B2B]">{studentName}</strong>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('/')} className="hover:text-[#5425A8] transition-colors">Main Site</button>
            <span>•</span>
            <button onClick={() => onNavigate('/student/subscription')} className="hover:text-[#5425A8] transition-colors">Plan Details</button>
            <span>•</span>
            <span className="text-[#059669] font-medium">Session Active</span>
          </div>
        </footer>

      </div>

    </div>
  );
};
