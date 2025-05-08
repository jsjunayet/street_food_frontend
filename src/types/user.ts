export interface IUser {
  userId: string;
  email: string;
  isPremimum?: boolean;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
}
