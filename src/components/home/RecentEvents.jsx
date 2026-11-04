"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import API_URL from "@/lib/api";
import {
  MapPin,
  CalendarDays,
  Image as ImageIcon,
  RefreshCw,
} from "lucide-react";

// Reusable skeleton card for Recent Events
const EventCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Image Skeleton */}
      <div className="h-48 w-full animate-pulse bg-gray-200 dark:bg-gray-800" />

      {/* Content Skeleton */}
      <div className="space-y-4 p-5">
        <div className="h-6 w-3/4 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />

        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
};

const RecentEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Bumping this value re-runs the fetch effect (used by "Try Again")
  const [reloadKey, setReloadKey] = useState(0);

  // Fetch recent upcoming events on mount and whenever reloadKey changes
  useEffect(() => {
    let ignore = false;

    const loadEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events/recent`, {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch events.");
        }

        if (ignore) return;
        setEvents(data.events || []);
        setError("");
      } catch (err) {
        if (ignore) return;
        console.error("Failed to fetch recent events:", err);
        setError(err.message || "Something went wrong.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadEvents();

    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  // Retry handler: state resets happen in an event handler, not in the effect
  const handleRetry = () => {
    setLoading(true);
    setError("");
    setReloadKey((key) => key + 1);
  };

  return (
    <section className="bg-[#FAF9F6] px-5 py-16 transition-colors duration-300 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-800 dark:text-green-400">
            Make a Difference
          </p>

          <h2 className="text-3xl font-bold text-green-900 dark:text-white">
            Upcoming Events
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Discover upcoming community events and find your next opportunity to
            make an impact.
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div
            aria-busy="true"
            aria-label="Loading recent events"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <EventCardSkeleton key={item} />
            ))}
          </div>
        ) : error ? (
          /* Error State */
          <div className="rounded-2xl border border-red-200 bg-white px-5 py-12 text-center dark:border-red-900 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Couldn&apos;t load recent events.
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {error}
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-900"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        ) : events.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-12 text-center dark:border-gray-800 dark:bg-gray-900">
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              No upcoming events found.
            </p>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Please check back later for new community events.
            </p>
          </div>
        ) : (
          /* Event Cards */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link
                key={event._id}
                href={`/events/${event._id}`}
                className="block"
              >
                <div className="group h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {event.thumbnailUrl ? (
                      <Image
                        src={event.thumbnailUrl}
                        alt={event.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400 dark:text-gray-500">
                        <ImageIcon size={40} />
                      </div>
                    )}
                  </div>

                  {/* Event Information */}
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {event.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                      {event.description || "No description provided."}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin
                        size={17}
                        className="shrink-0 text-green-700 dark:text-green-400"
                      />

                      <span className="truncate">
                        {event.location || "Location not specified"}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm font-medium text-green-800 dark:text-green-400">
                      <CalendarDays size={17} />
                      <span>{event.eventDate}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentEvents;
