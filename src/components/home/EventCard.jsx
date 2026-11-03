import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays } from "lucide-react";

export default function EventCard({ event }) {
  return (
    <Link href={`/events/${event._id}`} className="block">
      <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
        <div className="relative h-48 w-full">
          <Image
            src={event.thumbnailUrl}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {event.title}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
            {event.description}
          </p>

          <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p className="flex items-center gap-2">
              <MapPin size={16} className="text-green-600" />
              {event.location}
            </p>

            <p className="flex items-center gap-2">
              <CalendarDays size={16} className="text-green-600" />
              {event.eventDate}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
