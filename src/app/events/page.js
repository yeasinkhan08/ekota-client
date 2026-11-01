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
    return <p className="py-20 text-center">Loading events...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-green-900">Upcoming Events</h1>

        <p className="mt-3 text-gray-600">
          Discover events and make a difference in your community.
        </p>
      </div>

      {events.length === 0 ? (
        <p>No upcoming events available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
