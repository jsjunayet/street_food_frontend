"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { getNewToken } from "../AuthService";

// Function to check if the token is expired
export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);

    // Check if the token's expiration date is less than the current time
    return decoded.exp * 1000 < Date.now();
  } catch (err: any) {
    console.error(err);
    return true;
  }
};

// Function to get a valid token, either from cookies or by refreshing it
export const getValidToken = async (): Promise<string> => {
  const cookieStore = await cookies(); // Await to get the cookie store

  let token = cookieStore.get("accessToken")?.value; // Try to get the token from cookies

  // If no token is found or the token is expired, request a new one
  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken(); // Get a new token from your AuthService
    token = data?.accessToken; // Extract the token from the response

    // Ensure token is defined before setting it in the cookies
    if (token) {
      await cookieStore.set("accessToken", token, {
        httpOnly: true, // Make sure the cookie is not accessible via JavaScript
        path: "/", // Set the cookie's path to be accessible for all pages
      });
    } else {
      throw new Error("Failed to obtain a valid token from the auth service.");
    }
  }

  return token; // Return the valid token (no need for '!' as we ensure it's defined)
};
