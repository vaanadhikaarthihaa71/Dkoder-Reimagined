import React, { useState } from 'react';
import { 
  GraduationCap, 
  BarChart3, 
  Users2, 
  CheckCircle2, 
  Target, 
  Layers, 
  ArrowRight,
  Info,
  ChevronDown
} from 'lucide-react';
import { Button } from '../common/Button';

interface InstitutionalBannerProps {
  onNavigate: (path: string) => void;
}

export const InstitutionalBanner: React.FC<InstitutionalBannerProps> = ({ onNavigate }) => {
  const [activeCohort, setActiveCohort] = useState<'all' | 'cse' | 'ece'>('all');
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8FD] border-b border-[#E8E2EF]" id="institutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E9FF] text-[#5425A8] text-xs font-semibold uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Institutional TnP Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#211B2B] tracking-tight">
            Batch-level visibility for <span className="text-[#5425A8]">Placement Cells & Deans</span>
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#706879]">
            Real-time readiness dashboards and diagnostic tests across engineering cohorts.
          </p>
        </div>

        {/* 3D Institutional Analytics Hero Art Banner */}
        <div className="mb-8 relative rounded-3xl overflow-hidden bg-gradient-to-tr from-[#FAF8FD] to-[#F1E9FF] border border-[#E8E2EF] p-2.5 shadow-md group">
          <div className="relative rounded-2xl overflow-hidden bg-white shadow-xs">
            <img
              src="/images/institutional-analytics.jpg"
              alt="DKODER 3D Institutional College Placement Analytics Suite and Campus Dashboard"
              className="w-full max-h-[380px] object-cover group-hover:scale-101 transition-transform duration-500"
              loading="lazy"
            />
            
            {/* Floating Overlay Badge: Verified Cohort Placement */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#E8E2EF] text-xs font-bold text-[#211B2B] shadow-md flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#5425A8] text-white flex items-center justify-center font-bold text-xs">
                86%
              </div>
              <div>
                <div className="text-[11px] font-bold text-[#211B2B]">Diagnostic Cohort Placed</div>
                <div className="text-[9px] text-[#706879]">Sample verification benchmark</div>
              </div>
            </div>

            <div className="absolute top-3 right-3 bg-[#5425A8]/90 text-white backdrop-blur-md px-3 py-1 rounded-xl text-xs font-semibold shadow-md border border-purple-400/30 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-[#FFD84D]" />
              <span>Multi-Department TnP LMS</span>
            </div>
          </div>
        </div>

        {/* 4 Metric Cards with Tooltip Explanations */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          
          <div className="bg-white border border-[#E8E2EF] rounded-xl p-4 shadow-2xs group relative">
            <div className="flex items-center justify-between text-[#6F687A] text-xs mb-1">
              <span className="font-medium">Batch Activity</span>
              <div className="flex items-center gap-1">
                <Users2 className="w-4 h-4 text-[#5425A8]" />
                <span title="Weekly active students solving mock problems" className="cursor-help text-[#948B9E] hover:text-[#5425A8]">
                  <Info className="w-3 h-3" />
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-[#211B2B]">94.2%</div>
            <div className="text-[11px] text-[#706879] mt-0.5">Active Weekly Solvers</div>
          </div>

          <div className="bg-white border border-[#E8E2EF] rounded-xl p-4 shadow-2xs group relative">
            <div className="flex items-center justify-between text-[#6F687A] text-xs mb-1">
              <span className="font-medium">Test Completion</span>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-[#5425A8]" />
                <span title="Students clearing timed placement drive cutoffs" className="cursor-help text-[#948B9E] hover:text-[#5425A8]">
                  <Info className="w-3 h-3" />
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-[#211B2B]">88.5%</div>
            <div className="text-[11px] text-[#706879] mt-0.5">Mock Cutoffs Met</div>
          </div>

          <div className="bg-white border border-[#E8E2EF] rounded-xl p-4 shadow-2xs group relative">
            <div className="flex items-center justify-between text-[#6F687A] text-xs mb-1">
              <span className="font-medium">Topic Coverage</span>
              <div className="flex items-center gap-1">
                <Layers className="w-4 h-4 text-[#5425A8]" />
                <span title="Core syllabus coverage across DSA, DBMS, and Aptitude" className="cursor-help text-[#948B9E] hover:text-[#5425A8]">
                  <Info className="w-3 h-3" />
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-[#211B2B]">96.0%</div>
            <div className="text-[11px] text-[#706879] mt-0.5">Core Syllabus Covered</div>
          </div>

          <div className="bg-white border border-[#E8E2EF] rounded-xl p-4 shadow-2xs group relative">
            <div className="flex items-center justify-between text-[#6F687A] text-xs mb-1">
              <span className="font-medium">Readiness Index</span>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-[#5425A8]" />
                <span title="Students pre-qualified for recruiter assessment drives" className="cursor-help text-[#948B9E] hover:text-[#5425A8]">
                  <Info className="w-3 h-3" />
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-[#211B2B]">81.4%</div>
            <div className="text-[11px] text-[#706879] mt-0.5">Drive Qualified</div>
          </div>

        </div>

        {/* Dashboard Preview Box with Collapsible Breakdown */}
        <div className="bg-white rounded-2xl border border-[#E8E2EF] p-4 sm:p-5 shadow-xs">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E2EF]">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#211B2B]">
                Departmental Qualification by Package Tier
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#F1E9FF] text-[#5425A8]">
                Sample Cohort Data
              </span>
            </div>

            {/* Toggle Accordion */}
            <button
              type="button"
              onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5425A8] hover:text-[#401B85] px-2.5 py-1 rounded-lg hover:bg-[#FAF8FD] transition-colors cursor-pointer"
            >
              <span>{isBreakdownOpen ? 'Hide Tier Breakdown' : 'View Tier Breakdown'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isBreakdownOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Expandable Breakdown Content */}
          {isBreakdownOpen && (
            <div className="py-4 space-y-4 animate-fadeIn">
              {/* Branch Filter */}
              <div className="flex items-center gap-1 bg-[#FAF8FD] p-1 rounded-lg border border-[#E8E2EF] text-xs w-fit">
                <button
                  onClick={() => setActiveCohort('all')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeCohort === 'all' ? 'bg-[#5425A8] text-white font-semibold' : 'text-[#706879] hover:text-[#211B2B]'
                  }`}
                >
                  All Branches
                </button>
                <button
                  onClick={() => setActiveCohort('cse')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeCohort === 'cse' ? 'bg-[#5425A8] text-white font-semibold' : 'text-[#706879] hover:text-[#211B2B]'
                  }`}
                >
                  CSE & IT
                </button>
                <button
                  onClick={() => setActiveCohort('ece')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeCohort === 'ece' ? 'bg-[#5425A8] text-white font-semibold' : 'text-[#706879] hover:text-[#211B2B]'
                  }`}
                >
                  Circuit Branches
                </button>
              </div>

              {/* Clean Progress Bars */}
              <div className="space-y-3 pt-1">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-[#211B2B]">Service Tier (TCS Ninja, Infosys SE, Accenture ASE)</span>
                    <span className="font-semibold text-[#5425A8]">92%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E8E2EF] overflow-hidden">
                    <div className="h-full bg-[#5425A8] rounded-full transition-all duration-300" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-[#211B2B]">Differential Tier (TCS Digital, Infosys SP, 7-12 LPA)</span>
                    <span className="font-semibold text-[#5425A8]">68%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E8E2EF] overflow-hidden">
                    <div className="h-full bg-[#5425A8] rounded-full transition-all duration-300" style={{ width: '68%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-[#211B2B]">Super Dream (Product SDE & FinTech 18+ LPA)</span>
                    <span className="font-semibold text-[#5425A8]">34%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#E8E2EF] overflow-hidden">
                    <div className="h-full bg-[#FFD84D] rounded-full transition-all duration-300" style={{ width: '34%' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer CTAs */}
          <div className="pt-3.5 mt-2 border-t border-[#E8E2EF] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-[#706879]">
              Deploy institutional LMS benchmarks for your campus placement drive.
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('/colleges')}
              >
                For Colleges
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigate('/partner-mou')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Apply for Campus MOU
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
