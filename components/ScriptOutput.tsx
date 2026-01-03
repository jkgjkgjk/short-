import React from 'react';
import { GeneratedScript } from '../types';
import { Copy, Download, RefreshCw, CheckCircle2 } from 'lucide-react';

interface ScriptOutputProps {
  scriptData: GeneratedScript | null;
  loading: boolean;
  onRegenerate: () => void;
  onCopy: () => void;
  onDownload: () => void;
}

const ScriptOutput: React.FC<ScriptOutputProps> = ({ 
  scriptData, 
  loading, 
  onRegenerate, 
  onCopy, 
  onDownload 
}) => {
  if (loading) {
    return (
      <div className="h-full min-h-[400px] glass-panel rounded-2xl border border-gray-700 flex flex-col items-center justify-center p-8 text-center">
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-accent-start border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-gray-800"></div>
          <div className="absolute inset-2 rounded-full border-4 border-b-accent-end border-t-transparent border-l-transparent border-r-transparent animate-spin animation-delay-500"></div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Generating Viral Script...</h3>
        <p className="text-gray-400 text-sm max-w-xs">
          Analyzing patterns, removing commas, and optimizing hooks for maximum retention.
        </p>
      </div>
    );
  }

  if (!scriptData) {
    return (
      <div className="h-full min-h-[400px] glass-panel rounded-2xl border border-dashed border-gray-700 flex flex-col items-center justify-center p-8 text-center text-gray-500">
        <p>Your generated script will appear here</p>
      </div>
    );
  }

  const { text, metrics, formula } = scriptData;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Metrics Header */}
      <div className="glass-panel p-4 rounded-xl border border-gray-700 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold">Viral Score</p>
          <p className={`text-2xl font-black ${getScoreColor(metrics.viralScore)}`}>{metrics.viralScore}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold">Word Count</p>
          <p className="text-xl text-white font-bold">{metrics.wordCount}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold">Duration</p>
          <p className="text-xl text-white font-bold">{metrics.duration}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-bold">Formula</p>
          <p className="text-sm text-white font-medium truncate">{formula}</p>
        </div>
      </div>

      {/* Script Content */}
      <div className="flex-grow glass-panel rounded-xl border border-gray-700 p-6 relative group overflow-hidden flex flex-col">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-start to-accent-end"></div>
        
        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-lg md:text-xl leading-relaxed text-gray-100 font-medium whitespace-pre-wrap">
            {text}
          </p>
        </div>

        {/* Action Bar */}
        <div className="mt-6 pt-4 border-t border-gray-800 flex flex-wrap gap-3">
          <button 
            onClick={onCopy}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium text-sm"
          >
            <Copy className="w-4 h-4" /> Copy
          </button>
          <button 
            onClick={onDownload}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium text-sm"
          >
            <Download className="w-4 h-4" /> Save .txt
          </button>
          <button 
            onClick={onRegenerate}
            className="flex-1 border border-accent-start text-accent-start hover:bg-accent-start hover:text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors font-medium text-sm"
          >
            <RefreshCw className="w-4 h-4" /> Regenerate
          </button>
        </div>
      </div>

      {/* Validation Checklist Mini-View */}
      <div className="glass-panel p-4 rounded-xl border border-gray-700">
        <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Viral Validation</h4>
        <div className="flex flex-wrap gap-3">
          <div className={`flex items-center gap-1.5 text-xs ${metrics.commaCount === 0 ? 'text-green-400' : 'text-red-400'}`}>
            <CheckCircle2 className="w-3 h-3" />
            Zero Commas ({metrics.commaCount})
          </div>
          <div className={`flex items-center gap-1.5 text-xs ${metrics.hookLength >= 6 && metrics.hookLength <= 15 ? 'text-green-400' : 'text-yellow-500'}`}>
            <CheckCircle2 className="w-3 h-3" />
            Hook Length ({metrics.hookLength})
          </div>
          <div className={`flex items-center gap-1.5 text-xs ${metrics.wordCount >= 90 && metrics.wordCount <= 120 ? 'text-green-400' : 'text-gray-400'}`}>
            <CheckCircle2 className="w-3 h-3" />
            Optimal Length
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptOutput;
