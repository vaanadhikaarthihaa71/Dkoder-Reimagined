import React, { useState } from 'react';
import { 
  GraduationCap, 
  BarChart2, 
  ShieldCheck, 
  FileCheck2, 
  Download, 
  Calendar, 
  Layers, 
  Award
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { useToast } from '../context/ToastContext';

interface CollegesPageProps {
  onNavigate: (path: string) => void;
}

export const CollegesPage: React.FC<CollegesPageProps> = ({ onNavigate }) => {
  const { addToast } = useToast();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({
    name: '',
    designation: 'Placement Officer (TPO)',
    college: '',
    email: '',
    phone: '',
    batchSize: '500 - 1000 Students'
  });

  const handleDownloadBrochure = () => {
    addToast({
      type: 'success',
      title: 'Brochure Download Initiated',
      description: 'DKODER Institutional Placement Suite 2026 PDF has been saved.'
    });
  };

  const handleScheduleDemo = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Demo Session Scheduled',
      description: `Thank you ${demoForm.name}. Our Institutional Academic Director will contact you.`
    });
    setIsDemoModalOpen(false);
  };

  return (
    <div className="py-12 bg-[#FAF8FD] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <div className="text-xs text-[#6F687A] font-medium flex items-center gap-1.5">
          <button onClick={() => onNavigate('/')} className="hover:text-[#211B2B]">Home</button>
          <span>/</span>
          <span className="text-[#211B2B] font-semibold">For Colleges & Universities</span>
        </div>

        {/* Hero Section */}
        <div className="bg-white border border-[#E8E2EF] rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E9FF] text-[#5425A8] text-xs font-semibold uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Institutional Placement LMS</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#211B2B] tracking-tight leading-tight">
                Data-driven placement readiness for <span className="text-[#5425A8]">engineering institutions</span>
              </h1>

              <p className="text-sm sm:text-base text-[#706879] leading-relaxed">
                Equip your Training & Placement (TnP) department with cohort practice telemetry, automated diagnostic tests, and customized recruiter mock patterns.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsDemoModalOpen(true)}
                  rightIcon={<Calendar className="w-4 h-4" />}
                >
                  Schedule Demo Session
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  onClick={handleDownloadBrochure}
                  leftIcon={<Download className="w-4 h-4 text-[#5425A8]" />}
                >
                  Download LMS Brochure
                </Button>

                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => onNavigate('/partner-mou')}
                  className="text-[#5425A8] font-semibold"
                >
                  Apply for Campus MOU →
                </Button>
              </div>
            </div>

            {/* Right 3D Visual Column */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#FAF8FD] to-[#F1E9FF] border border-[#E8E2EF] p-2 shadow-xs group">
              <div className="relative rounded-xl overflow-hidden bg-white">
                <img
                  src="/images/institutional-analytics.jpg"
                  alt="DKODER Institutional Analytics Dashboard"
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-lg border border-[#E8E2EF] text-[10px] font-bold text-[#5425A8] shadow-xs">
                  Campus TnP Suite
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-[#E8E2EF] p-5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#F3EDFF] text-[#5425A8] flex items-center justify-center mb-3">
              <BarChart2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#211B2B] mb-1">
              Cohort Telemetry
            </h3>
            <p className="text-xs text-[#6F687A] leading-relaxed">
              Track student streaks, daily solving counts, and syllabus weak spots at the department level.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#E8E2EF] p-5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#FFF8D6] text-[#211B2B] flex items-center justify-center mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#211B2B] mb-1">
              Custom Mock Drives
            </h3>
            <p className="text-xs text-[#6F687A] leading-relaxed">
              Replicate campus hiring drives (TCS Digital, InfyTQ, Accenture) with custom cutoffs and timers.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#E8E2EF] p-5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#F3EDFF] text-[#5425A8] flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#211B2B] mb-1">
              Code Proctoring
            </h3>
            <p className="text-xs text-[#6F687A] leading-relaxed">
              Browser-tab tracking, automated similarity analysis, and test case telemetry ensure authentic ability.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#E8E2EF] p-5 shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-[#FFF8D6] text-[#211B2B] flex items-center justify-center mb-3">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#211B2B] mb-1">
              Placement Outcomes
            </h3>
            <p className="text-xs text-[#6F687A] leading-relaxed">
              Improve institutional median salary packages with structured daily habit reinforcement.
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl border border-[#E8E2EF] p-6 shadow-xs">
          <h2 className="text-xl font-bold text-[#211B2B] mb-4 text-center">
            Traditional Placement Training vs. DKODER Platform
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF8FD] text-[#6F687A] uppercase text-[10px] font-semibold border-b border-[#E8E2EF]">
                <tr>
                  <th className="p-3">Capability</th>
                  <th className="p-3">Legacy Crash Courses</th>
                  <th className="p-3 text-[#5425A8] font-bold">DKODER Placement LMS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2EF] font-medium text-[#211B2B]">
                <tr>
                  <td className="p-3 font-semibold">Daily Student Practice</td>
                  <td className="p-3 text-[#6F687A]">Static PDFs / zero metrics</td>
                  <td className="p-3 bg-[#F3EDFF]/50 font-semibold text-[#5425A8]">Browser compiler & daily habit tracking</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Company Tagging</td>
                  <td className="p-3 text-[#6F687A]">Generic textbook problems</td>
                  <td className="p-3 bg-[#F3EDFF]/50 font-semibold text-[#5425A8]">Tagged by TCS, Infosys, Accenture with package ranges</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">TPO Visibility</td>
                  <td className="p-3 text-[#6F687A]">Manual attendance sheets</td>
                  <td className="p-3 bg-[#F3EDFF]/50 font-semibold text-[#5425A8]">Real-time cohort dashboards & weak-topic telemetry</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Demo Modal */}
      {isDemoModalOpen && (
        <Modal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
          title="Schedule Institutional Demo"
          subtitle="Exclusive for TPOs, Principals, and HODs"
          maxWidth="md"
        >
          <form onSubmit={handleScheduleDemo} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#211B2B] mb-1">
                Placement Officer Name *
              </label>
              <input
                type="text"
                required
                placeholder="Prof. Ramesh Sundaram"
                value={demoForm.name}
                onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] text-xs text-[#211B2B] focus:outline-none focus:ring-1 focus:ring-[#5425A8]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#211B2B] mb-1">
                College / Institution Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Coimbatore Institute of Technology"
                value={demoForm.college}
                onChange={(e) => setDemoForm({ ...demoForm, college: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] text-xs text-[#211B2B] focus:outline-none focus:ring-1 focus:ring-[#5425A8]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#211B2B] mb-1">
                  Official Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="placement@college.edu.in"
                  value={demoForm.email}
                  onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] text-xs text-[#211B2B] focus:outline-none focus:ring-1 focus:ring-[#5425A8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#211B2B] mb-1">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={demoForm.phone}
                  onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] text-xs text-[#211B2B] focus:outline-none focus:ring-1 focus:ring-[#5425A8]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E8E2EF]">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsDemoModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                Confirm Demo Request
              </Button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
