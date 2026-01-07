import React from 'react';

const ImageModal = ({ isOpen, onClose, imageUrl, title }) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg overflow-hidden shadow-2xl max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={imageUrl} alt={title || 'Portfolio Image'} className="max-w-full max-h-[90vh] object-contain" />
        {title && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
            {title}
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-3xl font-bold p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-opacity duration-200"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;

