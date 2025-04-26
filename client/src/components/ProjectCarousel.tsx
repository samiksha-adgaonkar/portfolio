import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectCarouselProps {
  images: string[];
}

export default function ProjectCarousel({ images }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  // Auto rotation for carousel
  useEffect(() => {
    if (isHovering) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      handleNext();
    }, 4000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isHovering, images.length]);

  return (
    <div 
      className="carousel-container h-48 relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div 
        className="carousel flex transition-transform duration-500 h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="carousel-item flex-shrink-0 w-full h-full">
            <img 
              src={image} 
              alt={`Project slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="carousel-prev absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-r-lg shadow-md hover:bg-white/90 text-primary"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="carousel-next absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-l-lg shadow-md hover:bg-white/90 text-primary"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
