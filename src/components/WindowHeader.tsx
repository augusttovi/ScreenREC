import React from 'react';
import { Minus, Square, X, Video } from 'lucide-react';

interface WindowHeaderProps {
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  isMaximized?: boolean;
}

export const WindowHeader: React.FC<WindowHeaderProps> = ({
  onMinimize,
  onMaximize,
  onClose,
  isMaximized = false,
}) => {
  return (
    <header className="h-10 bg-[#141519] border-b border-[#30333B] px-3.5 flex items-center justify-between select-none rounded-t-xl transition-colors">
      {/* Left: App Title, Icon, Version */}
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-md bg-[#22252B] border border-[#30333B] flex items-center justify-center text-red-500 shadow-inner">
          <div className="relative flex items-center justify-center">
            <Video className="w-3.5 h-3.5" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-red-500"></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-wider text-[#F3F4F6] uppercase">
            SCREEN RECORDER
          </span>
          <span className="text-[10px] font-medium text-[#9298A4] px-1.5 py-0.5 rounded bg-[#191B20] border border-[#30333B]/60 font-mono">
            v1.0.0
          </span>
        </div>
      </div>

      {/* Center: Subtle Drag Area Notice / Window Indicator */}
      <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#9298A4]/70">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/70"></span>
        <span>Modo Desktop</span>
      </div>

      {/* Right: Window Control Buttons (Minimize, Maximize, Close) */}
      <div className="flex items-center gap-0.5 -mr-1">
        {/* Minimize */}
        <button
          type="button"
          onClick={onMinimize}
          title="Minimizar"
          className="w-9 h-7 flex items-center justify-center text-[#9298A4] hover:text-[#F3F4F6] hover:bg-[#22252B] active:bg-[#2A2E36] rounded transition-colors"
          aria-label="Minimizar janela"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        {/* Maximize */}
        <button
          type="button"
          onClick={onMaximize}
          title={isMaximized ? "Restaurar" : "Maximizar"}
          className="w-9 h-7 flex items-center justify-center text-[#9298A4] hover:text-[#F3F4F6] hover:bg-[#22252B] active:bg-[#2A2E36] rounded transition-colors"
          aria-label="Maximizar janela"
        >
          <Square className="w-3 h-3" />
        </button>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          title="Fechar"
          className="w-9 h-7 flex items-center justify-center text-[#9298A4] hover:text-white hover:bg-[#E81123] active:bg-[#C40E1E] rounded transition-colors group"
          aria-label="Fechar janela"
        >
          <X className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
        </button>
      </div>
    </header>
  );
};
