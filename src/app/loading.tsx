export default function Loading() {
  return (
    <main className="md:pl-72">
      <div className="px-2 md:px-5">
        {/* Carousel skeleton */}
        <div className="relative block w-full mb-8">
          <div className="w-full h-[300px] rounded-xl animate-pulse bg-gray-200" />
        </div>

        {/* Tag filter skeleton */}
        <div className="mb-8">
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 rounded-full animate-pulse bg-gray-200"
              />
            ))}
          </div>
        </div>

        {/* Club grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[280px] rounded-xl animate-pulse bg-gray-200"
            />
          ))}
        </div>
      </div>
    </main>
  );
}