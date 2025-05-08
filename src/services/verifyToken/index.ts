"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { getNewToken } from "../AuthService";

export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);

    return decoded.exp * 1000 < Date.now();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return true;
  }
};

export const getValidToken = async (): Promise<string> => {
  const cookieStore = cookies();

  let token = cookieStore.get("accessToken")?.value;

  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data?.accessToken;

    // ✅ এখন এটা বৈধ কারণ আমরা Server Action context এ আছি
    cookieStore.set("accessToken", token, {
      httpOnly: true,
      path: "/",
    });
  }

  return token!;
};
