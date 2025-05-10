"use client";
import { Button } from "@/components/ui/button";
import { SignUpUser } from "@/services/AuthService";
import { singleImageUpaload } from "@/utlity/cloudinary";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  name?: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const password = watch("password");

  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setloading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const onSubmit = async (data: FormData) => {
    setUploading(true);
    setloading(true);
    try {
      let imageUrl: string | null = null;

      if (selectedFile) {
        imageUrl = await singleImageUpaload(selectedFile);
        if (!imageUrl) {
          toast.error("Image upload failed.");
          return;
        }
      }

      const payload = {
        name: data.name || "", // Optional name
        email: data.email,
        password: data.password,
        image: imageUrl || "", // Optional image
      };

      const res = await SignUpUser(payload);

      if (res?.success) {
        setloading(false);
        toast.success(res.message);
        router.push("/login");
      } else {
        setloading(false);
        toast.error(res.message);
      }
    } catch (err: any) {
      setloading(false);
      toast.error(err?.message || "Something went wrong!");
    } finally {
      setloading(false);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#333333]">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name (Optional) */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name (Optional)
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="signup-email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="••••••"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Image Upload (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture (Optional)
            </label>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="image"
                className="w-full text-center cursor-pointer px-4 py-2 bg-[#FF6b35] text-white rounded-md hover:bg-[#FF6b35]/90 transition"
              >
                {selectedFile ? "Change Image" : "Upload Image"}
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {uploading && (
                <p className="text-sm text-blue-500">Uploading...</p>
              )}
            </div>

            {selectedFile && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Selected Image:
                </p>
                <Image
                  height={200}
                  width={400}
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md border"
                />
                <p className="text-sm text-gray-600 mt-1 truncate">
                  {selectedFile.name}
                </p>
              </div>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              {...register("terms", { required: "You must accept terms" })}
              className="h-4 w-4"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-[#FF6b35]">
                Terms and Conditions
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-sm text-red-500 mt-1">{errors.terms.message}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#FF6b35] hover:bg-[#FF6b35]/90"
          >
            {loading ? "SignUp...." : " Sign Up"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-[#FF6b35]">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
