"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import ErrorPage from "./ErrorPage";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <ErrorPage
      code="404"
      title="Page Not Found"
      message={`Sorry, we couldn't find the page you're looking for. The URL ${pathname} doesn't exist.`}
    />
  );
};

export default NotFound;
