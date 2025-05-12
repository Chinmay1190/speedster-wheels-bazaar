
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../utils/format";
import { toast } from "sonner";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const shipping = 0; // Free shipping
  const discount = 0; // No discount yet
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax + shipping - discount;
  
  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };
  
  const handlePromoCodeApply = () => {
    if (!promoCode) return;
    
    // Mock promo code check
    if (promoCode.toUpperCase() === "WELCOME10") {
      toast.success("Promo code applied! 10% discount added.");
    } else {
      toast.error("Invalid promo code. Please try again.");
    }
    
    setPromoCode("");
  };
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    navigate("/checkout");
  };
  
  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link to="/products">
                <Button className="bg-primary hover:bg-primary/90">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg p-6">
                  <div className="flex justify-between mb-6">
                    <h2 className="text-xl font-semibold">Cart Items ({totalItems})</h2>
                    <Button variant="ghost" size="sm" onClick={clearCart}>
                      Clear Cart
                    </Button>
                  </div>
                  
                  {/* Cart Item List */}
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-24 h-24 rounded-md overflow-hidden">
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div>
                              <Link to={`/product/${item.id}`}>
                                <h3 className="font-medium hover:text-primary transition-colors">
                                  {item.name}
                                </h3>
                              </Link>
                              <p className="text-sm text-muted-foreground mb-2">
                                {item.brand}
                              </p>
                              <div className="text-sm mb-2">
                                <span className="font-medium">Price: </span>
                                {formatPrice(item.price)}
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                              <div className="flex items-center mb-2">
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="w-8 h-8 flex items-center justify-center border rounded-l-md"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="w-12 h-8 flex items-center justify-center border-t border-b">
                                  {item.quantity}
                                </span>
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center border rounded-r-md"
                                >
                                  +
                                </button>
                              </div>
                              
                              <div className="font-semibold">
                                {formatPrice(item.price * item.quantity)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 flex justify-end">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                        
                        <Separator className="sm:hidden my-4" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-card rounded-lg p-6 sticky top-20">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                  
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
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-semibold text-lg mb-6">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  
                  {/* Promo Code */}
                  <div className="mb-6">
                    <div className="flex mb-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="rounded-r-none"
                      />
                      <Button 
                        onClick={handlePromoCodeApply}
                        className="rounded-l-none"
                      >
                        Apply
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Try "WELCOME10" for a demo discount
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-primary hover:bg-primary/90 mb-3"
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Link to="/products">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
