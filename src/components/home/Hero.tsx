
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const heroSlides = [
  {
    id: 1,
    title: "Experience the Ultimate Thrill",
    subtitle: "Discover our premium collection of superbikes",
    description: "Elevate your riding experience with our exclusive collection of high-performance motorcycles.",
    ctaText: "Shop Now",
    ctaLink: "/products",
    imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=3540&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Precision Engineering",
    subtitle: "The perfect blend of power and control",
    description: "From track to road, our motorcycles deliver uncompromising performance every time.",
    ctaText: "Browse Collection",
    ctaLink: "/products",
    imageUrl: "https://images.unsplash.com/photo-1558981852-426c6c22a060?q=80&w=3570&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "New Arrivals",
    subtitle: "2025 models now in stock",
    description: "Be the first to experience the latest innovations in motorcycle technology.",
    ctaText: "View New Models",
    ctaLink: "/products",
    imageUrl: "https://images.unsplash.com/photo-1558980394-34764db076b4?q=80&w=3570&auto=format&fit=crop"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`
            absolute inset-0 h-full w-full transition-all duration-1000 ease-in-out
            ${index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"}
          `}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 bg-black">
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="relative h-full z-30">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-3xl">
                <h2 
                  className={`
                    text-white font-bold text-4xl md:text-5xl lg:text-6xl mb-3 
                    transform transition-all duration-1000 ease-out
                    ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
                  `}
                  style={{ transitionDelay: "200ms" }}
                >
                  {slide.title}
                </h2>
                <p 
                  className={`
                    text-white/90 text-xl md:text-2xl mb-4
                    transform transition-all duration-1000 ease-out
                    ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
                  `}
                  style={{ transitionDelay: "300ms" }}
                >
                  {slide.subtitle}
                </p>
                <p 
                  className={`
                    text-white/80 text-base md:text-lg mb-8 max-w-lg
                    transform transition-all duration-1000 ease-out
                    ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
                  `}
                  style={{ transitionDelay: "400ms" }}
                >
                  {slide.description}
                </p>
                <div
                  className={`
                    transform transition-all duration-1000 ease-out
                    ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
                  `}
                  style={{ transitionDelay: "500ms" }}
                >
                  <Link to={slide.ctaLink}>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      {slide.ctaText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slider Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30">
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentSlide ? "bg-primary w-8" : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
