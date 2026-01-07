import React from 'react';

const YouTubeModal = ({ isOpen, onClose, youtubeId }) => {
  if (!isOpen || !youtubeId) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
      onClick={onClose} // Close when clicking outside the iframe
    >
      <div
        className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        ></iframe>
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

export default YouTubeModal;

