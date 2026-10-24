import React from 'react';
import { 
  Sparkles, 
  Laptop, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/common/Button';

interface AccentureBundlePageProps {
  onNavigate: (path: string) => void;
}

export const AccentureBundlePage: React.FC<AccentureBundlePageProps> = ({ onNavigate }) => {
  const assessmentStages = [
    {
      stage: 'Stage 1: Cognitive Assessment (50 Qs / 50 Mins)',
      topics: ['English Language Ability', 'Critical Thinking & Problem Solving', 'Abstract Reasoning & Patterns'],
      passing: 'Sectional cutoff required to advance'
    },
    {
      stage: 'Stage 2: Technical Assessment (40 Qs / 40 Mins)',
      topics: ['Common Applications & MS Tech', 'Pseudo-code logic evaluation', 'Cloud, Security & Network basics'],
      passing: 'Mandatory technical threshold'
    },
    {
      stage: 'Stage 3: Coding Assessment (2 Qs / 45 Mins)',
      topics: ['Array manipulation & Two Pointers', 'String operations', 'Time complexity O(N) constraints'],
      passing: 'Determines ASE vs FSE differential offer'
    }
  ];

  return (
    <div className="py-12 bg-[#FAF8FD] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <div className="text-xs text-[#6F687A] font-medium flex items-center gap-1.5">
          <button onClick={() => onNavigate('/')} className="hover:text-[#211B2B]">Home</button>
          <span>/</span>
          <span className="text-[#6F687A]">Bundles</span>
          <span>/</span>
          <span className="text-[#211B2B] font-semibold">Accenture Fast-Track Bundle</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white border border-[#E8E2EF] rounded-2xl p-8 sm:p-10 shadow-xs">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EDFF] text-[#5425A8] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Accenture National Recruitment Drive</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#211B2B] tracking-tight">
              Accenture Cognitive & Coding <span className="text-[#5425A8]">Accelerator</span>
            </h1>

            <p className="text-sm sm:text-base text-[#6F687A] leading-relaxed">
              Targeted practice for Accenture Associate Software Engineer (ASE 4.5 LPA) and Full Stack Engineer (FSE 6.5 LPA) campus hiring rounds.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('/')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Practise Accenture Questions
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={() => onNavigate('/student/subscription')}
              >
                View Subscription Plans
              </Button>
            </div>
          </div>
        </div>

        {/* Roles Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-[#E8E2EF] p-5 shadow-xs">
            <span className="text-[11px] font-semibold text-[#5425A8] uppercase">Core Entry Track</span>
            <h3 className="text-base font-bold text-[#211B2B] mt-0.5">Associate Software Engineer (ASE)</h3>
            <div className="text-2xl font-extrabold text-[#211B2B] my-1.5">₹4.5 LPA</div>
            <p className="text-xs text-[#6F687A] leading-relaxed">
              Cognitive + Technical assessments and solving primary test cases in the coding round.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#FFD84D] p-5 shadow-xs">
            <span className="text-[11px] font-semibold text-[#92400E] uppercase">Differential Offer Track</span>
            <h3 className="text-base font-bold text-[#211B2B] mt-0.5">Full Stack Engineer (FSE)</h3>
            <div className="text-2xl font-extrabold text-[#211B2B] my-1.5">₹6.5 LPA</div>
            <p className="text-xs text-[#6F687A] leading-relaxed">
              Awarded to high scorers clearing both coding challenges with optimal Big-O complexity.
            </p>
          </div>
        </div>

        {/* 3 Stages */}
        <div className="bg-white rounded-2xl border border-[#E8E2EF] p-6 shadow-xs">
          <h2 className="text-lg font-bold text-[#211B2B] mb-4 flex items-center gap-2">
            <Laptop className="w-5 h-5 text-[#5425A8]" />
            <span>Recruitment Process Stages</span>
          </h2>

          <div className="space-y-3">
            {assessmentStages.map((stage, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#FAF8FD] border border-[#E8E2EF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-xs text-[#211B2B] mb-1">{stage.stage}</h4>
                  <div className="flex flex-wrap gap-1.5 text-xs text-[#6F687A]">
                    {stage.topics.map((t, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-white border border-[#E8E2EF] text-[10px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#5425A8] bg-[#F3EDFF] px-2.5 py-1 rounded-lg shrink-0">
                  {stage.passing}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
