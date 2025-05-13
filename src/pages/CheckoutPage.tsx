
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useCart } from "../contexts/CartContext";
import CheckoutForm from "../components/checkout/CheckoutForm";
import PaymentSummary from "../components/checkout/PaymentSummary";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calculate order values
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax + shipping;
  
  // Handle order submission
  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      navigate("/checkout-success", { 
        state: { 
          orderTotal: total,
          orderNumber: "ORD" + Math.floor(100000 + Math.random() * 900000)
        } 
      });
    }, 1500);
  };
  
  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    return navigate("/cart");
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Checkout form */}
          <div className="lg:col-span-2">
            <CheckoutForm 
              onSubmit={handleCheckout}
              isProcessing={isProcessing}
            />
          </div>
          
          {/* Right column: Order summary */}
          <div>
            <PaymentSummary 
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
