import React, { useState } from 'react';
import { Folder, FolderOpen, HardDrive, Monitor, Check, X, ChevronRight } from 'lucide-react';

interface FolderPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onSelectPath: (path: string) => void;
}

export const FolderPickerModal: React.FC<FolderPickerModalProps> = ({
  isOpen,
  onClose,
  currentPath,
  onSelectPath,
}) => {
  const [selected, setSelected] = useState(currentPath);
  const [customPath, setCustomPath] = useState(currentPath);

  if (!isOpen) return null;

  const quickFolders = [
    { name: 'Vídeos', full: 'C:\\Users\\User\\Videos\\ScreenRecorder', icon: Folder },
    { name: 'Área de Trabalho', full: 'C:\\Users\\User\\Desktop\\Recordings', icon: Monitor },
    { name: 'Documentos', full: 'C:\\Users\\User\\Documents\\ScreenRecorder', icon: Folder },
    { name: 'Disco Local (C:)', full: 'C:\\Capturas', icon: HardDrive },
    { name: 'Disco Secundário (D:)', full: 'D:\\Media\\ScreenRecorder', icon: HardDrive },
  ];

  const handleConfirm = () => {
    onSelectPath(customPath || selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-[#191B20] border border-[#30333B] rounded-xl shadow-2xl overflow-hidden text-[#F3F4F6]">
        {/* Modal Header */}
        <div className="h-10 bg-[#141519] border-b border-[#30333B] px-4 flex items-center justify-between select-none">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <FolderOpen className="w-4 h-4 text-amber-400" />
            <span>Selecionar Pasta de Destino</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center text-[#9298A4] hover:text-[#F3F4F6] hover:bg-[#22252B] rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-3.5">
          <p className="text-xs text-[#9298A4]">
            Escolha onde seus vídeos gravados serão armazenados localmente:
          </p>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {quickFolders.map((folder) => {
              const Icon = folder.icon;
              const isChosen = selected === folder.full;
              return (
                <button
                  key={folder.full}
                  type="button"
                  onClick={() => {
                    setSelected(folder.full);
                    setCustomPath(folder.full);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors border ${
                    isChosen
                      ? 'bg-blue-600/15 border-blue-500/40 text-blue-300'
                      : 'bg-[#22252B]/60 border-transparent hover:bg-[#22252B] text-[#F3F4F6]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isChosen ? 'text-blue-400' : 'text-amber-400'}`} />
                    <div className="truncate">
                      <div className="font-medium">{folder.name}</div>
                      <div className="text-[10px] text-[#9298A4] font-mono truncate">{folder.full}</div>
                    </div>
                  </div>
                  {isChosen && <Check className="w-4 h-4 text-blue-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#30333B]">
            <label className="block text-[11px] font-medium text-[#9298A4] mb-1">
              Caminho da pasta:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customPath}
                onChange={(e) => setCustomPath(e.target.value)}
                className="w-full bg-[#101114] border border-[#30333B] rounded-lg px-3 py-2 text-xs font-mono text-[#F3F4F6] focus:outline-none focus:border-blue-500"
                placeholder="Ex: C:\Users\..."
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#141519] border-t border-[#30333B] px-4 py-2.5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-[#9298A4] hover:text-[#F3F4F6] hover:bg-[#22252B] rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-1.5 text-xs font-medium bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Selecionar Pasta</span>
          </button>
        </div>
      </div>
    </div>
  );
};
