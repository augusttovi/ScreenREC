import React, { useState } from 'react';
import { Folder, FolderOpen, ExternalLink, HardDrive } from 'lucide-react';
import { FolderPickerModal } from './FolderPickerModal';

interface StorageLocationPanelProps {
  currentPath: string;
  onPathChange: (path: string) => void;
}

export const StorageLocationPanel: React.FC<StorageLocationPanelProps> = ({
  currentPath,
  onPathChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="bg-[#191B20] border border-[#30333B] rounded-xl p-4 sm:p-5 transition-all shadow-sm">
      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#9298A4] flex items-center gap-2">
          <Folder className="w-4 h-4 text-amber-400" />
          <span>Local de salvamento</span>
        </h2>
        <span className="text-[11px] text-[#9298A4] font-mono">Espaço livre: 248 GB</span>
      </div>

      <div className="bg-[#22252B] border border-[#30333B] rounded-lg p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <label className="block text-[11px] text-[#9298A4] mb-1 font-medium">
            Salvar gravações em
          </label>
          <div className="flex items-center gap-2.5 bg-[#141519] border border-[#30333B] rounded-lg px-3 py-2 text-xs font-mono text-[#F3F4F6] truncate">
            <HardDrive className="w-3.5 h-3.5 text-[#9298A4] shrink-0" />
            <span className="truncate select-all text-xs text-[#F3F4F6]">
              {currentPath}
            </span>
          </div>
        </div>

        {/* Botão Secundário "Procurar..." */}
        <div className="flex items-end self-end sm:self-end pt-1 sm:pt-0">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#F3F4F6] bg-[#2A2E36] hover:bg-[#343842] active:bg-[#252830] border border-[#3A3E47] hover:border-[#4B505C] rounded-lg transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Procurar...</span>
          </button>
        </div>
      </div>

      {/* Simulated Windows Folder Browser Modal */}
      <FolderPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentPath={currentPath}
        onSelectPath={onPathChange}
      />
    </section>
  );
};
