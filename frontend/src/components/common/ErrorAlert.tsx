import { AlertCircle, X } from "lucide-react";
import React from "react";

interface ErrorAlertProps {
  error: string | null;
  onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg z-50 max-w-md">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-red-800">{error}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-3 text-red-400 hover:text-red-600 transition-colors"
          aria-label="Close error message"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;
