const Skeleton = ({ className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800 ${className}`}
    />
  );
};

export default function PageSkeleton({ variant = "home" }) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading content"
      className="min-h-[60vh] bg-[#FAF9F6] px-5 py-12 dark:bg-gray-950"
    >
      <div className="mx-auto max-w-7xl">
        {/* Home Page */}
        {variant === "home" && (
          <>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="space-y-5">
                <Skeleton className="h-9 w-52" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-4/5" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-12 w-40" />
              </div>

              <Skeleton className="h-64 w-full rounded-3xl sm:h-96" />
            </div>

            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <Skeleton key={item} className="h-40 w-full" />
              ))}
            </div>
          </>
        )}

        {/* Events Page */}
        {variant === "events" && (
          <>
            <div className="mb-10 space-y-4">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-10 w-64 max-w-full" />
              <Skeleton className="h-4 w-full max-w-lg" />
            </div>

            <Skeleton className="mb-6 h-12 w-full max-w-xs" />

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
                >
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="mt-5 h-6 w-3/4" />
                  <Skeleton className="mt-3 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-2/3" />
                  <Skeleton className="mt-5 h-5 w-1/2" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Dashboard Pages */}
        {variant === "dashboard" && (
          <>
            <div className="mb-10 space-y-4">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-10 w-64 max-w-full" />
              <Skeleton className="h-4 w-full max-w-lg" />
            </div>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-28" />
              <Skeleton className="h-28" />
            </div>

            <Skeleton className="mb-6 h-12 w-full max-w-xs" />

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
                >
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="mt-5 h-6 w-3/4" />
                  <Skeleton className="mt-3 h-4 w-full" />
                  <Skeleton className="mt-5 h-10 w-full" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Event Details */}
        {variant === "details" && (
          <>
            <Skeleton className="h-56 w-full rounded-3xl md:h-80" />

            <div className="mt-8 grid gap-8 md:grid-cols-[1fr_280px]">
              <div className="space-y-5">
                <Skeleton className="h-9 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-32 w-full" />
              </div>

              <Skeleton className="h-64 w-full" />
            </div>
          </>
        )}

        {/* Create Event Form */}
        {variant === "form" && (
          <>
            <Skeleton className="mb-4 h-5 w-36" />
            <Skeleton className="mb-4 h-10 w-72 max-w-full" />
            <Skeleton className="mb-10 h-4 w-full max-w-xl" />

            <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
              <div className="space-y-6 rounded-3xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
                <Skeleton className="h-8 w-52" />

                {[1, 2, 3, 4, 5].map((item) => (
                  <Skeleton key={item} className="h-12 w-full" />
                ))}

                <Skeleton className="h-12 w-full" />
              </div>

              <div className="space-y-5">
                <Skeleton className="h-72 w-full rounded-3xl" />
                <Skeleton className="h-56 w-full rounded-3xl" />
              </div>
            </div>
          </>
        )}

        {/* Profile Page */}
        {variant === "profile" && (
          <div className="mx-auto max-w-3xl space-y-6">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-10 w-52" />

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
              <div className="flex flex-col items-center gap-5 border-b border-gray-100 p-8 dark:border-gray-800 sm:flex-row">
                <Skeleton className="h-24 w-24 rounded-full" />

                <div className="w-full space-y-3">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-56" />
                </div>
              </div>

              <div className="space-y-6 p-8">
                <Skeleton className="h-7 w-52" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-36" />
              </div>
            </div>
          </div>
        )}

        {/* Login and Register */}
        {variant === "auth" && (
          <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900">
            <Skeleton className="h-9 w-52" />
            <Skeleton className="mt-4 h-4 w-60" />

            <div className="mt-8 space-y-5">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton key={item} className="h-12 w-full" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
