import {
  CalendarDays,
  Users,
  HeartHandshake,
  Sprout,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: CalendarDays,
    title: "Discover Events",
    description:
      "Explore meaningful community events and find opportunities to make a difference.",
    background: "bg-[#F1F5EF]",
    iconColor: "text-green-800",
  },
  {
    number: "02",
    icon: Users,
    title: "Connect with People",
    description:
      "Meet like-minded people and build meaningful connections through shared experiences.",
    background: "bg-[#E8F0E8]",
    iconColor: "text-green-800",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Join Community",
    description:
      "Take part in local initiatives and work together toward a better community.",
    background: "bg-[#F1F5EF]",
    iconColor: "text-green-800",
  },
  {
    number: "04",
    icon: Sprout,
    title: "Create Impact",
    description:
      "Start your own events, inspire others, and turn small actions into positive change.",
    background: "bg-[#E8F0E8]",
    iconColor: "text-green-800",
  },
];

export default function Features() {
  return (
    <section className="bg-[#FAF9F6] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#DCE9DF] px-4 py-2 text-xs font-semibold tracking-widest text-green-900">
            <span className="h-2 w-2 rounded-full bg-green-700" />
            WHY CHOOSE EKOTA
          </span>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#202923] sm:text-4xl md:text-5xl">
            One Platform.
            <span className="block text-green-800">
              Many Ways to Make an Impact.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-gray-600">
            Discover opportunities, connect with people, and take action.
            Everything you need to make your community stronger starts here.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.number}
                className={`group relative flex min-h-[290px] flex-col overflow-hidden rounded-3xl ${feature.background} p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
              >
                {/* Number */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold tracking-wider text-green-900/50">
                    {feature.number}
                  </span>

                  <div className="rounded-full bg-white/80 p-2.5 text-green-800 transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight size={19} />
                  </div>
                </div>

                {/* Icon */}
                <div className={`mt-8 ${feature.iconColor}`}>
                  <Icon size={34} strokeWidth={1.6} />
                </div>

                {/* Content */}
                <div className="mt-auto pt-8">
                  <h3 className="text-xl font-bold tracking-tight text-[#202923]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-[#E4E8DF] bg-white px-6 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-gray-600">
            Real change happens when people come together.
          </p>

          <p className="text-sm font-semibold text-green-800">
            Together, we make a difference.
          </p>
        </div>
      </div>
    </section>
  );
}
