import Header from '@src/components/header/BaseHeader';

export default function Loading() {
  return (
    <main className="w-full md:pl-72">
      <Header />
      <div className="mb-5 flex flex-col space-y-4 px-3">
        {/* Banner skeleton */}
        <div className="relative h-[150px] animate-pulse rounded-lg bg-slate-200">
          <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between p-8">
            <div className="flex gap-2">
              <div className="h-8 w-20 rounded-full bg-slate-300" />
              <div className="h-8 w-20 rounded-full bg-slate-300" />
            </div>
            <div className="h-12 w-48 rounded-full bg-slate-300" />
          </div>
        </div>

        {/* Info segment skeleton */}
        <div className="w-full rounded-lg bg-slate-100 p-10">
          <div className="flex flex-col items-start justify-between md:flex-row">
            <div className="pr-12">
              <div className="h-[100px] w-[100px] animate-pulse rounded-lg bg-slate-200" />
              <div className="mt-5 h-8 w-32 animate-pulse rounded bg-slate-200" />
              <div className="mt-5 space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-5 w-36 animate-pulse rounded bg-slate-200"
                  />
                ))}
              </div>
            </div>
            <div className="w-full">
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-full animate-pulse rounded bg-slate-200"
                  />
                ))}
              </div>
            </div>
            <div className="min-w-fit">
              <div className="h-8 w-32 animate-pulse rounded bg-slate-200" />
              <div className="mt-5 space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-[60px] w-[60px] animate-pulse rounded-full bg-slate-200" />
                    <div className="space-y-2">
                      <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                      <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Events skeleton */}
        <div className="w-full rounded-lg bg-slate-100 p-6">
          <div className="h-8 w-48 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-24 w-full animate-pulse rounded bg-slate-200"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
