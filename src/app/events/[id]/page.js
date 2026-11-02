"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

import API_URL from "@/lib/api";
import { authClient } from "@/lib/auth-client";

export default function EventDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events/${id}`);
        const data = await response.json();

        if (response.ok && data.success) {
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

  const handleJoinEvent = async () => {
    if (!user) {
      toast.error("Please login to join this event.");
      router.push("/login");
      return;
    }

    try {
      setJoining(true);

      // Get JWT token
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Authentication failed. Please login again.");
      }

      // Send join request
      const response = await fetch(`${API_URL}/api/events/${id}/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to join event.");
      }

      // Update event data
      setEvent((previousEvent) => ({
        ...previousEvent,
        joinedUsers: [...(previousEvent.joinedUsers || []), user.email],
      }));

      toast.success(result.message || "You joined the event successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return <p className="py-20 text-center">Loading event...</p>;
  }

  if (!event) {
    return <p className="py-20 text-center">Event not found.</p>;
  }

  const isOrganizer = user?.email === event.creatorEmail;
  const isJoined = event.joinedUsers?.includes(user?.email);

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

          {/* Join Event Button */}
          <div className="mt-8">
            {isOrganizer ? (
              <button
                disabled
                className="rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-600"
              >
                You are the Organizer
              </button>
            ) : isJoined ? (
              <button
                disabled
                className="rounded-lg bg-green-100 px-6 py-3 font-medium text-green-700"
              >
                Already Joined
              </button>
            ) : (
              <button
                onClick={handleJoinEvent}
                disabled={joining}
                className="rounded-lg bg-green-700 px-6 py-3 font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {joining ? "Joining..." : "Join Event"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
