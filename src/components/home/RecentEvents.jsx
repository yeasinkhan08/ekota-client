"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import API_URL from "@/lib/api";
import Image from "next/image";
import { MapPin, CalendarDays } from "lucide-react";

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
    return (
      <section className="bg-[#FAF9F6] px-5 py-16 dark:bg-gray-950">
        <p className="py-10 text-center text-gray-600 dark:text-gray-300">
          Loading events...
        </p>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF9F6] px-5 py-16 transition-colors duration-300 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
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

        {events.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-12 text-center dark:border-gray-800 dark:bg-gray-900">
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              No upcoming events found.
            </p>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Please check back later for new community events.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Link
                key={event._id}
                href={`/events/${event._id}`}
                className="block"
              >
                <div className="group h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
                  <div className="overflow-hidden">
                    <Image
                      src={event.thumbnailUrl}
                      alt={event.title}
                      width={500}
                      height={300}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {event.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                      {event.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin
                        size={17}
                        className="text-green-700 dark:text-green-400"
                      />
                      <span>{event.location}</span>
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
