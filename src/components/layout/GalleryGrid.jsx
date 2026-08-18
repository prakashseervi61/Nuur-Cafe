import React from 'react'
import { galleryImages } from '../../data/gallery'

const GalleryGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {galleryImages.map((image) => (
        <div key={image.id} className="relative overflow-hidden rounded-lg">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-[1.05] cursor-pointer"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center transition-all duration-300 hover:bg-opacity-30">
            <span className="text-white text-sm font-medium">{image.caption}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GalleryGrid