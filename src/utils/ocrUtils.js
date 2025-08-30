import Tesseract from "tesseract.js";

export async function extractTextFromImage(file, setProcessingStatus) {
  const { data: { text } } = await Tesseract.recognize(file, 'eng', {
    logger: m => setProcessingStatus && setProcessingStatus(`OCR: ${m.status} (${(m.progress * 100).toFixed(0)}%)`),
  });
  return text;
}
