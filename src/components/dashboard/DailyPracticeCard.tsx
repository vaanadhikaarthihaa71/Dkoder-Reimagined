import React from 'react';
import { 
  Code2, 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../common/Button';

interface DailyPracticeCardProps {
  onSolveCodingProblem: () => void;
  onExploreMCQ?: () => void;
}

export const DailyPracticeCard: React.FC<DailyPracticeCardProps> = ({
  onSolveCodingProblem,
  onExploreMCQ
}) => {
  return (
    <div className="bg-gradient-to-tr from-[#FAF8FD] via-white to-[#F1E9FF] rounded-2xl border border-[#E8E2EF] p-5 sm:p-6 shadow-2xs relative overflow-hidden">
      
      {/* Decorative Brand Background Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FFD84D]/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 right-40 w-40 h-40 bg-[#5425A8]/10 rounded-full blur-xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        
        {/* Left: Heading, Supporting Text & Action */}
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EDFF] text-[#5425A8] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD84D] fill-[#FFD84D]" />
            <span>Today's Placement Assignment</span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#211B2B] tracking-tight">
              Nothing assigned
            </h2>
            <p className="text-xs sm:text-sm text-[#706879] mt-1 leading-relaxed">
              Daily practice keeps your streak going. Pick a curated problem from the placement vault to build algorithmic intuition.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              variant="primary"
              size="md"
              onClick={onSolveCodingProblem}
              leftIcon={<Code2 className="w-4 h-4" />}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Solve a coding problem
            </Button>

            {onExploreMCQ && (
              <Button
                variant="outline"
                size="md"
                onClick={onExploreMCQ}
                leftIcon={<CheckCircle2 className="w-4 h-4 text-[#5425A8]" />}
              >
                Try Technical MCQ
              </Button>
            )}
          </div>
        </div>

        {/* Right: Coding Illustration with Yellow & Purple Mascot */}
        <div className="shrink-0 self-center md:self-auto">
          <div className="relative group">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-[#FAF8FD] border-2 border-[#5425A8]/20 shadow-sm p-1.5 transition-transform duration-300 group-hover:scale-102">
              <div className="w-full h-full rounded-xl overflow-hidden bg-[#211B2B] flex flex-col justify-between p-2.5 relative">
                
                {/* Code Window Simulation Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#FFD84D]" />
                    <span className="w-2 h-2 rounded-full bg-[#5425A8]" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[9px] font-mono text-[#FFD84D]">solution.py</span>
                </div>

                {/* Mascot Avatar in Code Window */}
                <div className="my-auto flex items-center justify-center">
                  <img
                    src="/images/mascot-avatar.jpg"
                    alt="DKODER Robot Mascot"
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#FFD84D]"
                  />
                </div>

                {/* Status text */}
                <div className="text-[9px] text-[#E8E2EF] font-mono text-center">
                  Ready to compile
                </div>
              </div>
            </div>

            {/* Floating Tag */}
            <div className="absolute -bottom-2 -left-2 bg-white px-2.5 py-1 rounded-lg border border-[#E8E2EF] text-[10px] font-bold text-[#5425A8] shadow-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              <span>In-browser IDE</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
