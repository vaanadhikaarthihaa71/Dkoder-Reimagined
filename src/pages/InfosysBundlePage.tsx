import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/common/Button';

interface InfosysBundlePageProps {
  onNavigate: (path: string) => void;
}

export const InfosysBundlePage: React.FC<InfosysBundlePageProps> = ({ onNavigate }) => {
  const roles = [
    { title: 'System Engineer (SE)', ctc: '3.6 LPA', focus: 'Foundational Aptitude & Core Coding' },
    { title: 'Digital Specialist Engineer (DSE)', ctc: '6.5 LPA', focus: 'Advanced DSA, SQL & Optimization' },
    { title: 'Specialist Programmer (SP)', ctc: '9.5 LPA', focus: 'Hard Dynamic Programming, Trees & Graphs' }
  ];

  const syllabus = [
    { section: 'Hands-on Coding Round (180 Mins)', items: ['2 Medium/Hard algorithmic problems', 'Language support: Python 3 or Java', 'Strict boundary & time limit enforcement'] },
    { section: 'DBMS & Advanced SQL', items: ['Second highest salary subqueries', 'Complex INNER & LEFT OUTER JOINs', 'Window functions & Partition queries'] },
    { section: 'Object-Oriented Programming (OOP)', items: ['Polymorphism, Inheritance & Abstraction', 'Exception handling & custom exceptions', 'Collections Framework & memory management'] }
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
          <span className="text-[#211B2B] font-semibold">Infosys Preparation Bundle</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white border border-[#E8E2EF] rounded-2xl p-8 sm:p-10 shadow-xs">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EDFF] text-[#5425A8] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Infosys InfyTQ & SP Prep</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#211B2B] tracking-tight">
              Infosys InfyTQ & Specialist <span className="text-[#5425A8]">Master Bundle</span>
            </h1>

            <p className="text-sm sm:text-base text-[#6F687A] leading-relaxed">
              Curated preparation for Infosys national recruitment tests. Crack 3.6 LPA System Engineer up to 9.5 LPA Specialist Programmer roles.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => onNavigate('/')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Practise Infosys Questions
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

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-[#E8E2EF] p-5 shadow-xs">
              <div className="text-[11px] font-semibold text-[#5425A8] uppercase mb-1">
                Role Tier {idx + 1}
              </div>
              <h3 className="text-base font-bold text-[#211B2B]">{role.title}</h3>
              <div className="text-xl font-extrabold text-[#211B2B] my-1.5">{role.ctc}</div>
              <p className="text-xs text-[#6F687A] leading-relaxed">{role.focus}</p>
            </div>
          ))}
        </div>

        {/* Syllabus Breakdown */}
        <div className="bg-white rounded-2xl border border-[#E8E2EF] p-6 shadow-xs">
          <h2 className="text-lg font-bold text-[#211B2B] mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#5425A8]" />
            <span>InfyTQ Exam Curriculum Breakdown</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {syllabus.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#FAF8FD] border border-[#E8E2EF]">
                <h4 className="font-semibold text-xs text-[#211B2B] mb-2">{s.section}</h4>
                <ul className="space-y-1.5 text-xs text-[#6F687A]">
                  {s.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-1.5">
                      <Check className="w-3 h-3 text-[#5425A8] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
