import React from 'react';
import { AlertOctagon, ArrowLeft, ExternalLink } from 'lucide-react';
import { SymptomAnalysisResult } from '../types/health';

interface UrgentCareScreenProps {
  result?: SymptomAnalysisResult | null;
  onBack: () => void;
}

export const UrgentCareScreen: React.FC<UrgentCareScreenProps> = ({
  result,
  onBack,
}) => {
  return (
    <div className="py-10 bg-white min-h-[calc(100vh-140px)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Back */}
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#77717B] hover:text-[#29252D] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Previous Screen</span>
          </button>
        </div>

        {/* Clear Red Warning Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-red-600 text-white shadow-md space-y-3">
          <div className="flex items-center gap-2.5">
            <AlertOctagon className="w-7 h-7 text-white shrink-0" />
            <span className="text-xs font-bold tracking-wider uppercase bg-white/20 px-2.5 py-1 rounded-full">
              High Priority Clinical Alert
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
            Please seek medical care now.
          </h1>

          <p className="text-sm sm:text-base text-red-50 leading-relaxed font-normal">
            Based on the symptoms described—such as severe acute pain, faintness, or potential acute complications—immediate in-person clinical assessment is necessary.
          </p>
        </div>

        {/* Direct, Concise Instructions */}
        <div className="p-6 sm:p-8 rounded-3xl bg-red-50/50 border border-red-200 space-y-6">
          <h2 className="font-serif text-xl font-medium text-red-950">
            Immediate Instructions: Do Not Delay
          </h2>

          <div className="space-y-4 text-xs text-red-900 leading-relaxed">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-red-200 text-red-900 font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <strong className="text-sm font-semibold text-red-950">Go to the nearest hospital emergency room (ER / Casualty / A&E).</strong>
                <p className="mt-0.5 text-red-800">
                  Do not wait for a routine clinic appointment next week or monitor overnight if symptoms are acute and severe.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-red-200 text-red-900 font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <strong className="text-sm font-semibold text-red-950">Do not drive yourself.</strong>
                <p className="mt-0.5 text-red-800">
                  If feeling dizzy, faint, or in severe distress, have a family member, neighbor, or emergency ambulance transport you.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-red-200 text-red-900 font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <strong className="text-sm font-semibold text-red-950">Avoid eating or drinking until evaluated.</strong>
                <p className="mt-0.5 text-red-800">
                  In case urgent surgical assessment, pelvic imaging, or anesthesia is required (e.g. for ovarian torsion or ectopic pregnancy).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-red-200 text-red-900 font-bold flex items-center justify-center shrink-0">
                4
              </span>
              <div>
                <strong className="text-sm font-semibold text-red-950">Tell the triage nurse immediately upon arrival:</strong>
                <p className="mt-0.5 p-3 rounded-xl bg-white border border-red-200 font-mono text-[11px] text-red-950">
                  &quot;{result?.originalInput || 'I have sudden, severe lower abdominal/pelvic pain and feel faint/dizzy.'}&quot;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Official Emergency Helplines */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EDE5F3] shadow-xs space-y-5">
          <div>
            <h3 className="font-serif text-lg font-medium text-[#29252D]">
              Verified Emergency Numbers
            </h3>
            <p className="text-xs text-[#77717B] mt-0.5">
              Call immediately if you cannot arrange private transportation to the emergency room.
            </p>
          </div>

          {/* India Verified Helplines */}
          <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#EDE5F3] space-y-3">
            <p className="text-xs font-semibold text-[#653B68] uppercase tracking-wider">
              India (National Verified Helplines)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#EDE5F3] flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#29252D]">All Emergencies (Police/Fire/Med)</p>
                  <p className="text-[11px] text-[#77717B]">National Emergency</p>
                </div>
                <a
                  href="tel:112"
                  className="px-3 py-1.5 bg-red-600 text-white font-bold rounded-lg text-sm hover:bg-red-700"
                >
                  112
                </a>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#EDE5F3] flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#29252D]">National Women Helpline</p>
                  <p className="text-[11px] text-[#77717B]">Dedicated Women Safety</p>
                </div>
                <a
                  href="tel:1091"
                  className="px-3 py-1.5 bg-[#653B68] text-white font-bold rounded-lg text-sm hover:bg-[#4A264D]"
                >
                  1091
                </a>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#EDE5F3] flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#29252D]">Ambulance Emergency</p>
                  <p className="text-[11px] text-[#77717B]">Medical Dispatch</p>
                </div>
                <a
                  href="tel:108"
                  className="px-3 py-1.5 bg-red-600 text-white font-bold rounded-lg text-sm hover:bg-red-700"
                >
                  108
                </a>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#EDE5F3] flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#29252D]">Health Information Helpline</p>
                  <p className="text-[11px] text-[#77717B]">State Health Service</p>
                </div>
                <a
                  href="tel:104"
                  className="px-3 py-1.5 bg-[#653B68] text-white font-bold rounded-lg text-sm hover:bg-[#4A264D]"
                >
                  104
                </a>
              </div>
            </div>
          </div>

          {/* International References */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#FFFDF9] rounded-xl border border-[#EDE5F3] flex items-center justify-between">
              <div>
                <p className="font-medium text-[#29252D]">United States Emergency</p>
                <p className="text-[11px] text-[#77717B]">Police / Fire / EMS</p>
              </div>
              <a
                href="tel:911"
                className="px-3 py-1.5 bg-red-600 text-white font-bold rounded-lg text-sm"
              >
                911
              </a>
            </div>

            <div className="p-3 bg-[#FFFDF9] rounded-xl border border-[#EDE5F3] flex items-center justify-between">
              <div>
                <p className="font-medium text-[#29252D]">United Kingdom Emergency</p>
                <p className="text-[11px] text-[#77717B]">NHS Emergency Dispatch</p>
              </div>
              <a
                href="tel:999"
                className="px-3 py-1.5 bg-red-600 text-white font-bold rounded-lg text-sm"
              >
                999
              </a>
            </div>
          </div>

          {/* Official Emergency Care Guidance Link */}
          <div className="pt-2 text-xs">
            <a
              href="https://www.emergencyphysicians.org/article/know-when-to-go/abdominal-pain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#653B68] hover:underline inline-flex items-center gap-1 font-medium"
            >
              <span>Read American College of Emergency Physicians: When Abdominal Pain is an Emergency</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Essential Safety Boundaries Statement */}
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 leading-relaxed text-center">
          <strong>Important Clinical Boundary: </strong>
          This application cannot guarantee any individual&apos;s safety and does not dispatch emergency services. Please contact official emergency dispatchers or go directly to a hospital.
        </div>

      </div>
    </div>
  );
};
