import React from 'react';

interface DeleteModalProps {
  showModal: boolean;
  message: string;  // Mensaje personalizado para cada tipo de acción
  confirmText: string;  // Texto del botón de confirmación
  cancelText: string;  // Texto del botón de cancelación
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  showModal,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold text-teal-700 mb-4">{message}</h2>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-500 transition duration-300"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-200 transition duration-300"
            onClick={onCancel}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
