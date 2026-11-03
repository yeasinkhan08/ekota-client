import { ArrowRight, Mail, HeartHandshake } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-white px-5 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-[#142D23] px-6 py-14 text-white sm:px-12 md:py-16">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-8 -top-16 h-56 w-56 rounded-full border border-white/10" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-green-300">
              <HeartHandshake size={30} />
            </div>

            <p className="text-sm font-semibold tracking-[0.2em] text-green-300">
              STAY CONNECTED
            </p>

            <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Be Part of Something
              <span className="block text-green-300">Meaningful.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              Stay inspired by community stories, upcoming events, and
              opportunities to make a positive difference.
            </p>

            {/* Newsletter Form - UI only */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-9 flex max-w-xl flex-col gap-3 rounded-2xl bg-white p-2 sm:flex-row sm:rounded-full"
            >
              <div className="flex flex-1 items-center gap-3 px-4">
                <Mail size={20} className="shrink-0 text-green-800" />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  className="w-full bg-transparent py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-green-800 px-7 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                Subscribe
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-5 text-xs text-white/45">
              Stay connected with your community. No spam, just inspiration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
