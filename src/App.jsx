import { useState } from "react";
import Header from "./components/Header";
import FileUploader from "./components/FileUploader";
import SummaryControls from "./components/SummaryControls";
import ResultDisplay from "./components/ResultDisplay";
import { extractTextFromPdf } from "./utils/pdfUtils";
import { extractTextFromImage } from "./utils/ocrUtils";

export default function App() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryLength, setSummaryLength] = useState("medium");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [processingStatus, setProcessingStatus] = useState("");
  const [activeView, setActiveView] = useState("summary");

  const processDocument = async (docFile) => {
    setFile(docFile);
    setIsLoading(true);
    setError("");
    setExtractedText("");
    setSummary("");
    setProcessingStatus("Processing...");

    try {
      let text = "";
      if (docFile.type === "application/pdf") {
        setProcessingStatus("Extracting text from PDF...");
        text = await extractTextFromPdf(docFile);
      } else if (docFile.type.startsWith("image/")) {
        setProcessingStatus("Running OCR...");
        text = await extractTextFromImage(docFile, setProcessingStatus);
      } else {
        throw new Error("Unsupported file type. Upload PDF or image.");
      }
      setExtractedText(text);
      setActiveView("verbatim");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setProcessingStatus("");
    }
  };

  const generateSummary = async () => {
    const apiKey = "AIzaSyDFH6CmrRCqEsjSdLA8dnxJBDfWC1I_Wto"; // put your key here
    if (!extractedText) return setError("No text to summarize.");

    setIsLoading(true);
    setError("");
    setSummary("");
    setProcessingStatus("Generating summary...");

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: extractedText }] }],
            systemInstruction: { parts: [{ text: `Summarize in ${summaryLength} length.` }] }
          }),
        }
      );
      const result = await response.json();
      const summaryText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      setSummary(summaryText || "No summary generated.");
      setActiveView("summary");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setProcessingStatus("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-800/30 p-6 rounded-2xl border border-gray-700 space-y-6">
            <FileUploader onFileChange={processDocument} file={file} isLoading={isLoading} onClearFile={() => setFile(null)} />
            {extractedText && !isLoading && (
              <SummaryControls
                summaryLength={summaryLength}
                onLengthChange={setSummaryLength}
                onGenerate={generateSummary}
                isLoading={isLoading}
                hasExtractedText={!!extractedText}
              />
            )}
          </div>
          <ResultDisplay
            activeView={activeView}
            onViewChange={setActiveView}
            isLoading={isLoading}
            processingStatus={processingStatus}
            error={error}
            summary={summary}
            extractedText={extractedText}
          />
        </div>
      </div>
    </div>
  );
}
