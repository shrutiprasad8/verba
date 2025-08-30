export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-emerald-400"></div>
      <p className="text-gray-400">Processing document...</p>
    </div>
  );
}
