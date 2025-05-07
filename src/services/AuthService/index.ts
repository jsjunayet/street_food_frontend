"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const SignUpUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`http://127.0.0.1:5000/api/v1/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    // if (result.success) {
    //   (await cookies()).set("accessToken", result.data.accessToken);
    //   //   (await cookies()).set("refreshToken", result?.data?.refreshToken);
    // }
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    console.log(res);

    if (result?.success) {
      (await cookies()).set("accessToken", result?.data?.accessToken);
      //   (await cookies()).set("refreshToken", result?.data?.refreshToken);
    }

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
};

export const getNewToken = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("refreshToken")!.value,
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
