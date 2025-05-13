
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, CreditCard, Wallet, Package, IndianRupee, Loader2 } from "lucide-react";

// Form validation schema
const checkoutSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Please enter your full address" }),
  city: z.string().min(2, { message: "Please enter your city" }),
  state: z.string().min(2, { message: "Please enter your state" }),
  zipCode: z.string().min(6, { message: "Please enter a valid ZIP code" }),
  paymentMethod: z.enum(["card", "upi", "cod"], { 
    required_error: "Please select a payment method" 
  })
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  onSubmit: () => void;
  isProcessing: boolean;
}

const CheckoutForm = ({ onSubmit, isProcessing }: CheckoutFormProps) => {
  const [showCardFields, setShowCardFields] = useState(false);
  const [showUpiField, setShowUpiField] = useState(false);
  
  // Initialize form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      paymentMethod: "card",
    }
  });
  
  // Handle form submission
  const handleSubmit = (data: CheckoutFormValues) => {
    console.log("Form data:", data);
    onSubmit();
  };
  
  // Handle payment method change
  const handlePaymentMethodChange = (value: string) => {
    setShowCardFields(value === "card");
    setShowUpiField(value === "upi");
  };
  
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Shipping & Payment Details</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Shipping Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Shipping Address</h3>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Mumbai" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="Maharashtra" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl>
                      <Input placeholder="400001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <Separator />
          
          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Method</h3>
            
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        handlePaymentMethodChange(value);
                      }}
                      defaultValue={field.value}
                      className="space-y-3"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 cursor-pointer hover:bg-accent">
                        <FormControl>
                          <RadioGroupItem value="card" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer flex-1">
                          <div className="flex items-center">
                            <CreditCard className="mr-2" size={18} />
                            <span>Credit / Debit Card</span>
                          </div>
                        </FormLabel>
                      </FormItem>
                      
                      <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 cursor-pointer hover:bg-accent">
                        <FormControl>
                          <RadioGroupItem value="upi" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer flex-1">
                          <div className="flex items-center">
                            <Wallet className="mr-2" size={18} />
                            <span>UPI Payment</span>
                          </div>
                        </FormLabel>
                      </FormItem>
                      
                      <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 cursor-pointer hover:bg-accent">
                        <FormControl>
                          <RadioGroupItem value="cod" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer flex-1">
                          <div className="flex items-center">
                            <IndianRupee className="mr-2" size={18} />
                            <span>Cash on Delivery</span>
                          </div>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Conditional Credit Card Fields */}
            {showCardFields && (
              <div className="bg-accent/30 rounded-md p-4 mt-4 space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <FormLabel>Card Number</FormLabel>
                    <Input placeholder="1234 5678 9012 3456" />
                  </div>
                  
                  <div>
                    <FormLabel>Cardholder Name</FormLabel>
                    <Input placeholder="John Doe" />
                  </div>
                  
                  <div>
                    <FormLabel>Expiration Date</FormLabel>
                    <Input placeholder="MM/YY" />
                  </div>
                  
                  <div>
                    <FormLabel>CVV</FormLabel>
                    <Input placeholder="123" type="password" maxLength={3} />
                  </div>
                </div>
              </div>
            )}
            
            {/* Conditional UPI Field */}
            {showUpiField && (
              <div className="bg-accent/30 rounded-md p-4 mt-4 space-y-4 animate-fade-in">
                <div>
                  <FormLabel>UPI ID</FormLabel>
                  <Input placeholder="name@upi" />
                </div>
              </div>
            )}
          </div>
          
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Complete Order
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
