'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import FileUploader from '../../../components/FileUploader';
import ProgressIndicator from '../../../components/ProgressIndicator';
import LanguageToggle from '../../../components/LanguageToggle';

interface ToolInfo {
  title: string;
  description: string;
  acceptedFormats: string[];
  category: string;
}

interface ProcessingResult {
  success: boolean;
  resultUrl?: string;
  message?: string;
  originalSize?: number;
  originalName?: string;
  remainingCredits?: number;
  error?: string;
}

export default function ToolPage() {
  const params = useParams();
  const router = useRouter();
  const toolName = params.toolName as string;
  
  const [toolInfo, setToolInfo] = useState<ToolInfo | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    // Fetch tool information
    fetch(`/api/${toolName}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError('Tool not found');
        } else {
          setToolInfo(data);
        }
      })
      .catch(() => setError('Failed to load tool information'));
  }, [toolName]);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setError(null);
    setResult(null);
    setIsProcessing(true);
    setProgress(10);

    try {
      const formData = new FormData();
      formData.append('file', file);

      setProgress(30);

      const response = await fetch(`/api/${toolName}`, {
        method: 'POST',
        body: formData,
      });

      setProgress(70);

      const data = await response.json();

      setProgress(100);

      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || 'Processing failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during processing');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result?.resultUrl) {
      const link = document.createElement('a');
      link.href = result.resultUrl;
      link.download = `processed_${selectedFile?.name || 'file'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const resetTool = () => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
    setProgress(0);
    setIsProcessing(false);
  };

  if (error && !toolInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tool Not Found</h1>
          <p className="text-gray-600 mb-6">The requested tool could not be found.</p>
          <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                PDFSIR
              </Link>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600">{toolInfo?.title || 'Loading...'}</span>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {toolInfo && (
          <>
            {/* Tool Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {toolInfo.title}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {toolInfo.description}
              </p>
            </div>

            {/* Processing Steps */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Process Your File</h2>
                {(result || error) && (
                  <button
                    onClick={resetTool}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Process Another File
                  </button>
                )}
              </div>

              {/* Step 1: File Upload */}
              {!selectedFile && !result && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      1
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Upload Your File</h3>
                  </div>
                  
                  <FileUploader
                    onFileSelect={handleFileSelect}
                    acceptedFormats={toolInfo.acceptedFormats}
                    disabled={isProcessing}
                  />
                </div>
              )}

              {/* Step 2: Processing */}
              {isProcessing && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      2
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Processing File</h3>
                  </div>
                  
                  <ProgressIndicator 
                    progress={progress} 
                    status="processing"
                    message="Processing your file with PDF.co..."
                  />
                  
                  {selectedFile && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">📄</div>
                        <div>
                          <p className="font-medium text-gray-900">{selectedFile.name}</p>
                          <p className="text-sm text-gray-500">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Download Result */}
              {result && result.success && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      ✓
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Download Your File</h3>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">✅</div>
                        <div>
                          <p className="font-medium text-green-900">Processing Complete!</p>
                          <p className="text-sm text-green-700">Your file has been processed successfully.</p>
                        </div>
                      </div>
                      <button
                        onClick={handleDownload}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                      >
                        Download File
                      </button>
                    </div>
                    
                    {selectedFile && (
                      <div className="mt-4 pt-4 border-t border-green-200">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-green-700">Original:</span>
                            <span className="ml-2 font-medium">{selectedFile.name}</span>
                          </div>
                          <div>
                            <span className="text-green-700">Size:</span>
                            <span className="ml-2 font-medium">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">❌</div>
                    <div>
                      <p className="font-medium text-red-900">Processing Failed</p>
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure Processing</h3>
                <p className="text-sm text-gray-600">Your files are processed securely and deleted automatically after 2 hours.</p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-semibold text-gray-900 mb-2">Fast Processing</h3>
                <p className="text-sm text-gray-600">Powered by PDF.co API for reliable and fast document processing.</p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-semibold text-gray-900 mb-2">Works Everywhere</h3>
                <p className="text-sm text-gray-600">Access from any device - desktop, tablet, or mobile browser.</p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
