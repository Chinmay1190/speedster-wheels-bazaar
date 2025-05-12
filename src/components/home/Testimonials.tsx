
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Professional Racer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "I've ridden motorcycles all my life, and the Panigale V4 from SuperBikes is truly exceptional. The power delivery and handling are unmatched. Their after-sales service is fantastic too.",
    rating: 5
  },
  {
    id: 2,
    name: "Ananya Sharma",
    role: "Motorcycle Enthusiast",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "As a woman rider, I often feel ignored at motorcycle shops, but SuperBikes treated me with respect and helped me find the perfect bike for my riding style. The Street Triple RS is perfect!",
    rating: 5
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "Weekend Rider",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    content: "The BMW S1000RR I purchased from SuperBikes exceeded my expectations. Their team was knowledgeable and helped me with all the paperwork. Delivery was prompt and the bike was in perfect condition.",
    rating: 4
  },
  {
    id: 4,
    name: "Priya Patel",
    role: "Track Day Enthusiast",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    content: "I've bought three bikes from SuperBikes over the years, and they never disappoint. The quality of their motorcycles and the expertise of their staff makes them my go-to shop.",
    rating: 5
  },
  {
    id: 5,
    name: "Arjun Reddy",
    role: "Touring Rider",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    content: "The Multistrada V4 S I purchased for my cross-country tours has been reliable and comfortable. SuperBikes also helped me select the right accessories for my touring needs.",
    rating: 4
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  
  const handlePrev = () => {
    setDirection('prev');
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setDirection('next');
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 'next' : 'prev');
    setActiveIndex(index);
  };
  
  const getTestimonial = (index: number) => {
    return testimonials[index % testimonials.length];
  };
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">What Our Customers Say</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from our satisfied customers about their experiences with our motorcycles and services.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="relative">
            <Card className="border shadow-md">
              <CardContent className="p-8 relative z-10">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                      <img 
                        src={getTestimonial(activeIndex).avatar} 
                        alt={getTestimonial(activeIndex).name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-center mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-5 h-5 ${
                            i < getTestimonial(activeIndex).rating ? "text-yellow-500" : "text-muted"
                          }`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-grow md:pt-4">
                    <div className="relative">
                      <svg 
                        className="absolute -top-6 -left-6 h-12 w-12 text-muted opacity-20" 
                        fill="currentColor" 
                        viewBox="0 0 32 32"
                      >
                        <path d="M10 8v12H6v-4c0-2.21 1.79-4 4-4V8zm12 0v4c2.21 0 4 1.79 4 4v4h-4V8h4z" />
                      </svg>
                      
                      <p className="italic text-lg mb-4 relative z-10">"{getTestimonial(activeIndex).content}"</p>
                      
                      <div>
                        <h4 className="font-semibold text-lg">{getTestimonial(activeIndex).name}</h4>
                        <p className="text-muted-foreground">{getTestimonial(activeIndex).role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-between mt-8">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-primary w-8" : "bg-muted hover:bg-primary/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="rounded-full"
              >
                <svg 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  stroke="currentColor" 
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7" 
                  />
                </svg>
                <span className="sr-only">Previous testimonial</span>
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="rounded-full"
              >
                <svg 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
                <span className="sr-only">Next testimonial</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
