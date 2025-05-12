
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PromoBanner() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-black">
        <img 
          src="https://images.unsplash.com/photo-1626266465022-15608e6a8d3f?q=80&w=1000&auto=format&fit=crop" 
          alt="Motorcycle on track"
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center text-white py-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experience the <span className="text-primary">Ultimate Ride</span>
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Limited time offer! Get exclusive deals on selected models with 0% financing options and complimentary first service.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/products">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Shop Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Book Test Ride
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
