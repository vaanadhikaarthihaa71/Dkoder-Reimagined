import React from 'react';
import { RECRUITER_LOGOS } from '../../data/mockData';
import { Building2 } from 'lucide-react';

export const RecruiterMarquee: React.FC = () => {
  const doubleLogos = [...RECRUITER_LOGOS, ...RECRUITER_LOGOS];

  return (
    <section className="bg-[#FAF8FD] py-8 border-b border-[#E8E2EF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3">
        <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-[#5425A8]">
          <Building2 className="w-4 h-4" />
          <span>Verified Recruiter Patterns</span>
        </div>
      </div>

      {/* Marquee Track with soft gradient edge fades */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FAF8FD] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FAF8FD] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-4 items-center py-1">
          {doubleLogos.map((recruiter, idx) => (
            <div
              key={`${recruiter.name}-${idx}`}
              className="flex items-center gap-2.5 bg-white border border-[#E8E2EF] rounded-xl px-4 py-2 shrink-0 transition-colors hover:border-[#5425A8] shadow-xs cursor-default"
            >
              <span className="w-6 h-6 rounded-md bg-[#F3EDFF] text-[#5425A8] font-bold text-xs flex items-center justify-center">
                {recruiter.name.substring(0, 2).toUpperCase()}
              </span>
              <div>
                <span className="font-semibold text-xs text-[#211B2B] block">
                  {recruiter.name}
                </span>
                <span className="text-[10px] text-[#6F687A] block">
                  {recruiter.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
