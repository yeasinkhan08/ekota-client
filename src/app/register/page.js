"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Email and password registration
  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const image = formData.get("photoURL");
    const password = formData.get("password");

    // Password validation
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !hasMinLength) {
      toast.error(
        "Password must contain uppercase, lowercase, and at least 6 characters.",
      );
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: image || undefined,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data) {
        toast.success("Your account has been created successfully!");

        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google registration

  const handleGoogleRegister = async () => {
    try {
      setGoogleLoading(true);

      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/register",
      });

      if (error) {
        console.error("Google registration error:", error);

        toast.error(
          error.message || "Google registration failed. Please try again.",
        );

        setGoogleLoading(false);
        return;
      }

      // Better Auth handles the Google redirect automatically.
    } catch (error) {
      console.error("Google registration failed:", error);

      toast.error("Google registration failed. Please try again.");

      setGoogleLoading(false);
    }
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-[#FAF9F6] px-5 py-16 transition-colors dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-green-900 dark:text-green-400">
          Create an Account
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Join Ekota and make a difference together.
        </p>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="mt-8 space-y-5">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-200">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:ring-green-950"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-200">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:ring-green-950"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-200">
              Photo URL
            </label>

            <input
              type="url"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:ring-green-950"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-800 dark:text-gray-200">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:ring-green-950"
            />

            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              At least 6 characters, including uppercase and lowercase letters.
            </p>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full rounded-lg bg-green-800 py-3 font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />

          <span className="text-sm text-gray-400 dark:text-gray-500">OR</span>

          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Google Registration */}
        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={loading || googleLoading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-3 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          <span className="text-lg font-bold text-blue-600">G</span>

          {googleLoading ? "Connecting..." : "Continue with Google"}
        </button>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-green-800 hover:underline dark:text-green-400"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}
