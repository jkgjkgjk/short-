import React, { useState } from 'react';
import { Key, ExternalLink, ShieldAlert } from 'lucide-react';

interface ApiKeyModalProps {
  onSave: (key: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave }) => {
  const [keyInput, setKeyInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyInput.length < 30) {
      setError('Invalid API Key format');
      return;
    }
    onSave(keyInput);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="glass-panel w-full max-w-md p-8 rounded-2xl border border-gray-700 shadow-2xl relative overflow-hidden">
        {/* Decorative gradient blob */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-start opacity-20 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 border border-gray-700">
            <Key className="w-8 h-8 text-accent-start" />
          </div>
          <h2 className="text-2xl font-bold text-white text-center">Welcome to ViralShorts.ai</h2>
          <p className="text-gray-400 text-center mt-2 text-sm">
            Enter your Google Gemini API key to start generating viral scripts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => {
                setKeyInput(e.target.value);
                setError('');
              }}
              placeholder="Paste your API Key here"
              className="w-full bg-secondary border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-start transition-colors placeholder-gray-600"
            />
            {error && <p className="text-red-500 text-xs mt-2 ml-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full gradient-bg hover:opacity-90 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-accent-start/20 flex items-center justify-center gap-2"
          >
            Get Started
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <div className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-800">
            <ShieldAlert className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500">
              Your API Key is stored locally in your browser. It is never sent to our servers.
            </p>
          </div>
          
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-xs text-accent-start hover:underline"
          >
            Get a free API Key <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
