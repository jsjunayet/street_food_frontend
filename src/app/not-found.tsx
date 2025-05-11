"use client";
import ErrorPage from "@/components/error/ErrorPage";

const NotFoundPage = () => {
  return (
    <div>
      <ErrorPage
        code={404}
        title="Page Not Found"
        message="Sorry, the page you are looking for does not exist or has been moved."
      />
    </div>
  );
};

export default NotFoundPage;
