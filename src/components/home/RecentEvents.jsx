"use client";

import { useEffect, useState } from "react";
import API_URL from "@/lib/api";
import Image from "next/image";

const RecentEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events/recent`);
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
    return <p className="py-10 text-center">Loading events...</p>;
  }

  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <h2 className="mb-8 text-3xl font-bold text-green-900">
        Upcoming Events
      </h2>

      {events.length === 0 ? (
        <p>No upcoming events found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event._id} className="rounded-xl border p-5 shadow-sm">
              <Image
                src={event.thumbnailUrl}
                alt={event.title}
                width={500}
                height={300}
                className="mb-4 h-48 w-full rounded-lg object-cover"
              />

              <h3 className="text-xl font-semibold">{event.title}</h3>

              <p className="mt-2 text-gray-600">{event.description}</p>

              <p className="mt-3 text-sm text-gray-500">{event.location}</p>

              <p className="mt-1 text-sm text-green-800">{event.eventDate}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentEvents;
