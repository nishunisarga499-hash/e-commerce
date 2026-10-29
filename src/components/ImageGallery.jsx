import { useState } from "react";

function ImageGallery({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeImages = images?.length ? images : [];

  if (safeImages.length === 0) return <div className="gallery gallery--empty">No image available</div>;

  return (
    <div className="gallery">
      <div className="gallery__main">
        <img src={safeImages[activeIndex]} alt={`${title} - view ${activeIndex + 1}`} />
      </div>

      {safeImages.length > 1 && (
        <div className="gallery__thumbs">
          {safeImages.map((src, index) => (
            <button
              key={src + index}
              className={`gallery__thumb ${index === activeIndex ? "gallery__thumb--active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
