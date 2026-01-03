import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Settings, Zap, Edit3, ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import ApiKeyModal from './components/ApiKeyModal';
import FormulaSelector from './components/FormulaSelector';
import ScriptOutput from './components/ScriptOutput';
import { FormulaType, GeneratorOptions, GeneratedScript, ScriptMetrics } from './types';
import { generateScriptWithGemini } from './services/geminiService';

function App() {
  // State
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState('');
  const [selectedFormula, setSelectedFormula] = useState<FormulaType>(FormulaType.AUTO);
  const [generatedScript, setGeneratedScript] = useState<GeneratedScript | null>(null);
  const [totalScripts, setTotalScripts] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Options State
  const [options, setOptions] = useState<GeneratorOptions>({
    includeSubscribe: true,
    strictMode: true,
    targetWordCount: 105,
  });

  // Load persistence
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    const storedCount = localStorage.getItem('script_count');
    if (storedKey) setApiKey(storedKey);
    if (storedCount) setTotalScripts(parseInt(storedCount, 10));
  }, []);

  // Handlers
  const handleSaveApiKey = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
    toast.success('API Key saved successfully');
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey(null);
    toast.success('API Key removed');
  };

  const analyzeScript = (text: string): ScriptMetrics => {
    const words = text.trim().split(/\s+/);
    const wordCount = words.length;
    
    // Duration approx 150 words per minute -> 2.5 words per second
    const seconds = Math.round(wordCount / 2.5);
    const duration = `${seconds}s`;

    // Metrics for score
    const commaCount = (text.match(/,/g) || []).length;
    // Basic regex check for Mr. or Dr. to ignore
    const cleanForCommas = text.replace(/(Mr\.|Dr\.)/g, '');
    const realCommaCount = (cleanForCommas.match(/,/g) || []).length;

    // Hook is roughly first 15 words or first sentence
    // Find first period or just take first 15 words
    const firstSentenceEnd = text.indexOf('.');
    const hookText = firstSentenceEnd > -1 ? text.substring(0, firstSentenceEnd) : text;
    const hookLength = hookText.split(/\s+/).length;

    // Simple checks
    const forbiddenWords = ['In conclusion', 'Buckle up', 'Moving on'].filter(w => 
      text.toLowerCase().includes(w.toLowerCase())
    ).length;

    // Score Calculation
    let score = 0;
    if (wordCount >= 90 && wordCount <= 120) score += 30;
    else if (wordCount >= 79 && wordCount <= 155) score += 15;
    
    if (hookLength >= 6 && hookLength <= 15) score += 20;
    
    if (realCommaCount === 0) score += 20;
    else if (realCommaCount <= 2) score += 10;

    if (forbiddenWords === 0) score += 15;
    
    // Assume present tense heuristic (checking for lack of "was", "were" significantly)
    const pastTenseCount = (text.match(/\b(was|were|had|did)\b/gi) || []).length;
    if (pastTenseCount < 3) score += 15;

    return {
      wordCount,
      duration,
      viralScore: Math.min(100, score),
      hookLength,
      commaCount: realCommaCount,
      presentTenseScore: pastTenseCount < 3,
      forbiddenWordCount: forbiddenWords
    };
  };

  const handleGenerate = async () => {
    if (!apiKey) return;
    if (story.length < 50) {
      toast.error('Please enter a longer story (min 50 chars)');
      return;
    }

    setLoading(true);
    try {
      const text = await generateScriptWithGemini(apiKey, story, selectedFormula, options);
      const metrics = analyzeScript(text);
      
      setGeneratedScript({
        text,
        formula: selectedFormula,
        metrics,
        timestamp: Date.now()
      });

      const newCount = totalScripts + 1;
      setTotalScripts(newCount);
      localStorage.setItem('script_count', newCount.toString());
      toast.success('Script generated successfully!');
    } catch (error: any) {
      const msg = error?.message || 'Unknown error occurred';
      toast.error(`Generation failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedScript) {
      navigator.clipboard.writeText(generatedScript.text);
      toast.success('Copied to clipboard');
    }
  };

  const handleDownload = () => {
    if (generatedScript) {
      const element = document.createElement("a");
      const file = new Blob([generatedScript.text], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `viral-script-${Date.now()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success('Download started');
    }
  };

  if (!apiKey) {
    return <ApiKeyModal onSave={handleSaveApiKey} />;
  }

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans text-gray-200">
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#1F2937',
          color: '#fff',
          border: '1px solid #374151'
        }
      }} />

      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-start to-accent-end rounded-lg flex items-center justify-center shadow-lg shadow-accent-start/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">ViralShorts.ai</h1>
            <p className="text-xs text-gray-500 font-medium tracking-wide">THE SECOND BRAIN ENGINE</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end mr-4">
            <span className="text-xs text-gray-500 font-bold uppercase">Scripts Generated</span>
            <span className="text-xl font-bold text-white">{totalScripts}</span>
          </div>
          <button 
            onClick={handleClearApiKey}
            className="p-2 text-gray-500 hover:text-red-400 transition-colors"
            title="Remove API Key"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        
        {/* Left Column: Input */}
        <div className="flex flex-col gap-6">
          
          {/* Formula Selection */}
          <section>
            <h2 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4" /> 1. Select Formula
            </h2>
            <FormulaSelector selected={selectedFormula} onSelect={setSelectedFormula} />
          </section>

          {/* Story Input */}
          <section className="flex-grow flex flex-col">
            <h2 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
              <Edit3 className="w-4 h-4" /> 2. Your Story
            </h2>
            <div className="relative flex-grow">
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Paste your story, news article, or incident here. E.g., 'A man in Florida tried to pay for McDonald's with an alligator...'"
                className="w-full min-h-[200px] h-full bg-secondary/50 border border-gray-700 rounded-xl p-4 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-accent-start focus:ring-1 focus:ring-accent-start transition-all resize-none font-medium"
              />
              <div className="absolute bottom-4 right-4 text-xs text-gray-500 font-medium bg-secondary px-2 py-1 rounded-md border border-gray-800">
                {story.length} chars
              </div>
            </div>
          </section>

          {/* Advanced Options */}
          <section className="glass-panel rounded-xl border border-gray-800 overflow-hidden">
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors text-sm font-medium text-gray-300"
            >
              <span>Advanced Configuration</span>
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {showAdvanced && (
              <div className="p-4 border-t border-gray-800 space-y-4 bg-black/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Strict Mode (Follow Formula Exactly)</span>
                  <input 
                    type="checkbox" 
                    checked={options.strictMode}
                    onChange={(e) => setOptions({...options, strictMode: e.target.checked})}
                    className="w-5 h-5 accent-accent-start rounded bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Include "Subscribe If" CTA</span>
                  <input 
                    type="checkbox" 
                    checked={options.includeSubscribe}
                    onChange={(e) => setOptions({...options, includeSubscribe: e.target.checked})}
                    className="w-5 h-5 accent-accent-start rounded bg-gray-700 border-gray-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Target Word Count</span>
                    <span className="text-sm text-white font-bold">{options.targetWordCount}</span>
                  </div>
                  <input 
                    type="range" 
                    min="79" 
                    max="155" 
                    value={options.targetWordCount}
                    onChange={(e) => setOptions({...options, targetWordCount: parseInt(e.target.value)})}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-start"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-600">
                    <span>79</span>
                    <span>155</span>
                  </div>
                </div>
              </div>
            )}
          </section>

          <button
            onClick={handleGenerate}
            disabled={loading || story.length < 50}
            className={`
              w-full py-4 rounded-xl font-bold text-lg text-white shadow-xl transition-all
              ${loading || story.length < 50 
                ? 'bg-gray-800 cursor-not-allowed opacity-50' 
                : 'gradient-bg hover:shadow-accent-start/30 hover:scale-[1.01] active:scale-[0.99]'}
            `}
          >
            {loading ? 'Generating Viral Script...' : 'Generate Script'}
          </button>
        </div>

        {/* Right Column: Output */}
        <div className="min-h-[500px] lg:h-auto">
          <ScriptOutput 
            scriptData={generatedScript} 
            loading={loading} 
            onCopy={handleCopy}
            onDownload={handleDownload}
            onRegenerate={handleGenerate}
          />
        </div>

      </main>
      
      {/* Mobile Stats Footer */}
      <div className="mt-8 text-center md:hidden text-gray-600 text-xs font-medium">
        LIFETIME SCRIPTS GENERATED: <span className="text-white">{totalScripts}</span>
      </div>
    </div>
  );
}

export default App;