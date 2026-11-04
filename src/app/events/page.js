"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/home/EventCard";
import PageSkeleton from "@/components/shared/PageSkeleton";
import API_URL from "@/lib/api";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch upcoming events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/events`, {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch events.");
      }

      setEvents(data.events || []);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Show skeleton while loading
  if (loading) {
    return <PageSkeleton variant="events" />;
  }

  return (
    <section className="min-h-screen bg-white px-5 py-16 transition-colors duration-300 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-green-900 dark:text-green-400">
            Upcoming Events
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Discover events and make a difference in your community.
          </p>
        </div>

        {/* Error State */}
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-12 text-center dark:border-red-900 dark:bg-red-950/30">
            <p className="text-gray-700 dark:text-gray-300">{error}</p>

            <button
              type="button"
              onClick={fetchEvents}
              className="mt-5 rounded-xl bg-green-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-900"
            >
              Try Again
            </button>
          </div>
        ) : events.length === 0 ? (
          /* Empty State */
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-12 text-center dark:border-gray-800 dark:bg-gray-900">
            <p className="text-gray-600 dark:text-gray-300">
              No upcoming events available.
            </p>
          </div>
        ) : (
          /* Events */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
