import Link from "next/link";
import Image from "next/image";
import { ArrowRight, HeartHandshake, Users, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="bg-[#FAF9F6]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
        {/* Hero Content */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#DCE9DF] px-4 py-2 text-sm font-medium text-green-900">
            <HeartHandshake size={17} />
            Building Stronger Communities
          </div>

          <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-[#202923] sm:text-5xl lg:text-6xl">
            Small Acts.
            <span className="block text-green-800">Stronger Communities.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-gray-600">
            Bring people together, support meaningful causes, and create
            positive change. Every small action can make a big difference.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-green-800 hover:bg-green-900"
            >
              <Link href="/events">
                Explore Events
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/register">Get Involved</Link>
            </Button>
          </div>

          {/* Small Statistics */}
          <div className="mt-12 flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#DCE9DF] p-3 text-green-800">
                <Users size={22} />
              </div>
              <div>
                <p className="font-bold text-[#202923]">Community</p>
                <p className="text-sm text-gray-500">Together we grow</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#DCE9DF] p-3 text-green-800">
                <Leaf size={22} />
              </div>
              <div>
                <p className="font-bold text-[#202923]">Positive Impact</p>
                <p className="text-sm text-gray-500">One action at a time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-[#DCE9DF]" />

          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1000&q=85"
              alt="Volunteers working together for their community"
              width={700}
              height={750}
              priority
              className="h-[400px] w-full object-cover sm:h-[500px]"
            />
          </div>

          <div className="absolute -bottom-6 -left-5 rounded-2xl bg-white p-5 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-3 text-green-800">
                <HeartHandshake size={25} />
              </div>
              <div>
                <p className="font-bold text-[#202923]">Together for Good</p>
                <p className="text-sm text-gray-500">Make every action count</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
