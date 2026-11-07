import React from 'react';
import { Play, Square, Circle, Radio, Pause } from 'lucide-react';

interface RecordingControlsProps {
  isRecording: boolean;
  durationSeconds: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  durationSeconds,
  onStartRecording,
  onStopRecording,
}) => {
  // Format seconds to HH:MM:SS
  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds]
      .map((val) => String(val).padStart(2, '0'))
      .join(':');
  };

  return (
    <section className="bg-gradient-to-b from-[#1C1F26] to-[#141519] border border-[#30333B] rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden transition-all">
      {/* Decorative subtle ambient glow when recording */}
      <div
        className={`absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-24 blur-3xl pointer-events-none transition-opacity duration-500 ${
          isRecording ? 'bg-red-600/20 opacity-100' : 'bg-red-500/5 opacity-40'
        }`}
      />

      {/* Seção 8: Indicadores de Status */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#30333B]/70 relative z-10">
        <div className="flex items-center gap-2.5">
          {/* Status Indicator Circle */}
          <div className="relative flex items-center justify-center">
            {isRecording ? (
              <>
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping absolute opacity-75"></span>
                <span className="w-3 h-3 rounded-full bg-red-500 relative shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
              </>
            ) : (
              <span className="w-3 h-3 rounded-full bg-[#9298A4] relative opacity-80"></span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold tracking-wide transition-colors ${
                isRecording ? 'text-red-400' : 'text-[#9298A4]'
              }`}
            >
              {isRecording ? 'Gravando' : 'Pronto para gravar'}
            </span>

            {isRecording && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-red-500/15 text-red-300 border border-red-500/30 animate-pulse">
                AO VIVO
              </span>
            )}
          </div>
        </div>

        {/* Cronômetro (00:00:00) */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#9298A4] hidden xs:inline">Duração:</span>
          <div
            className={`font-mono text-sm tracking-wider font-semibold px-2.5 py-1 rounded-md border transition-all tabular-nums ${
              isRecording
                ? 'bg-red-950/30 border-red-500/30 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.15)]'
                : 'bg-[#141519] border-[#30333B] text-[#9298A4]'
            }`}
          >
            {isRecording ? formatTime(durationSeconds) : '00:00:00'}
          </div>
        </div>
      </div>

      {/* Seção 7: Controles de Gravação (Botões Principais) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 relative z-10">
        {/* Botão Principal: COMEÇAR GRAVAÇÃO */}
        <button
          type="button"
          onClick={onStartRecording}
          disabled={isRecording}
          className={`flex-1 sm:max-w-xs py-3.5 px-6 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer select-none shadow-lg ${
            isRecording
              ? 'bg-[#22252B] text-[#9298A4] border border-[#30333B] cursor-not-allowed opacity-60'
              : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 active:from-red-700 active:to-rose-700 text-white shadow-[0_4px_20px_rgba(225,29,72,0.35)] hover:shadow-[0_6px_25px_rgba(225,29,72,0.5)] hover:-translate-y-0.5 active:translate-y-0'
          }`}
        >
          {/* Ícone de círculo de gravação */}
          <div className="relative flex items-center justify-center">
            <span className="w-4 h-4 rounded-full bg-white/30 absolute animate-ping opacity-40"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-white flex items-center justify-center shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            </span>
          </div>
          <span>Começar gravação</span>
        </button>

        {/* Botão Secundário: PARAR GRAVAÇÃO */}
        <button
          type="button"
          onClick={onStopRecording}
          disabled={!isRecording}
          className={`py-3.5 px-6 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2.5 select-none ${
            isRecording
              ? 'bg-[#22252B] hover:bg-red-950/40 text-red-200 border border-red-500/40 hover:border-red-500 shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0'
              : 'bg-[#191B20]/60 text-[#9298A4] border border-[#30333B]/60 opacity-40 cursor-not-allowed'
          }`}
        >
          {/* Ícone de quadrado de parada */}
          <div
            className={`w-3.5 h-3.5 rounded-xs flex items-center justify-center ${
              isRecording ? 'bg-red-400' : 'bg-[#9298A4]'
            }`}
          />
          <span>Parar gravação</span>
        </button>
      </div>

      {/* Atalho de Teclado Visual (Inspirado no visual Windows / OBS / ScreenRec) */}
      <div className="mt-4 pt-3 border-t border-[#30333B]/50 flex items-center justify-center gap-2 text-[11px] text-[#9298A4] relative z-10">
        <span>Atalho de captura rápido:</span>
        <kbd className="px-1.5 py-0.5 rounded bg-[#101114] border border-[#30333B] text-[#F3F4F6] font-mono text-[10px] shadow-2xs">
          Alt
        </kbd>
        <span>+</span>
        <kbd className="px-1.5 py-0.5 rounded bg-[#101114] border border-[#30333B] text-[#F3F4F6] font-mono text-[10px] shadow-2xs">
          S
        </kbd>
      </div>
    </section>
  );
};
