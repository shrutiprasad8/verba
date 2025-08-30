export default function SummaryControls({ summaryLength, onLengthChange, onGenerate, isLoading, hasExtractedText }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-100 mb-3">2. Choose Summary Length</h2>
        <div className="flex space-x-2 rounded-lg bg-gray-800/50 p-1 border border-gray-700">
          {['short', 'medium', 'long'].map((len) => (
            <button
              key={len}
              onClick={() => onLengthChange(len)}
              className={`w-full rounded-md py-2 text-sm font-medium transition-all duration-200 ${
                summaryLength === len ? 'bg-emerald-500 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              {len.charAt(0).toUpperCase() + len.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={onGenerate}
        disabled={isLoading || !hasExtractedText}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold py-3 px-4 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200"
      >
        Generate Summary
      </button>
    </div>
  );
}
