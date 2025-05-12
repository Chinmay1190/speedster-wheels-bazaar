
export default function TechSpecs() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Cutting-Edge Technology</h2>
            <div className="w-20 h-1 bg-primary mb-6"></div>
            <p className="text-muted-foreground mb-6">
              Our motorcycles feature the latest advancements in motorcycle technology,
              designed to enhance your riding experience with improved performance, safety, and comfort.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <svg 
                    className="h-6 w-6 text-primary" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 10V3L4 14h7v7l9-11h-7z" 
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Advanced Electronics</h3>
                  <p className="text-muted-foreground">
                    Featuring sophisticated rider aids including traction control, wheelie control, 
                    and multiple riding modes for optimized performance in any condition.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <svg 
                    className="h-6 w-6 text-primary" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Safety Systems</h3>
                  <p className="text-muted-foreground">
                    State-of-the-art ABS with cornering capabilities and advanced stability control
                    systems for safer riding in challenging conditions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <svg 
                    className="h-6 w-6 text-primary" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Engine Technology</h3>
                  <p className="text-muted-foreground">
                    High-performance engines with variable valve timing, ride-by-wire throttle control,
                    and advanced combustion chambers for maximum power and efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1558980394-dbb977039a2e?q=80&w=1000&auto=format&fit=crop" 
                alt="Motorcycle engine closeup" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Floating Specs */}
              <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-pulse-light">
                <div className="text-sm font-semibold">Power Output</div>
                <div className="text-lg font-bold text-primary">200+ HP</div>
              </div>
              
              <div className="absolute top-2/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-pulse-light" style={{ animationDelay: "1s" }}>
                <div className="text-sm font-semibold">Top Speed</div>
                <div className="text-lg font-bold text-primary">299 km/h</div>
              </div>
              
              <div className="absolute bottom-1/4 left-1/3 transform -translate-x-1/2 translate-y-1/2 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-pulse-light" style={{ animationDelay: "2s" }}>
                <div className="text-sm font-semibold">Acceleration</div>
                <div className="text-lg font-bold text-primary">0-100 in 3s</div>
              </div>
            </div>
            
            {/* Background decorative element */}
            <div className="absolute -bottom-5 -right-5 w-64 h-64 bg-primary/10 rounded-full -z-10"></div>
            <div className="absolute -top-5 -left-5 w-32 h-32 bg-primary/20 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
