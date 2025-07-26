'use client';

interface ProgressIndicatorProps {
  progress: number;
  status?: 'uploading' | 'processing' | 'complete' | 'error';
  message?: string;
}

export default function ProgressIndicator({ 
  progress, 
  status = 'processing', 
  message 
}: ProgressIndicatorProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'uploading':
        return 'bg-blue-500';
      case 'processing':
        return 'bg-yellow-500';
      case 'complete':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getStatusMessage = () => {
    if (message) return message;
    
    switch (status) {
      case 'uploading':
        return 'Uploading file...';
      case 'processing':
        return 'Processing your file...';
      case 'complete':
        return 'Processing complete!';
      case 'error':
        return 'An error occurred';
      default:
        return 'Processing...';
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          {getStatusMessage()}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round(progress)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${getStatusColor()}`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      
      {status === 'processing' && (
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-500" />
          <span>This may take a few moments...</span>
        </div>
      )}
    </div>
  );
}
