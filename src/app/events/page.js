"use client";

import { useEffect, useState } from "react";
import EventCard from "@/components/home/EventCard";
import API_URL from "@/lib/api";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events`);
        const data = await response.json();

        if (data.success) {
          setEvents(data.events);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section className="min-h-[60vh] bg-white px-5 py-20 text-center transition-colors dark:bg-gray-950">
        <p className="text-gray-600 dark:text-gray-300">Loading events...</p>
      </section>
    );
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

        {/* Events */}
        {events.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-12 text-center dark:border-gray-800 dark:bg-gray-900">
            <p className="text-gray-600 dark:text-gray-300">
              No upcoming events available.
            </p>
          </div>
        ) : (
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
