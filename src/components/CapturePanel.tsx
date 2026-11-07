import React from 'react';
import { Monitor, CheckCircle2, Tv, Sparkles } from 'lucide-react';

interface CapturePanelProps {
  isRecording?: boolean;
}

export const CapturePanel: React.FC<CapturePanelProps> = ({ isRecording = false }) => {
  return (
    <section className="bg-[#191B20] border border-[#30333B] rounded-xl p-4 sm:p-5 transition-all shadow-sm">
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#9298A4] flex items-center gap-2">
          <Monitor className="w-4 h-4 text-blue-400" />
          <span>Captura de tela</span>
        </h2>

        {/* Status tag */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
          <span>Desktop Inteiro</span>
        </div>
      </div>

      {/* Main card representation for Full Screen */}
      <div className="relative overflow-hidden bg-[#22252B] border border-[#30333B] rounded-lg p-3.5 sm:p-4 hover:border-blue-500/40 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            {/* Monitor Illustrative Icon Box */}
            <div className="w-11 h-11 rounded-lg bg-[#191B20] border border-[#30333B] flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
              <Tv className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-[#F3F4F6]">Tela inteira</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-400/30">
                  Principal
                </span>
              </div>
              <p className="text-xs text-[#9298A4] mt-0.5">
                Grave tudo o que acontece no seu desktop.
              </p>
            </div>
          </div>

          {/* Desktop Visual Indicator */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <div className="text-right hidden xs:block">
              <div className="text-xs font-medium text-[#F3F4F6] font-mono">
                1920 × 1080
              </div>
              <div className="text-[11px] text-[#9298A4]">
                60 FPS • Proporção 16:9
              </div>
            </div>

            {/* Display Wireframe Graphic */}
            <div
              className={`relative w-20 h-13 rounded border ${
                isRecording
                  ? 'border-red-500/80 bg-red-950/20 shadow-[0_0_12px_rgba(239,68,68,0.2)]'
                  : 'border-blue-500/50 bg-[#14161B]'
              } flex flex-col justify-between p-1 transition-all`}
            >
              {/* Fake desktop elements */}
              <div className="flex justify-between items-center opacity-60">
                <div className="w-2.5 h-1 bg-[#9298A4]/40 rounded-xs"></div>
                <div className="flex gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-blue-400/70"></div>
                  <div className="w-1 h-1 rounded-full bg-[#9298A4]/50"></div>
                </div>
              </div>

              {/* Center desktop indicator */}
              <div className="flex items-center justify-center">
                <div
                  className={`text-[9px] font-bold font-mono tracking-tighter ${
                    isRecording ? 'text-red-400 animate-pulse' : 'text-blue-300'
                  }`}
                >
                  {isRecording ? 'REC' : 'DISP 1'}
                </div>
              </div>

              {/* Fake taskbar */}
              <div className="h-1 bg-[#30333B] rounded-xs flex items-center px-0.5 gap-0.5">
                <div className="w-1 h-0.5 bg-blue-400 rounded-2xs"></div>
                <div className="w-1 h-0.5 bg-[#9298A4]/60 rounded-2xs"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
