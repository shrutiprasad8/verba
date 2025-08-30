import UploadIcon from "./icons/UploadIcon";
import FileIcon from "./icons/FileIcon";

export default function FileUploader({ onFileChange, file, isLoading, onClearFile }) {
  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) onFileChange(e.dataTransfer.files[0]);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-100">1. Upload Document</h2>
      <label
        htmlFor="file-upload"
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-600 p-8 text-center cursor-pointer transition-all duration-300 hover:border-emerald-400 group"
        onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center">
          <UploadIcon />
          <span className="mt-2 block text-sm font-medium text-gray-300">
            Drag & Drop or <span className="text-emerald-400 font-semibold">Browse</span>
          </span>
          <span className="mt-1 block text-xs text-gray-500">PDF, PNG, JPG, WEBP</span>
        </div>
        <input id="file-upload" type="file"
          className="sr-only"
          onChange={(e) => onFileChange(e.target.files[0])}
          accept="application/pdf,image/*" />
      </label>

      {file && !isLoading && (
        <div className="bg-gray-800/50 p-4 mt-6 rounded-lg flex items-center space-x-4 border border-gray-700">
          <FileIcon />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-200 truncate">{file.name}</p>
            <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
          </div>
          <button onClick={onClearFile} className="text-gray-500 hover:text-red-400 transition-colors p-1 rounded-full">&times;</button>
        </div>
      )}
    </div>
  );
}
