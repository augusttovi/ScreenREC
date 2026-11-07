import React from 'react';
import { Volume2, VolumeX, Mic, MicOff, Sliders } from 'lucide-react';

interface AudioSettingsPanelProps {
  systemAudio: boolean;
  onToggleSystemAudio: () => void;
  systemVolume: number;
  onChangeSystemVolume: (vol: number) => void;
  microphone: boolean;
  onToggleMicrophone: () => void;
  micVolume: number;
  onChangeMicVolume: (vol: number) => void;
}

export const AudioSettingsPanel: React.FC<AudioSettingsPanelProps> = ({
  systemAudio,
  onToggleSystemAudio,
  systemVolume,
  onChangeSystemVolume,
  microphone,
  onToggleMicrophone,
  micVolume,
  onChangeMicVolume,
}) => {
  return (
    <section className="bg-[#191B20] border border-[#30333B] rounded-xl p-4 sm:p-5 transition-all shadow-sm">
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#9298A4] flex items-center gap-2">
          <Sliders className="w-4 h-4 text-blue-400" />
          <span>Configurações de áudio</span>
        </h2>
        <span className="text-[11px] text-[#9298A4]">2 fontes configuráveis</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Áudio do Sistema */}
        <div
          className={`relative rounded-lg p-3.5 sm:p-4 border transition-all duration-200 ${
            systemAudio
              ? 'bg-[#22252B] border-[#30333B] hover:border-blue-500/40 shadow-sm'
              : 'bg-[#18191E]/70 border-[#2A2D35] opacity-65'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  systemAudio
                    ? 'bg-blue-500/15 border border-blue-500/30 text-blue-400'
                    : 'bg-[#191B20] border border-[#30333B] text-[#9298A4]'
                }`}
              >
                {systemAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-[#F3F4F6]">Áudio do sistema</h3>
                  <span
                    className={`text-[10px] font-medium px-1.5 py-0.2 rounded transition-colors ${
                      systemAudio
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        : 'bg-[#22252B] text-[#9298A4] border border-[#30333B]'
                    }`}
                  >
                    {systemAudio ? 'Ativado' : 'Desativado'}
                  </span>
                </div>
                <p className="text-xs text-[#9298A4] mt-0.5 leading-snug">
                  Capturar sons reproduzidos pelo computador.
                </p>
              </div>
            </div>

            {/* Custom Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={systemAudio}
              onClick={onToggleSystemAudio}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
                systemAudio ? 'bg-blue-600' : 'bg-[#30333B]'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  systemAudio ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Volume Slider & Level visual */}
          <div className="mt-3 pt-3 border-t border-[#30333B]/60 flex items-center justify-between gap-3 text-xs">
            <span className="text-[11px] text-[#9298A4] whitespace-nowrap">Volume:</span>
            <input
              type="range"
              min="0"
              max="100"
              disabled={!systemAudio}
              value={systemVolume}
              onChange={(e) => onChangeSystemVolume(Number(e.target.value))}
              className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-blue-500 bg-[#141519] ${
                !systemAudio ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            />
            <span className="font-mono text-[11px] text-[#F3F4F6] w-8 text-right tabular-nums">
              {systemAudio ? `${systemVolume}%` : '0%'}
            </span>
          </div>
        </div>

        {/* Microfone */}
        <div
          className={`relative rounded-lg p-3.5 sm:p-4 border transition-all duration-200 ${
            microphone
              ? 'bg-[#22252B] border-[#30333B] hover:border-blue-500/40 shadow-sm'
              : 'bg-[#18191E]/70 border-[#2A2D35] opacity-65'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  microphone
                    ? 'bg-violet-500/15 border border-violet-500/30 text-violet-400'
                    : 'bg-[#191B20] border border-[#30333B] text-[#9298A4]'
                }`}
              >
                {microphone ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-[#F3F4F6]">Microfone</h3>
                  <span
                    className={`text-[10px] font-medium px-1.5 py-0.2 rounded transition-colors ${
                      microphone
                        ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                        : 'bg-[#22252B] text-[#9298A4] border border-[#30333B]'
                    }`}
                  >
                    {microphone ? 'Ativado' : 'Desativado'}
                  </span>
                </div>
                <p className="text-xs text-[#9298A4] mt-0.5 leading-snug">
                  Capturar sua voz durante a gravação.
                </p>
              </div>
            </div>

            {/* Custom Toggle Switch */}
            <button
              type="button"
              role="switch"
              aria-checked={microphone}
              onClick={onToggleMicrophone}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 ${
                microphone ? 'bg-violet-600' : 'bg-[#30333B]'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  microphone ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Volume Slider & Level visual */}
          <div className="mt-3 pt-3 border-t border-[#30333B]/60 flex items-center justify-between gap-3 text-xs">
            <span className="text-[11px] text-[#9298A4] whitespace-nowrap">Ganho:</span>
            <input
              type="range"
              min="0"
              max="100"
              disabled={!microphone}
              value={micVolume}
              onChange={(e) => onChangeMicVolume(Number(e.target.value))}
              className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-violet-500 bg-[#141519] ${
                !microphone ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            />
            <span className="font-mono text-[11px] text-[#F3F4F6] w-8 text-right tabular-nums">
              {microphone ? `${micVolume}%` : '0%'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
