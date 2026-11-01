"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-green-900">Create an Account</h1>

        <p className="mt-2 text-gray-600">
          Join Ekota and make a difference together.
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Photo URL</label>
            <input
              type="url"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-green-700"
            />
            <p className="mt-2 text-xs text-gray-500">
              At least 6 characters, including uppercase and lowercase letters.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-800 py-3 font-semibold text-white transition hover:bg-green-900 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-green-800 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}
