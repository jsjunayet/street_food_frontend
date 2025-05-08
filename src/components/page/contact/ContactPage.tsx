"use client";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

const ContactPage = () => {
  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
    toast.success(
      "Your message has been sent. We'll get back with spicy updates soon!"
    );
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col items-center md:mt-0 mt-16 justify-center py-10 px-4 bg-white">
      <h1 className="text-4xl font-bold mb-8 text-gradient">Contact Us</h1>

      <Card className="max-w-4xl w-full shadow-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Contact Information */}
          <div className="bg-gradient-to-br from-yellow-500 to-red-500 p-8 rounded-l-lg text-white">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="text-2xl font-semibold mb-2">
                Let’s Talk Street Food!
              </CardTitle>
              <CardDescription className="text-white/90 text-base">
                Have a flavor idea, a spicy question, or just want to chat about
                our food stalls? We’d love to hear from you!
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 space-y-6">
              <div>
                <h3 className="text-lg font-medium">Location:</h3>
                <p className="opacity-90">
                  88 Foodie Lane, Dhaka Street, Bangladesh
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Phone:</h3>
                <p className="opacity-90">+880 1234 567890</p>
              </div>

              <div>
                <h3 className="text-lg font-medium">Email:</h3>
                <p className="opacity-90">contact@streetbite.com</p>
              </div>

              <div className="pt-4">
                <p className="mb-4 font-medium">
                  Follow us for daily food snaps:
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </CardContent>
          </div>

          {/* Contact Form */}
          <div className="p-8">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Share Your Flavor Thoughts
              </CardTitle>
              <CardDescription>
                Fill in the form below to send us your message or food feedback!
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Street Food Lover"
                            {...field}
                          />
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
                            placeholder="you@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us what you think about our spicy rolls or sweet desserts!"
                            className="resize-none"
                            {...field}
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-500 to-red-500 text-white hover:from-yellow-600 hover:to-red-600"
                  >
                    Submit Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContactPage;
