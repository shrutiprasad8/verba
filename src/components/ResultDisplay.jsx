import LoadingSpinner from "./LoadingSpinner";

export default function ResultDisplay({ activeView, onViewChange, isLoading, processingStatus, error, summary, extractedText }) {
  return (
    <div className="bg-slate-800/30 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-gray-700 flex flex-col">
      <div className="flex border-b border-gray-700 mb-4">
        <button onClick={() => onViewChange('summary')}
          className={`py-2 px-4 text-sm font-medium ${activeView === 'summary' ? 'border-b-2 border-emerald-400 text-emerald-400' : 'text-gray-500 hover:text-emerald-400'}`}>
          Summary Result
        </button>
        <button onClick={() => onViewChange('verbatim')} disabled={!extractedText}
          className={`py-2 px-4 text-sm font-medium ${activeView === 'verbatim' ? 'border-b-2 border-emerald-400 text-emerald-400' : 'text-gray-500 hover:text-emerald-400'}`}>
          Text Verbatim
        </button>
      </div>
      <div className="flex-grow bg-gray-900/50 rounded-lg p-4 border border-gray-700 overflow-y-auto min-h-[300px]">
        {isLoading ? (
          <div className="text-center">
            <LoadingSpinner />
            {processingStatus && <p className="mt-4 text-sm text-gray-400">{processingStatus}</p>}
          </div>
        ) : error ? (
          <div className="text-center text-red-400 bg-red-900/30 p-4 rounded-lg border border-red-500/50">
            <h3 className="font-bold">An Error Occurred</h3>
            <p className="text-sm whitespace-pre-wrap mt-2">{error}</p>
          </div>
        ) : activeView === 'summary' ? (
          summary ? <div className="whitespace-pre-wrap text-sm">{summary}</div>
                  : <p className="text-center text-gray-500">Your document summary will appear here.</p>
        ) : (
          extractedText ? <div className="whitespace-pre-wrap text-sm">{extractedText}</div>
                        : <p className="text-center text-gray-500">Upload a document to see the extracted text.</p>
        )}
      </div>
    </div>
  );
}
