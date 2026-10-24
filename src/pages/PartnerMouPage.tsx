import React, { useState } from 'react';
import { 
  FileCheck2, 
  CheckCircle2, 
  Download, 
  Send, 
  Phone, 
  Mail 
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { useToast } from '../context/ToastContext';
import { COMPANY_INFO } from '../data/mockData';

interface PartnerMouPageProps {
  onNavigate: (path: string) => void;
}

export const PartnerMouPage: React.FC<PartnerMouPageProps> = ({ onNavigate }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    institutionName: '',
    nirfRank: 'Within Top 100',
    state: 'Tamil Nadu',
    contactPerson: '',
    designation: 'Head of Training & Placement',
    officialEmail: '',
    contactPhone: '',
    targetBatch: '2026 Graduating Batch',
    studentCount: '850',
    needsLabIntegration: true,
    needsAptitudeDrills: true
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.institutionName || !formData.contactPerson || !formData.officialEmail || !formData.contactPhone) {
      addToast({
        type: 'error',
        title: 'Missing Required Fields',
        description: 'Please complete all required fields.'
      });
      return;
    }

    const generatedId = 'MOU-' + Math.floor(100000 + Math.random() * 900000);
    setSubmissionId(generatedId);
    setIsSuccessModalOpen(true);
    addToast({
      type: 'success',
      title: 'MOU Application Submitted',
      description: `Reference ID: ${generatedId}`
    });
  };

  const handleDownloadReceipt = () => {
    addToast({
      type: 'success',
      title: 'Acknowledgement Slip Saved',
      description: `MOU Reference Slip for ${formData.institutionName} downloaded.`
    });
  };

  return (
    <div className="py-12 bg-[#FAF8FD] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <div className="text-xs text-[#6F687A] font-medium flex items-center gap-1.5">
          <button onClick={() => onNavigate('/')} className="hover:text-[#211B2B]">Home</button>
          <span>/</span>
          <span className="text-[#211B2B] font-semibold">Institutional Partner MOU</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EDFF] text-[#5425A8] text-xs font-semibold uppercase tracking-wider mb-2">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Academic Partnership Framework</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#211B2B] tracking-tight">
            Apply for Institutional <span className="text-[#5425A8]">Placement MOU</span>
          </h1>
          <p className="mt-2 text-sm text-[#6F687A]">
            Subsidized LMS access, faculty cohort dashboards, and sponsored campus hackathons for your students.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: MOU Privileges */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-[#E8E2EF] p-6 shadow-xs">
              <h3 className="text-base font-bold text-[#211B2B] mb-3">
                MOU Partner Privileges
              </h3>

              <div className="space-y-3 text-xs text-[#6F687A] leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5425A8] shrink-0 mt-0.5" />
                  <span><strong>Subsidized LMS Subscriptions:</strong> Up to 60% fee waiver for bulk student enrollment via campus budget.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5425A8] shrink-0 mt-0.5" />
                  <span><strong>TnP Faculty Admin Portal:</strong> Dedicated logins for coordinators to track daily practice volume and weak topics.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5425A8] shrink-0 mt-0.5" />
                  <span><strong>Sponsored Collegiate Hackathons:</strong> Platform-managed coding contests with verified scoring criteria.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#5425A8] shrink-0 mt-0.5" />
                  <span><strong>Recruiter Benchmarking:</strong> Pre-season candidate readiness reports for visiting corporate recruiters.</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E2EF] p-5 shadow-xs text-xs text-[#6F687A] space-y-2">
              <div className="font-semibold text-[#211B2B]">Institutional Partnership Desk:</div>
              <div className="flex items-center gap-2 text-[#211B2B]">
                <Mail className="w-3.5 h-3.5 text-[#5425A8]" />
                <span>{COMPANY_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[#211B2B]">
                <Phone className="w-3.5 h-3.5 text-[#5425A8]" />
                <span>{COMPANY_INFO.phone}</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#E8E2EF] p-6 shadow-xs">
              <h3 className="text-base font-bold text-[#211B2B] mb-1">
                College MOU Application
              </h3>
              <p className="text-xs text-[#6F687A] mb-4">
                Please provide official institutional details below.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#211B2B] mb-1">
                    College / University Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Government College of Technology, Coimbatore"
                    value={formData.institutionName}
                    onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] text-xs text-[#211B2B] focus:outline-none focus:ring-1 focus:ring-[#5425A8]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#211B2B] mb-1">
                      State / Union Territory *
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] text-xs text-[#211B2B] bg-white focus:outline-none focus:ring-1 focus:ring-[#5425A8]"
                    >
                      <option>Tamil Nadu</option>
                      <option>Karnataka</option>
                      <option>Andhra Pradesh</option>
                      <option>Telangana</option>
                      <option>Maharashtra</option>
                      <option>Kerala</option>
                      <option>Other State</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#211B2B] mb-1">
                      NIRF / NAAC Status
                    </label>
                    <select
                      value={formData.nirfRank}
                      onChange={(e) => setFormData({ ...formData, nirfRank: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] text-xs text-[#211B2B] bg-white focus:outline-none focus:ring-1 focus:ring-[#5425A8]"
                    >
                      <option>NIRF Top 100 Engineering</option>
                      <option>NIRF 101 - 200</option>
                      <option>NAAC A++ / A+ Accredited</option>
                      <option>Autonomous Engineering College</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#211B2B] mb-1">
                      Authorised Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. K. Senthil Kumar"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] text-xs text-[#211B2B] focus:outline-none focus:ring-1 focus:ring-[#5425A8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#211B2B] mb-1">
                      Designation *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] text-xs text-[#211B2B] focus:outline-none focus:ring-1 focus:ring-[#5425A8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#211B2B] mb-1">
                      Official Institutional Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="placement@college.edu.in"
                      value={formData.officialEmail}
                      onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
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
                      placeholder="+91 94432 10987"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#E8E2EF] text-xs text-[#211B2B] focus:outline-none focus:ring-1 focus:ring-[#5425A8]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    fullWidth
                    leftIcon={<Send className="w-3.5 h-3.5" />}
                  >
                    Submit MOU Application
                  </Button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          title="Application Received"
          subtitle={`Reference ID: ${submissionId}`}
          maxWidth="md"
        >
          <div className="space-y-3 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h4 className="text-base font-bold text-[#211B2B]">
              Thank you, {formData.contactPerson}
            </h4>

            <p className="text-xs text-[#6F687A] leading-relaxed">
              Your MOU request for <strong>{formData.institutionName}</strong> has been logged. Our Institutional Academic team will review and get in touch.
            </p>

            <div className="pt-2 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadReceipt}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Download Slip
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  onNavigate('/');
                }}
              >
                Return to Home
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
