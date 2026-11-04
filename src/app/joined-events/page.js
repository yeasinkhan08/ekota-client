"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import PageSkeleton from "@/components/shared/PageSkeleton";
import {
  CalendarDays,
  MapPin,
  Users,
  Search,
  CalendarCheck,
  ArrowUpRight,
  Image as ImageIcon,
  RefreshCw,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import API_URL from "@/lib/api";
import { toast } from "sonner";

export default function JoinedEventsPage() {
  const router = useRouter();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  // Fetch events joined by the logged-in user
  const fetchJoinedEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      // Step 1: Get JWT token
      const { data, error: tokenError } = await authClient.token();

      if (tokenError || !data?.token) {
        toast.error("Please login to view your joined events.");
        router.replace("/login");
        return;
      }

      // Step 2: Request joined events from Express backend
      const response = await fetch(`${API_URL}/api/events/joined`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch joined events.");
      }

      // Step 3: Update events
      setEvents(result.events || []);
    } catch (error) {
      console.error("Joined events error:", error);

      setError(error.message || "Something went wrong.");

      toast.error(error.message || "Failed to load joined events.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Fetch events when the page loads
  useEffect(() => {
    fetchJoinedEvents();
  }, [fetchJoinedEvents]);

  // Search events by title
  const filteredEvents = events.filter((event) =>
    event.title?.toLowerCase().includes(search.toLowerCase().trim()),
  );

  // Format date without timezone shifting
  const formatDate = (date) => {
    if (!date) return "Date not available";

    const [year, month, day] = date.split("-").map(Number);

    const parsedDate = new Date(Date.UTC(year, month - 1, day, 12));

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date not available";
    }

    return parsedDate.toLocaleDateString("en-US", {
      timeZone: "UTC",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Get today's date in Bangladesh timezone
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  // Count upcoming joined events
  const upcomingCount = events.filter(
    (event) => event.eventDate && event.eventDate >= today,
  ).length;

  // Show full-page skeleton while fetching data
  if (loading) {
    return <PageSkeleton variant="dashboard" />;
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA] px-4 py-10 transition-colors duration-300 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-400">
              <CalendarCheck size={17} />
              MY PARTICIPATION
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Joined Events
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
              Keep track of the community events you've joined and get ready to
              make a difference together.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E3A5F] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/10 transition hover:bg-[#172F4D]"
          >
            Explore Events
            <ArrowUpRight size={17} />
          </Link>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2">
          {/* Total Joined */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total joined events
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {events.length}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                <Users size={24} />
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upcoming events
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {upcomingCount}
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <CalendarCheck size={24} />
              </div>
            </div>
          </div>
        </section>

        {/* Search and Heading */}
        <section className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Your participation
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Events you've registered to participate in.
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search joined events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:ring-blue-900"
            />
          </div>
        </section>

        {/* Error State */}
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-white px-5 py-16 text-center dark:border-red-900 dark:bg-gray-900">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Couldn't load your events
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchJoinedEvents}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1E3A5F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#172F4D]"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        ) : filteredEvents.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              <CalendarDays size={30} />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {search
                ? "No matching events"
                : "You haven't joined any events yet"}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
              {search
                ? "Try searching with another event title."
                : "Explore upcoming community events and join activities that inspire you."}
            </p>

            {!search && (
              <Link
                href="/events"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1E3A5F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#172F4D]"
              >
                Explore Events
                <ArrowUpRight size={17} />
              </Link>
            )}
          </div>
        ) : (
          /* Joined Event Cards */
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => (
              <Link
                href={`/events/${event._id}`}
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
              >
                {/* Event Image */}
                <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {event.thumbnailUrl ? (
                    <Image
                      src={event.thumbnailUrl}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      <ImageIcon size={40} />
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#1E3A5F] shadow-sm">
                    {event.eventType || "Community Event"}
                  </span>

                  <span className="absolute right-4 top-4 rounded-full bg-green-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                    Joined
                  </span>
                </div>

                {/* Event Information */}
                <div className="p-5">
                  <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition group-hover:text-blue-800 dark:text-white dark:group-hover:text-blue-400">
                    {event.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500 dark:text-gray-400">
                    {event.description || "No description provided."}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <CalendarDays
                        size={16}
                        className="text-blue-700 dark:text-blue-400"
                      />
                      {formatDate(event.eventDate)}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin
                        size={16}
                        className="text-blue-700 dark:text-blue-400"
                      />

                      <span className="line-clamp-1">
                        {event.location || "Location not specified"}
                      </span>
                    </div>
                  </div>

                  {/* Joined Status */}
                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
                    <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                      You're participating
                    </span>

                    <span className="flex items-center gap-1 text-sm font-semibold text-[#1E3A5F] transition group-hover:gap-2 dark:text-blue-400">
                      View details
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
