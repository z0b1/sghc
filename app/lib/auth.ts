/**
 * Admin Authentication Utilities
 * Simple JWT-based auth for admin users
 */

import { jwtVerify, SignJWT } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_SECRET_KEY || "your-super-secret-key-change-this-in-production"
);

export interface AdminPayload {
  [key: string]: unknown;
  adminId: string;
  email: string;
}

/**
 * Create a JWT token for admin authentication
 */
export async function createToken(payload: AdminPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(SECRET_KEY);

  return token;
}

/**
 * Verify a JWT token
 */
export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try {
    const verified = await jwtVerify(token, SECRET_KEY);
    return verified.payload as AdminPayload;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

/**
 * Simple password verification (in production, use bcrypt)
 */
export function verifyPassword(
  inputPassword: string,
  storedPassword: string
): boolean {
  // IMPORTANT: In production, use bcrypt or similar
  // This is just for demo - passwords should never be plain text
  return inputPassword === storedPassword;
}

/**
 * Hash a password (placeholder - use bcrypt in production)
 */
export function hashPassword(password: string): string {
  // IMPORTANT: This is a placeholder
  // In production, use bcrypt.hash()
  return password;
}
