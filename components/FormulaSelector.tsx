import React from 'react';
import { FormulaType } from '../types';
import { FORMULA_DESCRIPTIONS } from '../constants';
import { Sparkles, FileWarning, Search, Zap, History, Scale } from 'lucide-react';

interface FormulaSelectorProps {
  selected: FormulaType;
  onSelect: (formula: FormulaType) => void;
}

const FormulaSelector: React.FC<FormulaSelectorProps> = ({ selected, onSelect }) => {
  const getIcon = (type: FormulaType) => {
    switch (type) {
      case FormulaType.AUTO: return <Sparkles className="w-5 h-5" />;
      case FormulaType.FAKE_PROOF: return <FileWarning className="w-5 h-5" />;
      case FormulaType.REVELATION: return <Zap className="w-5 h-5" />;
      case FormulaType.BACKSTORY: return <History className="w-5 h-5" />;
      case FormulaType.DISCOVERY: return <Search className="w-5 h-5" />;
      case FormulaType.CONTRADICTION: return <Scale className="w-5 h-5" />;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {(Object.values(FormulaType) as FormulaType[]).map((type) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={`relative group p-4 rounded-xl border text-left transition-all duration-300 h-full flex flex-col gap-2
            ${selected === type 
              ? 'bg-accent-start/10 border-accent-start shadow-[0_0_15px_rgba(255,59,92,0.2)]' 
              : 'bg-secondary/50 border-gray-800 hover:border-gray-600 hover:bg-secondary'
            }
          `}
        >
          <div className={`
            p-2 rounded-lg w-fit transition-colors
            ${selected === type ? 'bg-gradient-to-br from-accent-start to-accent-end text-white' : 'bg-gray-800 text-gray-400 group-hover:text-white'}
          `}>
            {getIcon(type)}
          </div>
          
          <div>
            <h3 className={`font-semibold text-sm ${selected === type ? 'text-white' : 'text-gray-300'}`}>
              {type}
            </h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
              {FORMULA_DESCRIPTIONS[type]}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default FormulaSelector;
