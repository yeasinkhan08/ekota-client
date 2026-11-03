"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  Pencil,
  Trash2,
  Plus,
  Search,
  CalendarCheck,
  Users,
  Loader2,
  X,
  Image as ImageIcon,
} from "lucide-react";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import API_URL from "@/lib/api";
import { toast } from "sonner";
import Image from "next/image";

export default function ManageEventsPage() {
  const router = useRouter();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Get the logged-in user's events
  const fetchMyEvents = async () => {
    try {
      setLoading(true);

      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        toast.error("Please login to manage your events.");
        router.push("/login");
        return;
      }

      const response = await fetch(`${API_URL}/api/events/my-events`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch events");
      }

      setEvents(result.events || []);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  // Update event
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setIsSaving(true);

      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Authentication failed. Please login again.");
      }

      const updatedData = {
        title: editingEvent.title,
        description: editingEvent.description,
        eventType: editingEvent.eventType,
        thumbnailUrl: editingEvent.thumbnailUrl,
        location: editingEvent.location,
        eventDate: editingEvent.eventDate,
      };

      const response = await fetch(
        `${API_URL}/api/events/${editingEvent._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.token}`,
          },
          body: JSON.stringify(updatedData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update event");
      }

      toast.success("Event updated successfully!");

      setEditingEvent(null);
      fetchMyEvents();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update event");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete event
  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Authentication failed. Please login again.");
      }

      const response = await fetch(
        `${API_URL}/api/events/${deletingEvent._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete event");
      }

      setEvents((previousEvents) =>
        previousEvents.filter((event) => event._id !== deletingEvent._id),
      );

      setDeletingEvent(null);
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to delete event");
    } finally {
      setIsDeleting(false);
    }
  };

  // Search events
  const filteredEvents = events.filter((event) =>
    event.title?.toLowerCase().includes(search.toLowerCase()),
  );

  // Format event date
  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] px-4 py-10 text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-400">
              <CalendarCheck size={17} />
              EVENT MANAGEMENT
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Manage your events
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
              Keep your community activities organized. Update event details or
              remove events you no longer need.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E3A5F] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/10 transition hover:bg-[#172F4D]"
          >
            <Plus size={18} />
            Create New Event
          </Link>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total events created
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {events.length}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                <CalendarDays size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upcoming events
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {
                    events.filter(
                      (event) =>
                        event.eventDate >=
                        new Date().toISOString().split("T")[0],
                    ).length
                  }
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3 text-green-700 dark:bg-green-950 dark:text-green-400">
                <Users size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search and list header */}
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Your events
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {events.length} events in your collection
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search your events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-950"
            />
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2
                className="animate-spin text-blue-700 dark:text-blue-400"
                size={35}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading your events...
              </p>
            </div>
          </div>
        ) : filteredEvents.length === 0 ? (
          /* Empty state */
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
              <CalendarDays size={30} />
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {search ? "No matching events" : "No events created yet"}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
              {search
                ? "Try searching with another event title."
                : "Start bringing your community together by creating your first event."}
            </p>

            {!search && (
              <Link
                href="/create-event"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1E3A5F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#172F4D]"
              >
                <Plus size={18} />
                Create Your First Event
              </Link>
            )}
          </div>
        ) : (
          /* Event cards */
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
              >
                {/* Thumbnail */}
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
                    <div className="flex h-full items-center justify-center text-gray-400 dark:text-gray-500">
                      <ImageIcon size={40} />
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#1E3A5F] shadow-sm dark:bg-gray-900/95 dark:text-blue-300">
                    {event.eventType || "Community Event"}
                  </span>
                </div>

                {/* Card content */}
                <div className="p-5">
                  <h3 className="line-clamp-1 text-lg font-bold text-gray-900 dark:text-white">
                    {event.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500 dark:text-gray-400">
                    {event.description || "No description provided."}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 dark:border-gray-800">
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

                  {/* Actions */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setEditingEvent({ ...event })}
                      className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 py-2.5 text-sm font-semibold text-blue-800 transition hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() => setDeletingEvent(event)}
                      className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Edit Event
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Update your event information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Event Title
                </label>
                <input
                  required
                  value={editingEvent.title || ""}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      title: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-950"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingEvent.description || ""}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      description: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-950"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Event Type
                </label>
                <input
                  value={editingEvent.eventType || ""}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      eventType: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-950"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  value={editingEvent.thumbnailUrl || ""}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      thumbnailUrl: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-950"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Location
                </label>
                <input
                  value={editingEvent.location || ""}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      location: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-950"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Event Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={editingEvent.eventDate || ""}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      eventDate: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:[color-scheme:dark] dark:focus:ring-blue-950"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#1E3A5F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#172F4D] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving && <Loader2 size={17} className="animate-spin" />}
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl dark:bg-gray-900">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400">
              <Trash2 size={26} />
            </div>

            <h2 className="text-center text-xl font-bold text-gray-900 dark:text-white">
              Delete this event?
            </h2>

            <p className="mt-3 text-center text-sm leading-6 text-gray-500 dark:text-gray-400">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {deletingEvent.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeletingEvent(null)}
                disabled={isDeleting}
                className="rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {isDeleting && <Loader2 size={16} className="animate-spin" />}
                {isDeleting ? "Deleting..." : "Delete Event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
