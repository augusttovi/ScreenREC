import React from 'react';
import { ShieldCheck, HardDrive, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="h-9 bg-[#141519] border-t border-[#30333B] px-4 flex items-center justify-between text-[11px] text-[#9298A4] rounded-b-xl select-none">
      {/* Left: App Identity */}
      <div className="flex items-center gap-2">
        <span className="font-semibold text-[#F3F4F6]">Screen Recorder</span>
        <span className="text-[#30333B]">•</span>
        <span className="text-[#9298A4]">Desktop Capture</span>
      </div>

      {/* Center: Engine Readiness / Hardware acceleration notice */}
      <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-[#9298A4]/80">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/80" />
        <span>Casca Visual Desktop Windows</span>
      </div>

      {/* Right: Version */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10px] text-[#9298A4] px-1.5 py-0.5 rounded bg-[#191B20] border border-[#30333B]/60">
          v1.0.0
        </span>
      </div>
    </footer>
  );
};
