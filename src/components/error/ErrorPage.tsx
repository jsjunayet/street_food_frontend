"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  title?: string;
  message?: string;
  code?: string | number;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  title = "Oops! Something went wrong",
  message = "We've encountered an error while processing your request.",
  code = "500",
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle className="h-10 w-10 text-red-500" />
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-5xl font-bold text-gray-800 mb-2">{code}</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{title}</h1>
            <p className="text-gray-600">{message}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => router.push("/")}
              variant="default"
              className="w-full sm:w-auto"
            >
              Go Home
            </Button>

            <Button
              onClick={() => router.back()}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Go Back
            </Button>
          </div>
        </div>

        <div className="h-2 bg-gradient-to-r from-street-orange via-street-yellow to-street-red"></div>
      </div>
    </div>
  );
};

export default ErrorPage;
