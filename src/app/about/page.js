import Link from "next/link";
import {
  HeartHandshake,
  Users,
  Target,
  Eye,
  HandHeart,
  Leaf,
  Lightbulb,
  ArrowRight,
  CalendarDays,
  Search,
  Sparkles,
  Globe,
  ShieldCheck,
} from "lucide-react";

const values = [
  {
    icon: HeartHandshake,
    title: "Kindness",
    description:
      "We believe even the smallest act of kindness can create a meaningful difference in someone's life.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We bring people together and encourage everyone to contribute to a stronger, more connected society.",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    description:
      "We value responsible participation, transparency, and respect among community members.",
  },
  {
    icon: Leaf,
    title: "Positive Impact",
    description:
      "We encourage meaningful actions that contribute to a healthier, more supportive community.",
  },
];

const steps = [
  {
    number: "01",
    icon: CalendarDays,
    title: "Create an Event",
    description:
      "Have an idea to help your community? Create an event and invite others to participate.",
  },
  {
    number: "02",
    icon: Search,
    title: "Discover Events",
    description:
      "Explore upcoming community activities and find causes that matter to you.",
  },
  {
    number: "03",
    icon: HandHeart,
    title: "Join & Make an Impact",
    description:
      "Join an event, meet like-minded people, and turn your good intentions into action.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#FAF9F6] text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative px-5 py-20 md:py-28">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-green-100/70 blur-3xl dark:bg-green-950/30" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-300">
              <HeartHandshake size={17} />
              ABOUT EKOTA
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#102A22] dark:text-white sm:text-5xl md:text-6xl">
              Together, We Can
              <span className="block text-green-800 dark:text-green-400">
                Make a Difference.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-400 md:text-lg">
              Ekota is a community-driven platform that connects people through
              meaningful social development events. We believe positive change
              starts when people come together.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-800 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-green-900 dark:bg-green-700 dark:hover:bg-green-600"
              >
                Explore Events
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Become a Member
              </Link>
            </div>
          </div>

          {/* Hero Highlight */}
          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-green-100 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <Users
                className="mx-auto text-green-700 dark:text-green-400"
                size={30}
              />
              <h3 className="mt-3 font-bold text-gray-900 dark:text-white">
                People Together
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Bringing communities closer.
              </p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <HeartHandshake
                className="mx-auto text-green-700 dark:text-green-400"
                size={30}
              />
              <h3 className="mt-3 font-bold text-gray-900 dark:text-white">
                Meaningful Actions
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Turning good intentions into action.
              </p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-white p-6 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <Globe
                className="mx-auto text-green-700 dark:text-green-400"
                size={30}
              />
              <h3 className="mt-3 font-bold text-gray-900 dark:text-white">
                Better Communities
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Creating positive change together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-white px-5 py-20 dark:bg-gray-900 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          {/* Mission */}
          <div className="rounded-3xl bg-[#102A22] p-8 text-white md:p-10">
            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Target size={28} />
            </div>

            <p className="text-sm font-semibold uppercase tracking-widest text-green-300">
              Our Mission
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-snug">
              Making community participation easier for everyone.
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-300">
              Our mission is to provide a simple platform where people can
              create, discover, and join social development events. We want to
              make it easier for individuals to participate in meaningful
              activities and support the communities around them.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-3xl border border-green-100 bg-[#F0F5EF] p-8 dark:border-gray-800 dark:bg-gray-800 md:p-10">
            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400">
              <Eye size={28} />
            </div>

            <p className="text-sm font-semibold uppercase tracking-widest text-green-800 dark:text-green-400">
              Our Vision
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-snug text-[#102A22] dark:text-white">
              A world where everyone can make a difference.
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-gray-300">
              We envision connected communities where people support one
              another, share ideas, and work together to create a more
              compassionate and sustainable future.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-5 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-green-800 dark:text-green-400">
              <Sparkles size={17} />
              What We Believe
            </div>

            <h2 className="text-3xl font-bold text-[#102A22] dark:text-white md:text-4xl">
              Our Core Values
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              These principles inspire the way we connect people and encourage
              positive community development.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-gray-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-green-900"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-800 transition group-hover:bg-green-800 group-hover:text-white dark:bg-green-950 dark:text-green-400 dark:group-hover:bg-green-700 dark:group-hover:text-white">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900 dark:text-white">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white px-5 py-20 dark:bg-gray-900 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-green-800 dark:text-green-400">
              Simple Steps
            </p>

            <h2 className="text-3xl font-bold text-[#102A22] dark:text-white md:text-4xl">
              How Ekota Works
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Getting involved in your community doesn't have to be complicated.
              Start with three simple steps.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-gray-200 bg-[#FAF9F6] p-7 dark:border-gray-800 dark:bg-gray-950"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400">
                      <Icon size={26} />
                    </div>

                    <span className="text-4xl font-extrabold text-green-100 dark:text-green-950">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-20 md:py-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#102A22] px-7 py-14 text-center text-white md:px-16 md:py-20">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-green-600/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-green-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Lightbulb size={28} className="text-green-300" />
            </div>

            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              Your Community Needs You.
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-300 md:text-base">
              Every positive change begins with someone taking the first step.
              Discover an event, share your idea, or bring people together.
            </p>

            <Link
              href="/events"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-green-500"
            >
              Start Making a Difference
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
