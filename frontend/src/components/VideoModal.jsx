import React from 'react';

const VideoModal = ({ isOpen, onClose, videoUrl, title }) => {
  if (!isOpen || !videoUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-black rounded-lg overflow-hidden shadow-2xl max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={videoUrl}
          controls
          autoPlay
          className="w-full max-h-[80vh] object-contain bg-black"
        />
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

export default VideoModal;
