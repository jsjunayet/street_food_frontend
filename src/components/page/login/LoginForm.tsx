"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { loginUser } from "@/services/AuthService";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("callbackUrl");
  // const redirect = false;

  const router = useRouter();
  const { setIsLoading } = useUser();

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const res = await loginUser(data);

      if (res?.success) {
        if (redirect) {
          router.push(redirect);
          toast.success(res?.message);
        } else {
          router.push("/");
          toast.success(res?.message);
        }
      } else {
        setIsLoading(false);
        toast.error(res?.message);
      }
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err.message || "Something went wrong!");
    }
  };

  const handleDefaultLogin = (type: "admin" | "user" | "premium") => {
    const presets = {
      admin: { email: "admin1@gmail.com", password: "123456" },
      user: { email: "user10@gmail.com", password: "123456" },
      premium: { email: "premium@gmail.com", password: "123456" },
    };

    const selected = presets[type];
    setValue("email", selected.email);
    setValue("password", selected.password);
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-2 md:px-0">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
          <Link
            href="/"
            className="text-base font-medium text-primary hover:underline hover:text-primary/80 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* === Role Buttons === */}
        <div className="mb-6 grid grid-cols-3 gap-2">
          <Button
            type="button"
            onClick={() => handleDefaultLogin("user")}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            User
          </Button>
          <Button
            type="button"
            onClick={() => handleDefaultLogin("premium")}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Premium
          </Button>
          <Button
            type="button"
            onClick={() => handleDefaultLogin("admin")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Admin
          </Button>
        </div>

        {/* === Form === */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6b35]"
              placeholder="youremail@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-[#FF6b35] hover:text-[#D64933]"
              >
                Forgot Password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6b35]"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-[#FF6b35] hover:bg-[#FF6b35]/90"
          >
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#FF6b35] hover:text-[#D64933]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
