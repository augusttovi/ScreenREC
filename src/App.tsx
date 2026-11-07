import React, { useState, useEffect } from 'react';
import { WindowHeader } from './components/WindowHeader';
import { CapturePanel } from './components/CapturePanel';
import { AudioSettingsPanel } from './components/AudioSettingsPanel';
import { StorageLocationPanel } from './components/StorageLocationPanel';
import { RecordingControls } from './components/RecordingControls';
import { Footer } from './components/Footer';
import {
  Monitor,
  CheckCircle,
  Eye,
  Layers,
  Sparkles,
  Info,
  Maximize2,
  RefreshCw,
  Video
} from 'lucide-react';

export default function App() {
  // UI Interactive States (Pure visual representation without real capture APIs)
  const [isRecording, setIsRecording] = useState(false);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [systemAudio, setSystemAudio] = useState(true);
  const [systemVolume, setSystemVolume] = useState(80);
  const [microphone, setMicrophone] = useState(true);
  const [micVolume, setMicVolume] = useState(70);
  const [savePath, setSavePath] = useState('C:\\Users\\User\\Videos\\ScreenRecorder');

  // Desktop Window Controls State
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [showWallpaper, setShowWallpaper] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Timer simulation during recording state
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRecording) {
      interval = setInterval(() => {
        setDurationSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setDurationSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  // Keyboard shortcut listener (Alt + S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        if (isRecording) {
          handleStopRecording();
        } else {
          handleStartRecording();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRecording, durationSeconds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    showToast('Gravação iniciada (Demonstração Visual)');
  };

  const handleStopRecording = () => {
    const recordedTime = durationSeconds;
    setIsRecording(false);
    showToast(
      recordedTime > 0
        ? `Gravação encerrada: ${recordedTime}s capturados (Demonstração)`
        : 'Gravação cancelada'
    );
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-between transition-all duration-300 relative select-none font-sans ${
        showWallpaper ? 'bg-cover bg-center' : 'bg-[#0B0C0E]'
      }`}
      style={
        showWallpaper
          ? {
              backgroundImage: 'url(/assets/aistudio/image_fd39a8ac.png)',
              backgroundColor: '#101114',
            }
          : undefined
      }
    >
      {/* Dark tint backdrop overlay if wallpaper is active */}
      {showWallpaper && (
        <div className="absolute inset-0 bg-black/45 backdrop-blur-xs pointer-events-none" />
      )}

      {/* Top Demo Bar: View Options & Information */}
      <div className="relative z-30 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 bg-[#101114]/90 border-b border-[#30333B]/80 backdrop-blur-md text-xs">
        <div className="flex items-center gap-2 text-[#9298A4]">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <span className="font-semibold text-[#F3F4F6]">Screen Recorder</span>
          <span>·</span>
          <span>Protótipo UI/UX Desktop</span>
        </div>

        {/* View toggles & state quick switches */}
        <div className="flex items-center gap-2">
          {/* Quick test: toggle recording state button */}
          <button
            type="button"
            onClick={() => (isRecording ? handleStopRecording() : handleStartRecording())}
            className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors flex items-center gap-1.5 cursor-pointer ${
              isRecording
                ? 'bg-red-500/15 border-red-500/40 text-red-300 hover:bg-red-500/25'
                : 'bg-[#22252B] border-[#30333B] text-[#9298A4] hover:text-[#F3F4F6]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isRecording ? 'bg-red-400 animate-ping' : 'bg-[#9298A4]'
              }`}
            />
            <span>{isRecording ? 'Simulando Gravação (Ativo)' : 'Testar Estado Gravando'}</span>
          </button>

          {/* Toggle wallpaper backdrop */}
          <button
            type="button"
            onClick={() => setShowWallpaper((prev) => !prev)}
            className="px-2.5 py-1 rounded text-[11px] font-medium bg-[#22252B] hover:bg-[#2A2E36] text-[#F3F4F6] border border-[#30333B] transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Alternar plano de fundo de desktop"
          >
            <Layers className="w-3 h-3 text-blue-400" />
            <span className="hidden sm:inline">
              {showWallpaper ? 'Fundo: Wallpaper' : 'Fundo: Escuro'}
            </span>
          </button>

          {/* Reset window button if closed/minimized */}
          {(isClosed || isMinimized) && (
            <button
              type="button"
              onClick={() => {
                setIsClosed(false);
                setIsMinimized(false);
              }}
              className="px-2.5 py-1 rounded text-[11px] font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Restaurar Janela</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Viewport Container */}
      <main className="relative z-20 flex-1 flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* If Window is Closed */}
        {isClosed ? (
          <div className="bg-[#191B20] border border-[#30333B] rounded-xl p-8 max-w-sm text-center shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#22252B] border border-[#30333B] flex items-center justify-center text-[#9298A4] mb-3">
              <Video className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-sm font-semibold text-[#F3F4F6] mb-1">Janela Fechada</h3>
            <p className="text-xs text-[#9298A4] mb-4">
              O aplicativo Screen Recorder foi minimizado para a bandeja do sistema.
            </p>
            <button
              type="button"
              onClick={() => setIsClosed(false)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              Abrir Janela Novamente
            </button>
          </div>
        ) : isMinimized ? (
          /* If Window is Minimized */
          <div className="bg-[#191B20] border border-[#30333B] rounded-xl p-4 text-center shadow-2xl flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs text-[#F3F4F6] font-medium">
              Screen Recorder em segundo plano
            </span>
            <button
              type="button"
              onClick={() => setIsMinimized(false)}
              className="px-3 py-1 bg-[#22252B] hover:bg-[#2A2E36] text-xs text-blue-400 rounded-md border border-[#30333B] transition-colors ml-2"
            >
              Restaurar
            </button>
          </div>
        ) : (
          /* ==================================================================== */
          /* DESKTOP APPLICATION WINDOW (~900x650 proportion)                     */
          /* ==================================================================== */
          <div
            className={`w-full transition-all duration-200 flex flex-col bg-[#101114] border border-[#30333B] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden ${
              isMaximized
                ? 'max-w-6xl h-[92vh]'
                : 'max-w-[880px] min-h-[580px]'
            }`}
          >
            {/* Top Window Bar (3. ESTRUTURA PRINCIPAL) */}
            <WindowHeader
              onMinimize={() => setIsMinimized(true)}
              onMaximize={() => setIsMaximized((prev) => !prev)}
              onClose={() => setIsClosed(true)}
              isMaximized={isMaximized}
            />

            {/* Window Content Body */}
            <div className="p-4 sm:p-6 space-y-4 flex-1 overflow-y-auto">
              {/* 4. PAINEL DE CAPTURA */}
              <CapturePanel isRecording={isRecording} />

              {/* 5. CONFIGURAÇÃO DE ÁUDIO */}
              <AudioSettingsPanel
                systemAudio={systemAudio}
                onToggleSystemAudio={() => setSystemAudio((prev) => !prev)}
                systemVolume={systemVolume}
                onChangeSystemVolume={setSystemVolume}
                microphone={microphone}
                onToggleMicrophone={() => setMicrophone((prev) => !prev)}
                micVolume={micVolume}
                onChangeMicVolume={setMicVolume}
              />

              {/* 6. LOCAL DE SALVAMENTO */}
              <StorageLocationPanel
                currentPath={savePath}
                onPathChange={setSavePath}
              />

              {/* 7 & 8. CONTROLES DE GRAVAÇÃO & INDICADORES DE STATUS */}
              <RecordingControls
                isRecording={isRecording}
                durationSeconds={durationSeconds}
                onStartRecording={handleStartRecording}
                onStopRecording={handleStopRecording}
              />
            </div>

            {/* 9. RODAPÉ */}
            <Footer />
          </div>
        )}
      </main>

      {/* Simulated Windows Desktop Taskbar at bottom */}
      <div className="relative z-30 h-10 bg-[#121316]/95 border-t border-[#252830] backdrop-blur-md px-3 flex items-center justify-between text-xs select-none">
        {/* Taskbar Left: Windows Start & Taskbar Items */}
        <div className="flex items-center gap-1">
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white/10 active:bg-white/15 transition-colors cursor-pointer text-blue-400"
            title="Iniciar"
          >
            <div className="grid grid-cols-2 gap-0.5">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-2xs"></span>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-2xs"></span>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-2xs"></span>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-2xs"></span>
            </div>
          </div>

          {/* Active Application Button on Taskbar */}
          <button
            type="button"
            onClick={() => {
              setIsClosed(false);
              setIsMinimized(false);
            }}
            className={`h-8 px-2.5 rounded-md flex items-center gap-2 border transition-all text-xs cursor-pointer ${
              !isMinimized && !isClosed
                ? 'bg-[#22252B] border-[#30333B] text-[#F3F4F6] shadow-xs'
                : 'bg-transparent border-transparent hover:bg-white/5 text-[#9298A4]'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <Video className="w-3.5 h-3.5 text-red-500" />
              {isRecording && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 absolute -top-0.5 -right-0.5 animate-ping"></span>
              )}
            </div>
            <span className="font-medium truncate max-w-[120px]">Screen Recorder</span>
            {!isClosed && !isMinimized && (
              <span className="w-4 h-0.5 bg-blue-500 rounded-full absolute bottom-0.5 left-1/2 -translate-x-1/2"></span>
            )}
          </button>
        </div>

        {/* Taskbar Right: System Tray (Clock, Sound, Net) */}
        <div className="flex items-center gap-3 text-[#9298A4] text-[11px] pr-1">
          <div className="hidden xs:flex items-center gap-2">
            <span>POR</span>
            <span>PTB2</span>
          </div>
          <div className="flex flex-col items-end leading-tight font-mono text-[10px] text-[#F3F4F6]">
            <span>19:32</span>
            <span className="text-[#9298A4]">06/11/2026</span>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-14 right-6 z-50 bg-[#191B20] border border-[#30333B] text-[#F3F4F6] px-4 py-2.5 rounded-xl shadow-2xl text-xs flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Info className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
