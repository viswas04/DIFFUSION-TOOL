import React from 'react';
import { ImageQuality } from '../types';

interface OptionsPanelProps {
  selectedQuality: ImageQuality;
  onQualityChange: (quality: ImageQuality) => void;
  isDisabled: boolean;
}

const qualityOptions: { value: ImageQuality; label: string; details: string }[] = [
  { value: '480p', label: '480p', details: '640×480 (4:3)' },
  { value: '720p', label: '720p HD', details: '1280×720 (16:9)' },
  { value: '1080p', label: '1080p Full HD', details: '1920×1080 (16:9)' },
  { value: '1440p', label: '1440p QHD', details: '2560×1440 (16:9)' },
  { value: '2160p', label: '2160p 4K UHD', details: '3840×2160 (16:9)' },
];

export const OptionsPanel: React.FC<OptionsPanelProps> = ({ selectedQuality, onQualityChange, isDisabled }) => {
  return (
    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
      <h2 className="text-lg font-semibold mb-4 text-slate-300">Options</h2>
      <div>
        <h3 className="text-md font-medium mb-2 text-slate-400">Image Quality</h3>
        <p className="text-sm text-slate-500 mb-3">Select a quality preset for your image.</p>
        <div className="flex flex-col space-y-2">
          {qualityOptions.map(({ value, label, details }) => (
            <button
              key={value}
              onClick={() => onQualityChange(value)}
              disabled={isDisabled}
              className={`flex flex-col items-start p-3 rounded-md transition-all border-2 text-left ${
                selectedQuality === value
                  ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                  : 'bg-slate-700/50 border-transparent hover:border-slate-500 text-slate-400'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title={`Select ${label}`}
            >
              <span className="font-semibold text-sm">{label}</span>
              <span className="text-xs text-slate-500">{details}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};