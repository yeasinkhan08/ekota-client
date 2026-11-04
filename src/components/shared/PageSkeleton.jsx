const SkeletonBlock = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={`animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800 ${className}`}
  />
);

export default function PageSkeleton({ variant = "home" }) {
  return (
    <main
      aria-busy="true"
      aria-label="Loading page"
      className="min-h-[60vh] bg-[#FAF9F6] px-5 py-12 dark:bg-gray-950"
    >
      <div className="mx-auto max-w-7xl">
        {/* Profile Skeleton */}
        {variant === "profile" && (
          <div className="mx-auto max-w-3xl space-y-6">
            <SkeletonBlock className="h-5 w-28" />
            <SkeletonBlock className="h-10 w-52" />

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
              <div className="flex flex-col items-center gap-5 border-b border-gray-100 p-8 dark:border-gray-800 sm:flex-row">
                <SkeletonBlock className="h-24 w-24 rounded-full" />
                <div className="w-full space-y-3">
                  <SkeletonBlock className="h-6 w-40" />
                  <SkeletonBlock className="h-4 w-56" />
                </div>
              </div>

              <div className="space-y-6 p-8">
                <SkeletonBlock className="h-7 w-52" />
                <SkeletonBlock className="h-12 w-full" />
                <SkeletonBlock className="h-12 w-full" />
                <SkeletonBlock className="h-12 w-full" />
                <SkeletonBlock className="h-12 w-36" />
              </div>
            </div>
          </div>
        )}

        {/* Authentication Skeleton */}
        {variant === "auth" && (
          <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
            <SkeletonBlock className="h-9 w-52" />
            <SkeletonBlock className="mt-4 h-4 w-60" />

            <div className="mt-8 space-y-5">
              <SkeletonBlock className="h-12 w-full" />
              <SkeletonBlock className="h-12 w-full" />
              <SkeletonBlock className="h-12 w-full" />
              <SkeletonBlock className="h-12 w-full" />
            </div>
          </div>
        )}

        {/* Events and Dashboard Skeleton */}
        {(variant === "events" || variant === "dashboard") && (
          <>
            <div className="mb-10 space-y-4">
              <SkeletonBlock className="h-4 w-36" />
              <SkeletonBlock className="h-10 w-64 max-w-full" />
              <SkeletonBlock className="h-4 w-full max-w-lg" />
            </div>

            {variant === "dashboard" && (
              <div className="mb-8 grid gap-4 sm:grid-cols-2">
                <SkeletonBlock className="h-28" />
                <SkeletonBlock className="h-28" />
              </div>
            )}

            <SkeletonBlock className="mb-6 h-12 w-full max-w-xs" />

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
                >
                  <SkeletonBlock className="h-48 w-full" />
                  <SkeletonBlock className="mt-5 h-6 w-3/4" />
                  <SkeletonBlock className="mt-3 h-4 w-full" />
                  <SkeletonBlock className="mt-2 h-4 w-2/3" />
                  <SkeletonBlock className="mt-5 h-5 w-1/2" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Event Details Skeleton */}
        {variant === "details" && (
          <>
            <SkeletonBlock className="h-56 w-full rounded-3xl md:h-80" />

            <div className="mt-8 grid gap-8 md:grid-cols-[1fr_280px]">
              <div className="space-y-5">
                <SkeletonBlock className="h-9 w-3/4" />
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-5/6" />
                <SkeletonBlock className="h-32 w-full" />
              </div>

              <SkeletonBlock className="h-64 w-full" />
            </div>
          </>
        )}

        {/* Create Event Form Skeleton */}
        {variant === "form" && (
          <>
            <SkeletonBlock className="mb-4 h-5 w-36" />
            <SkeletonBlock className="mb-4 h-10 w-72 max-w-full" />
            <SkeletonBlock className="mb-10 h-4 w-full max-w-xl" />

            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div className="space-y-6 rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
                <SkeletonBlock className="h-8 w-52" />
                {[1, 2, 3, 4, 5].map((item) => (
                  <SkeletonBlock key={item} className="h-12 w-full" />
                ))}
                <SkeletonBlock className="h-12 w-full" />
              </div>

              <div className="space-y-5">
                <SkeletonBlock className="h-72 w-full rounded-3xl" />
                <SkeletonBlock className="h-56 w-full rounded-3xl" />
              </div>
            </div>
          </>
        )}

        {/* Default / Home Skeleton */}
        {variant === "home" && (
          <>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="space-y-5">
                <SkeletonBlock className="h-9 w-52" />
                <SkeletonBlock className="h-12 w-full" />
                <SkeletonBlock className="h-12 w-4/5" />
                <SkeletonBlock className="h-5 w-full" />
                <SkeletonBlock className="h-5 w-5/6" />
                <SkeletonBlock className="mt-5 h-12 w-40" />
              </div>

              <SkeletonBlock className="h-64 w-full rounded-3xl sm:h-96" />
            </div>

            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <SkeletonBlock key={item} className="h-40 w-full" />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
