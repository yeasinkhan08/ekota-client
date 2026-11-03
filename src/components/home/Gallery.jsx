import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1000&q=85",
    alt: "Volunteers working together",
    title: "Together We Grow",
    category: "Community",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=85",
    alt: "People volunteering for a cause",
    title: "Making a Difference",
    category: "Volunteering",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=85",
    alt: "Community members helping children",
    title: "Care and Support",
    category: "Social Impact",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=85",
    alt: "Green landscape and nature",
    title: "A Greener Future",
    category: "Environment",
    className: "",
  },
  {
    src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=85",
    alt: "Friends spending time together",
    title: "Stronger Together",
    category: "Connection",
    className: "",
  },
];

export default function Gallery() {
  return (
    <section className="bg-white px-5 py-20 transition-colors duration-300 dark:bg-gray-900 md:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#DCE9DF] px-4 py-2 text-xs font-semibold tracking-widest text-green-900 dark:bg-green-950 dark:text-green-300">
              <span className="h-2 w-2 rounded-full bg-green-700 dark:bg-green-400" />
              OUR COMMUNITY
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#202923] dark:text-white sm:text-4xl md:text-5xl">
              Moments That
              <span className="text-green-800 dark:text-green-400">
                {" "}
                Matter.
              </span>
            </h2>

            <p className="mt-4 max-w-xl leading-8 text-gray-600 dark:text-gray-300">
              Every gathering, every helping hand, and every small action
              creates a story worth sharing.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-green-800 dark:text-green-400">
            <span>Life at Ekota</span>
            <ArrowUpRight size={18} />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 md:auto-rows-[250px] md:grid-cols-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.title}
              className={`group relative overflow-hidden rounded-2xl ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 100vw, 25vw"
                }
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              {/* Image Information */}
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-white/75">
                  {image.category}
                </p>

                <h3 className="text-lg font-semibold sm:text-xl">
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
