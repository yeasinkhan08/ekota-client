"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserRound,
  Mail,
  Camera,
  Save,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import PageSkeleton from "@/components/shared/PageSkeleton";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending, refetch } = authClient.useSession();

  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);

  // Load existing profile information.
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user?.id, user?.name, user?.image]);

  // Redirect users who are not logged in.
  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, user, router]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanImage = image.trim();

    if (cleanName.length < 2) {
      toast.error("Name must contain at least 2 characters.");
      return;
    }

    if (cleanName.length > 80) {
      toast.error("Name cannot exceed 80 characters.");
      return;
    }

    // Validate profile picture URL if supplied.
    if (cleanImage) {
      try {
        const url = new URL(cleanImage);

        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error("Invalid image URL");
        }
      } catch {
        toast.error("Please enter a valid profile image URL.");
        return;
      }
    }

    try {
      setSaving(true);

      const updateData = {
        name: cleanName,
      };

      // Only update the picture when a URL is supplied.
      if (cleanImage) {
        updateData.image = cleanImage;
      }

      const { error } = await authClient.updateUser(updateData);

      if (error) {
        throw new Error(error.message || "Profile update failed");
      }

      // Refresh the authenticated session.
      await refetch();

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (isPending || !user) {
    return <PageSkeleton variant="profile" />;
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-5 py-12 dark:bg-gray-950 md:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-green-800 dark:text-gray-400 dark:hover:text-green-400"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        {/* Heading */}
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-800 dark:text-green-400">
            Account Settings
          </p>

          <h1 className="text-3xl font-bold text-[#102A22] dark:text-white md:text-4xl">
            My Profile
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            View and update your Ekota account information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          {/* Profile Header */}
          <div className="border-b border-gray-100 bg-green-50/70 px-6 py-8 dark:border-gray-800 dark:bg-gray-800 sm:px-9">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              {/* Profile Image */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-green-100 text-green-800 shadow-sm dark:border-gray-700 dark:bg-green-950 dark:text-green-400">
                {image ? (
                  <img
                    src={image}
                    alt={name || "Profile picture"}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <UserRound size={42} />
                )}
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>

                <p className="mt-2 text-xs font-medium text-green-800 dark:text-green-400">
                  Ekota Community Member
                </p>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="p-6 sm:p-9">
            <div className="mb-7">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Personal Information
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Update the information displayed on your profile.
              </p>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={80}
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:ring-green-950"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={user.email || ""}
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 py-3.5 pl-11 pr-4 text-sm text-gray-500 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                  />
                </div>

                <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                  Your registered email address cannot be changed here.
                </p>
              </div>

              {/* Profile Image URL */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  <Camera
                    size={17}
                    className="text-green-700 dark:text-green-400"
                  />
                  Profile Picture URL
                </label>

                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/profile.jpg"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:ring-green-950"
                />

                <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                  Enter a new image URL to update your profile picture. Leave it
                  unchanged to keep your current picture.
                </p>
              </div>

              {/* Save Button */}
              <div className="border-t border-gray-100 pt-6 dark:border-gray-800">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-800 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {saving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}

                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
