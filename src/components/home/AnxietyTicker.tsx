import React, { useState, useRef, useEffect } from 'react';
import { 
  HelpCircle, 
  ChevronRight, 
  Check, 
  Lightbulb, 
  ArrowRight
} from 'lucide-react';
import { ANXIETY_QUERIES } from '../../data/mockData';
import { AnxietyQuery } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface AnxietyTickerProps {
  onNavigateToTrack: (track: string) => void;
}

export const AnxietyTicker: React.FC<AnxietyTickerProps> = ({ onNavigateToTrack }) => {
  const [selectedQuery, setSelectedQuery] = useState<AnxietyQuery | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const handleInteraction = () => {
          if (video) {
            video.muted = true;
            video.play().catch(() => {});
          }
        };
        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true });
      });
    }
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E8E2EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EDFF] text-[#5425A8] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Preparation Guidance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#211B2B] tracking-tight">
            Preparing under pressure? <span className="text-[#5425A8]">Quick-start solutions</span>
          </h2>
          <p className="mt-2 text-sm text-[#6F687A]">
            Select any question to see actionable, step-by-step guidance for your placement preparation.
          </p>
        </div>

        {/* Image-Rich Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Storytelling Feature Card (Span 4) */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#FAF8FD] to-[#F1E9FF] rounded-3xl border border-[#E8E2EF] p-4 sm:p-5 shadow-sm space-y-4">
            
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-xs border border-[#E8E2EF]">
              <video
                ref={videoRef}
                src="/assets/aistudio/Robot_helps_student_study_1080p_20261024101615_gwr_video_mvp_692759a7.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                disablePictureInPicture
                disableRemotePlayback
                aria-label="Student finding placement clarity with DKODER Robot Mascot"
                className="w-full h-auto aspect-video object-cover block pointer-events-none select-none"
              />
              <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#E8E2EF] text-[10px] font-bold text-[#5425A8] shadow-xs">
                💡 Clarity First
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-[#211B2B]">
                From Interview Confusion to Confident Coding
              </h3>
              <p className="text-xs text-[#706879] leading-relaxed">
                Whether you're starting from zero in your 3rd year or aiming for a 20+ LPA Super Dream role, structured modular practice removes the guesswork.
              </p>
            </div>

            {/* Interactive Topic Pills */}
            <div className="pt-2 border-t border-[#E8E2EF]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#706879] mb-2">
                Core Placement Pillars:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Data Structures', 'Algorithmic Speed', 'SQL & DBMS', 'Quantitative Aptitude', 'Company Mock Rounds'].map((pill) => (
                  <span
                    key={pill}
                    className="text-[11px] px-2.5 py-0.5 rounded-md bg-white text-[#211B2B] border border-[#E8E2EF] font-medium shadow-2xs"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: 6 Interactive Question Cards (Span 8) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ANXIETY_QUERIES.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedQuery(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedQuery(item);
                  }
                }}
                className="text-left p-3.5 sm:p-4 rounded-xl bg-white border border-[#E8E2EF] hover:border-[#5425A8] hover:bg-[#FAF8FD] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#5425A8] cursor-pointer flex flex-col justify-between group shadow-2xs hover:shadow-xs"
                aria-haspopup="dialog"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold text-[#5425A8] bg-[#F1E9FF] px-2 py-0.5 rounded-md border border-purple-100">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-[#706879] group-hover:text-[#5425A8] transition-colors flex items-center gap-0.5">
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-[#211B2B] group-hover:text-[#5425A8] transition-colors leading-snug">
                    {item.question}
                  </h3>
                </div>

                <div className="mt-3 pt-2 border-t border-[#E8E2EF] flex items-center justify-between text-[11px] text-[#706879]">
                  <span className="font-medium text-[#5425A8] group-hover:underline">Action Roadmap →</span>
                  <span>{item.recommendedTrack}</span>
                </div>
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Expandable Advice Modal */}
      {selectedQuery && (
        <Modal
          isOpen={!!selectedQuery}
          onClose={() => setSelectedQuery(null)}
          title={selectedQuery.question}
          subtitle={`Recommended Track: ${selectedQuery.recommendedTrack}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            
            {/* Short Answer */}
            <div className="p-3.5 rounded-xl bg-[#F3EDFF] border border-[#E8E2EF]">
              <div className="text-[11px] font-semibold text-[#5425A8] uppercase tracking-wider mb-1">
                Summary:
              </div>
              <p className="text-sm text-[#211B2B] font-medium leading-relaxed">
                {selectedQuery.shortAnswer}
              </p>
            </div>

            {/* Steps */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#6F687A] mb-2">
                Action Steps:
              </div>
              <div className="space-y-2">
                {selectedQuery.detailedSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FAF8FD] border border-[#E8E2EF] text-xs text-[#211B2B]">
                    <span className="w-4 h-4 rounded-full bg-[#FFD84D] text-[#211B2B] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tip */}
            <div className="p-3 rounded-xl bg-[#FFF8D6] border border-[#FFD84D]/40 text-xs text-[#211B2B] flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-[#92400E] shrink-0 mt-0.5" />
              <div>
                <strong>DKODER Tip:</strong> {selectedQuery.proTip}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E8E2EF]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedQuery(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const track = selectedQuery.recommendedTrack;
                  setSelectedQuery(null);
                  onNavigateToTrack(track);
                }}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Start Practicing
              </Button>
            </div>

          </div>
        </Modal>
      )}

    </section>
  );
};
