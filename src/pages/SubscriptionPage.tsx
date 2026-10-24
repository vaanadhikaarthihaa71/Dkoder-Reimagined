import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { PricingPlan } from '../types';
import { 
  Check, 
  Sparkles, 
  GraduationCap
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { useToast } from '../context/ToastContext';

interface SubscriptionPageProps {
  onNavigate: (path: string) => void;
}

export const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onNavigate }) => {
  const { addToast } = useToast();
  const [billingCycle, setBillingCycle] = useState<'annual' | 'semester'>('annual');
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const handleSubscribe = () => {
    if (!selectedPlan) return;
    addToast({
      type: 'success',
      title: `${selectedPlan.name} Subscription Activated`,
      description: 'Your account has been upgraded with all curriculum tracks.'
    });
    setSelectedPlan(null);
  };

  return (
    <div className="py-12 bg-[#FAF8FD] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <div className="text-xs text-[#6F687A] font-medium flex items-center gap-1.5">
          <button onClick={() => onNavigate('/')} className="hover:text-[#211B2B]">Home</button>
          <span>/</span>
          <span className="text-[#211B2B] font-semibold">Student Subscription Plans</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3EDFF] text-[#5425A8] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Placement Subscriptions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#211B2B] tracking-tight">
            Transparent annual pricing for <span className="text-[#5425A8]">engineering students</span>
          </h1>
          <p className="mt-2 text-sm text-[#6F687A]">
            Select the tier aligned with your target companies and placement package.
          </p>

          {/* Billing Toggle */}
          <div className="mt-6 inline-flex items-center p-1 rounded-xl bg-white border border-[#E8E2EF]">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-[#5425A8] text-white shadow-xs'
                  : 'text-[#6F687A] hover:text-[#211B2B]'
              }`}
            >
              Annual Pass (Save 20%)
            </button>
            <button
              onClick={() => setBillingCycle('semester')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'semester'
                  ? 'bg-[#5425A8] text-white shadow-xs'
                  : 'text-[#6F687A] hover:text-[#211B2B]'
              }`}
            >
              Semester Sprint (6 Months)
            </button>
          </div>
        </div>

        {/* 5-Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {PRICING_PLANS.map((plan) => {
            const multiplier = billingCycle === 'semester' ? 0.65 : 1;
            const price = Math.round(plan.annualPrice * multiplier);
            const cycleText = billingCycle === 'annual' ? '/ yr' : '/ 6 mo';
            const isRecommended = plan.name === 'Platinum';

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-2xl p-5 flex flex-col justify-between transition-all duration-150 relative ${
                  isRecommended
                    ? 'border-2 border-[#5425A8] shadow-xs'
                    : 'border border-[#E8E2EF] hover:border-[#D4CBDF]'
                }`}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5425A8] text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Recommended
                  </div>
                )}

                <div>
                  <h3 className="text-base font-bold text-[#211B2B]">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-[#6F687A] mt-0.5 min-h-[30px] leading-relaxed">
                    {plan.tagline}
                  </p>

                  <div className="my-3 pb-3 border-b border-[#E8E2EF]">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-[#211B2B]">₹{price}</span>
                      <span className="text-xs text-[#6F687A]">{cycleText}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-[#5425A8] mt-0.5">
                      ~₹{plan.dailyCost} per day
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-5 text-xs">
                    {plan.features.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#5425A8] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="text-[#211B2B] leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E8E2EF]">
                  <Button
                    variant={isRecommended ? 'primary' : 'outline'}
                    size="sm"
                    fullWidth
                    onClick={() => setSelectedPlan(plan)}
                  >
                    Select Plan
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Matrix Table */}
        <div className="bg-white rounded-2xl border border-[#E8E2EF] p-6 shadow-xs">
          <h2 className="text-xl font-bold text-[#211B2B] mb-4 text-center">
            Detailed Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF8FD] text-[#6F687A] uppercase text-[10px] font-semibold border-b border-[#E8E2EF]">
                <tr>
                  <th className="p-3">Platform Capability</th>
                  <th className="p-3 text-center">Bronze</th>
                  <th className="p-3 text-center">Silver</th>
                  <th className="p-3 text-center">Gold</th>
                  <th className="p-3 text-center text-[#5425A8] font-bold">Platinum</th>
                  <th className="p-3 text-center font-bold">Super Dream</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2EF] text-[#211B2B] font-medium">
                <tr>
                  <td className="p-3 font-semibold">Service Company Practice Qs</td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Live Browser Compiler</td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">TCS NQT & InfyTQ Mock Exams</td>
                  <td className="p-3 text-center text-[#6F687A]">—</td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Salary Package Filters</td>
                  <td className="p-3 text-center text-[#6F687A]">—</td>
                  <td className="p-3 text-center text-[#6F687A]">—</td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Super Dream (15+ LPA) Vault</td>
                  <td className="p-3 text-center text-[#6F687A]">—</td>
                  <td className="p-3 text-center text-[#6F687A]">—</td>
                  <td className="p-3 text-center text-[#6F687A]">—</td>
                  <td className="p-3 text-center text-[#6F687A]">—</td>
                  <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-600 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      {selectedPlan && (
        <Modal
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          title={`Activate ${selectedPlan.name} Plan`}
          subtitle="Demo Subscription Confirmation"
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-[#FAF8FD] border border-[#E8E2EF] text-xs">
              <div className="flex justify-between font-bold text-[#211B2B] mb-1">
                <span>Selected Plan:</span>
                <span>{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between text-[#6F687A]">
                <span>Validity:</span>
                <span className="capitalize">{billingCycle} Pass</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#211B2B] pt-2 border-t border-[#E8E2EF] mt-2">
                <span>Amount:</span>
                <span>₹{billingCycle === 'annual' ? selectedPlan.annualPrice : Math.round(selectedPlan.annualPrice * 0.65)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8E2EF]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPlan(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubscribe}
              >
                Confirm Upgrade
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
