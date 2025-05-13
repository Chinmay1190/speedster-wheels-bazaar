
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Check, ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "../utils/format";

const CheckoutSuccessPage = () => {
  const location = useLocation();
  const { orderTotal = 0, orderNumber = "ORDER123456" } = location.state || {};
  
  const [animationStage, setAnimationStage] = useState(0);
  
  useEffect(() => {
    // Animation sequence timing
    const timers = [
      setTimeout(() => setAnimationStage(1), 500),  // Show checkmark
      setTimeout(() => setAnimationStage(2), 1000), // Show order details
      setTimeout(() => setAnimationStage(3), 1500)  // Show buttons
    ];
    
    // Cleanup timers
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);
  
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/95 px-4">
      <div className="max-w-md w-full bg-card rounded-lg p-8 shadow-lg text-center">
        {/* Success Icon */}
        <div 
          className={`mx-auto rounded-full bg-green-100 p-4 w-24 h-24 flex items-center justify-center mb-6 transform transition-all duration-500 ${
            animationStage >= 1 ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          <Check className="w-12 h-12 text-green-600" />
        </div>
        
        {/* Success Message */}
        <div 
          className={`space-y-2 transition-all duration-500 delay-300 ${
            animationStage >= 2 ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
          }`}
        >
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Your order has been placed and is being processed
          </p>
        </div>
        
        {/* Order Details */}
        <div 
          className={`mt-8 p-4 border border-border rounded-md bg-accent/20 transition-all duration-500 delay-500 ${
            animationStage >= 2 ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
          }`}
        >
          <div className="flex justify-between mb-2">
            <span className="font-medium">Order Number:</span>
            <span>{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Total Amount:</span>
            <span className="font-semibold">{formatPrice(orderTotal)}</span>
          </div>
        </div>
        
        {/* Shipping Information */}
        <div 
          className={`mt-6 flex items-center justify-center text-muted-foreground transition-all duration-500 delay-700 ${
            animationStage >= 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          <Package size={16} className="mr-2" />
          <span>Your order will be shipped within 2-3 business days</span>
        </div>
        
        {/* Action Buttons */}
        <div 
          className={`mt-8 space-y-3 transition-all duration-500 delay-1000 ${
            animationStage >= 3 ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
          }`}
        >
          <Link to="/">
            <Button className="w-full bg-primary hover:bg-primary/90">
              Continue Shopping <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
