"use server";

import prisma from "@/lib/db";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function registerUserAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const refCode = formData.get("refCode") as string;

  if (!name || !email || !password) {
    return { error: "Please fill in all fields" };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "User already exists with this email" };
    }

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: password, // Again, should be hashed!
        plan: "BASIC",
        activePlanPurchased: false
      }
    });

    // Handle referral if passed
    if (refCode) {
      const referrer = await prisma.user.findUnique({ where: { id: refCode } });
      if (referrer) {
        await prisma.referral.create({
          data: {
            referrerId: referrer.id,
            refereeId: newUser.id
          }
        });
      }
    }

    return { success: "Account created successfully! Please login." };
  } catch (err) {
    console.error("Registration error:", err);
    return { error: "Something went wrong. Please try again." };
  }
}

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false, // Handle redirect on client to use toasts
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}
