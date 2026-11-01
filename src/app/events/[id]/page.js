"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import API_URL from "@/lib/api";

export default function EventDetailsPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events/${id}`);
        const data = await response.json();

        if (data.success) {
          setEvent(data.event);
        }
      } catch (error) {
        console.error("Failed to fetch event:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (loading) {
    return <p className="py-20 text-center">Loading event...</p>;
  }

  if (!event) {
    return <p className="py-20 text-center">Event not found.</p>;
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <div className="overflow-hidden rounded-2xl border shadow-sm">
        <div className="relative h-72 w-full md:h-96">
          <Image
            src={event.thumbnailUrl}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>

        <div className="p-6 md:p-10">
          <p className="font-medium text-green-700">{event.eventType}</p>

          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            {event.title}
          </h1>

          <p className="mt-5 leading-7 text-gray-600">{event.description}</p>

          <div className="mt-8 space-y-3 text-gray-700">
            <p>
              <strong>Location:</strong> {event.location}
            </p>

            <p>
              <strong>Date:</strong> {event.eventDate}
            </p>

            <p>
              <strong>Organizer:</strong> {event.creatorEmail}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
