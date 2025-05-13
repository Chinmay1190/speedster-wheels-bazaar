
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useCart } from "../../contexts/CartContext";
import { formatPrice } from "../../utils/format";

interface PaymentSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const PaymentSummary = ({ subtotal, shipping, tax, total }: PaymentSummaryProps) => {
  const { cartItems } = useCart();
  
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm sticky top-20">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      
      {/* Items summary */}
      <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-md overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      {/* Price breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax (18% GST)</span>
          <span>{formatPrice(tax)}</span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      {/* Total */}
      <div className="flex justify-between font-semibold text-lg mb-6">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      
      <div className="pt-3">
        <Link to="/cart" className="text-sm text-primary flex justify-center">
          Return to cart
        </Link>
      </div>
    </div>
  );
};

export default PaymentSummary;
