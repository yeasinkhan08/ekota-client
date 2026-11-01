import Image from "next/image";
import { MapPin, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const EventCard = ({ event }) => {
  return (
    <Link href={`/events/${event._id}`} className="block">
      <Card className="overflow-hidden border-0 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
        <div className="relative h-52 w-full">
          <Image
            src={event.thumbnailUrl}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <CardContent className="p-5">
          <p className="text-sm font-medium text-green-700">
            {event.eventType}
          </p>

          <h2 className="mt-2 text-xl font-bold text-gray-900">
            {event.title}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {event.description}
          </p>

          <div className="mt-5 space-y-3 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <MapPin size={17} className="text-green-700" />
              {event.location}
            </p>

            <p className="flex items-center gap-2">
              <CalendarDays size={17} className="text-green-700" />
              {event.eventDate}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
