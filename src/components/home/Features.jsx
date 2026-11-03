import { CalendarDays, Users, HeartHandshake, Sprout } from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Discover Events",
    description:
      "Explore upcoming community events and find opportunities to make a difference.",
  },
  {
    icon: Users,
    title: "Connect with People",
    description:
      "Meet people who share your interests and work together toward meaningful causes.",
  },
  {
    icon: HeartHandshake,
    title: "Join Causes",
    description:
      "Participate in activities and support initiatives that improve your community.",
  },
  {
    icon: Sprout,
    title: "Create Impact",
    description:
      "Organize your own events and inspire others to create positive change.",
  },
];

export default function Features() {
  return (
    <section className="bg-white px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="font-semibold text-green-700">WHAT WE DO</p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Everything Starts with Togetherness
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Ekota makes it easier to discover events, connect with people, and
            create positive changes in your community.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-100 bg-[#FAF9F6] p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 inline-flex rounded-xl bg-green-100 p-3 text-green-800">
                  <Icon size={27} />
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
