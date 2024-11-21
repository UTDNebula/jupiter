export default function Loading() {
  return (
    <main className="md:pl-72">
      <div className="px-2 md:px-5">
        {/* Carousel skeleton */}
        <div className="relative mb-8 block w-full">
          <div className="h-[300px] w-full animate-pulse rounded-xl bg-gray-200" />
        </div>

        {/* Tag filter skeleton */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 animate-pulse rounded-full bg-gray-200"
              />
            ))}
          </div>
        </div>

        {/* Club grid skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[280px] animate-pulse rounded-xl bg-gray-200"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
