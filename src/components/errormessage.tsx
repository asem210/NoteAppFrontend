// src/components/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return message ? <p className="text-red-500 text-sm mb-4">{message}</p> : null;
};

export default ErrorMessage;
