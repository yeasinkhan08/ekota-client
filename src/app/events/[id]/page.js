"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  CalendarDays,
  UserRound,
  ArrowLeft,
  HeartHandshake,
  Tag,
} from "lucide-react";
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
        } else {
          setEvent(null);
        }
      } catch (error) {
        console.error("Failed to fetch event:", error);
        toast.error("Failed to load event.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  const handleJoinEvent = async () => {
    if (!user) {
      toast.error("Please login to join this event.");
      router.push("/login");
      return;
    }

    try {
      setJoining(true);

      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Authentication failed. Please login again.");
      }

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
    return (
      <div className="min-h-screen bg-[#FAF9F6] px-5 py-24 dark:bg-gray-950">
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading event details...
        </p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] px-5 py-24 text-center dark:bg-gray-950">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Event not found
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          This event may have been removed or is unavailable.
        </p>
        <Link
          href="/events"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 font-medium text-white transition hover:bg-green-800"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>
      </div>
    );
  }

  const isOrganizer = user?.email === event.creatorEmail;
  const isJoined = event.joinedUsers?.includes(user?.email);

  return (
    <main className="min-h-screen bg-[#FAF9F6] px-5 py-10 transition-colors duration-300 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        {/* Event Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          {/* Event Banner */}
          <div className="relative h-52 sm:h-64 md:h-72">
            <Image
              src={event.thumbnailUrl}
              alt={event.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1152px"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                <Tag size={15} />
                {event.eventType}
              </span>

              <h1 className="mt-3 max-w-3xl text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Event Content */}
          <div className="grid gap-6 p-5 md:grid-cols-[1fr_260px] md:p-7">
            {/* Description */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-green-700 dark:text-green-400">
                About This Event
              </p>

              <h2 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
                Be part of something meaningful.
              </h2>

              <p className="mt-5 whitespace-pre-line text-base leading-8 text-gray-600 dark:text-gray-300">
                {event.description}
              </p>
            </div>

            {/* Event Information */}
            <aside className="h-fit rounded-2xl border border-gray-200 bg-[#FAF9F6] p-5 dark:border-gray-700 dark:bg-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Event Information
              </h3>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-green-100 p-3 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                    <CalendarDays size={21} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Event Date
                    </p>
                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                      {event.eventDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-green-100 p-3 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                    <MapPin size={21} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Location
                    </p>
                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-green-100 p-3 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                    <UserRound size={21} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Organized By
                    </p>
                    <p className="mt-1 break-all font-semibold text-gray-900 dark:text-white">
                      {event.creatorEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Join Button */}
              <div className="mt-8">
                {isOrganizer ? (
                  <button
                    disabled
                    className="w-full cursor-not-allowed rounded-xl bg-gray-200 px-5 py-3 font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  >
                    You are the Organizer
                  </button>
                ) : isJoined ? (
                  <button
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-green-100 px-5 py-3 font-semibold text-green-800 dark:bg-green-900/40 dark:text-green-400"
                  >
                    <HeartHandshake size={19} />
                    Already Joined
                  </button>
                ) : (
                  <button
                    onClick={handleJoinEvent}
                    disabled={joining}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <HeartHandshake size={19} />
                    {joining ? "Joining..." : "Join This Event"}
                  </button>
                )}
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-gray-500 dark:text-gray-400">
                Join your community and make a positive difference.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
