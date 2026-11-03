"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import API_URL from "@/lib/api";
import { toast } from "sonner";

import {
  CalendarDays,
  MapPin,
  ImagePlus,
  Type,
  AlignLeft,
  Tag,
  ArrowRight,
  HandHeart,
  Sparkles,
  Leaf,
  Users,
  Heart,
} from "lucide-react";

export default function CreateEventPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const eventData = Object.fromEntries(formData.entries());

    try {
      setIsLoading(true);

      // Get JWT token from Better Auth
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Authentication failed. Please login again.");
      }

      // Send event data to Express backend
      const response = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create event");
      }

      toast.success("Event created successfully!");
      router.push("/events");
    } catch (error) {
      console.error("Create event error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-5 py-12 transition-colors dark:bg-gray-950 md:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-300">
            <Sparkles size={16} />
            Make an Impact
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#102A22] dark:text-white md:text-5xl">
            Bring Your{" "}
            <span className="text-green-700 dark:text-green-400">
              Community
            </span>
            <br className="hidden md:block" /> Together.
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-gray-500 dark:text-gray-400">
            Create meaningful events, connect with passionate people, and turn
            small acts into a powerful movement.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Form Card */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:p-9">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
                  Event Information
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Fill in the details to publish your event.
                </p>
              </div>

              <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-400 sm:flex">
                <HandHeart size={25} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Title */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  <Type
                    size={16}
                    className="text-green-700 dark:text-green-400"
                  />
                  Event Title
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Give your event a memorable name"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:bg-gray-800 dark:focus:ring-green-950"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  <AlignLeft
                    size={16}
                    className="text-green-700 dark:text-green-400"
                  />
                  Event Description
                </label>

                <textarea
                  name="description"
                  rows="5"
                  placeholder="Describe your event, its purpose, and how people can participate..."
                  required
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:bg-gray-800 dark:focus:ring-green-950"
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  <Tag
                    size={16}
                    className="text-green-700 dark:text-green-400"
                  />
                  Event Category
                </label>

                <select
                  name="eventType"
                  required
                  defaultValue=""
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-sm text-gray-700 outline-none transition focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-green-500 dark:focus:bg-gray-800 dark:focus:ring-green-950"
                >
                  <option value="" disabled>
                    Choose an event category
                  </option>
                  <option value="Environmental">Environmental</option>
                  <option value="Education">Education</option>
                  <option value="Social Work">Social Work</option>
                  <option value="Health">Health</option>
                  <option value="Community">Community</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  <ImagePlus
                    size={16}
                    className="text-green-700 dark:text-green-400"
                  />
                  Event Cover Image URL
                </label>

                <input
                  type="url"
                  name="thumbnailUrl"
                  placeholder="https://example.com/event-image.jpg"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:bg-gray-800 dark:focus:ring-green-950"
                />

                <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                  Add a high-quality image URL to represent your event.
                </p>
              </div>

              {/* Location and Date */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                    <MapPin
                      size={16}
                      className="text-green-700 dark:text-green-400"
                    />
                    Event Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Dhaka, Bangladesh"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:bg-gray-800 dark:focus:ring-green-950"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                    <CalendarDays
                      size={16}
                      className="text-green-700 dark:text-green-400"
                    />
                    Event Date
                  </label>

                  <input
                    type="date"
                    name="eventDate"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-sm text-gray-700 outline-none transition focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:[color-scheme:dark] dark:focus:border-green-500 dark:focus:bg-gray-800 dark:focus:ring-green-950"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="border-t border-gray-100 pt-6 dark:border-gray-800">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-green-800 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-green-900 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Publishing..." : "Publish Your Event"}

                  {!isLoading && (
                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-1"
                    />
                  )}
                </button>

                <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">
                  Together, we can make a positive difference.
                </p>
              </div>
            </form>
          </div>

          {/* Right Information Panel */}
          <aside className="space-y-5">
            {/* Green Impact Card */}
            <div className="relative overflow-hidden rounded-3xl bg-[#102A22] p-7 text-white">
              <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-green-700/20 blur-2xl" />

              <div className="relative">
                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <HandHeart size={27} />
                </div>

                <p className="text-sm font-medium text-green-300">
                  Your impact starts here
                </p>

                <h3 className="mt-3 text-2xl font-bold leading-snug">
                  Small Acts.
                  <br />
                  Stronger Communities.
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-300">
                  Every event creates an opportunity for people to connect,
                  support each other, and build a better tomorrow.
                </p>

                <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                  <div className="flex -space-x-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#102A22] bg-green-200 text-green-900">
                      <Users size={17} />
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#102A22] bg-yellow-200 text-yellow-900">
                      <Heart size={16} />
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#102A22] bg-white text-green-900">
                      <Leaf size={17} />
                    </div>
                  </div>

                  <span className="text-xs text-gray-300">
                    Powered by people like you.
                  </span>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="font-bold text-gray-900 dark:text-white">
                Tips for a great event
              </h3>

              <div className="mt-5 space-y-5">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
                    <Type size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      Choose a clear title
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                      Make it easy for people to understand your event.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
                    <ImagePlus size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      Use a quality image
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                      An attractive image helps your event stand out.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400">
                    <CalendarDays size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      Set a future date
                    </p>
                    <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                      Give participants enough time to prepare.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="rounded-2xl border border-green-100 bg-green-50/70 p-5 dark:border-green-900 dark:bg-green-950/50">
              <p className="text-sm font-medium leading-6 text-green-900 dark:text-green-200">
                "Alone we can do so little; together we can do so much."
              </p>
              <p className="mt-2 text-xs text-green-700 dark:text-green-400">
                — Helen Keller
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
