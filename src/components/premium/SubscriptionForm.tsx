import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { premiumUser } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z
    .string()
    .regex(/^01\d{9}$/, "Please enter a valid Bangladeshi phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const SubscriptionForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Initialize react-hook-form with our schema
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      agreeTerms: false,
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      // Prepare payment data to send to ShurjoPay
      const paymentData = {
        amount: 1000,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
      };
      const res = await premiumUser(paymentData);
      if (res.success) {
        toast.success("Redirecting to payment gateway...", {
          description:
            "You'll be redirected to ShurjoPay to complete your payment",
        });
        setIsLoading(false);
        setTimeout(() => {
          window.location.href = res?.data.checkoutUrl;
        }, 1000);
      } else {
        console.log(res.message);
        setIsLoading(false);
      }
    } catch (err: unknown) {
      console.log(err);
      toast.error("Payment processing failed", {
        description:
          "There was an issue connecting to the payment gateway. Please try again.",
      });
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
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
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="01XXXXXXXXX" {...field} />
                </FormControl>
                <FormDescription>
                  Enter a valid Bangladeshi phone number starting with 01
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Your address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agreeTerms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to the terms and conditions and privacy policy
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Card className="bg-muted/50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Premium Membership</h3>
              <p className="text-sm text-muted-foreground">Life Time Access</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-xl">1000৳</p>
              <p className="text-xs text-muted-foreground">One-time payment</p>
            </div>
          </div>
        </Card>

        <Button
          type="submit"
          className="w-full "
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>Pay with ShurjoPay</>
          )}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          <p>Secure payment processed by ShurjoPay</p>
        </div>
      </form>
    </Form>
  );
};

export default SubscriptionForm;
