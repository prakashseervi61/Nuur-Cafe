import React from 'react'

const GalleryViewer = ({ image, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-[90vh] flex items-center" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-70 transition-colors"
          aria-label="Close"
        >
          ×
        </button>
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-full object-contain rounded-lg"
        />
        <figcaption className="absolute bottom-4 left-0 right-0 text-center text-white text-lg">
          {image.caption}
        </figcaption>
      </div>
    </div>
  )
}

export default GalleryViewer