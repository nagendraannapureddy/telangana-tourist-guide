import Link from "next/link";
import { getPlacesByCategory } from "@/lib/content";

export default function HistoricalPlaces() {
  const historicalPlaces = getPlacesByCategory("historical");

  return (
    <main className="min-h-screen bg-white">

      <header className="bg-green-800 text-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <Link
            href="/"
            className="text-green-100 hover:text-white"
          >
            ← Back to Home
          </Link>

          <h1 className="mt-4 text-3xl font-bold">
            Historical Places of Telangana
          </h1>

          <p className="mt-2 text-green-100">
            Explore forts, monuments and historical places across Telangana.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">

        <div className="grid gap-6 md:grid-cols-3">

          {historicalPlaces.map((place) => (
            <Link
              key={place.slug}
              href={`/places/${place.slug}`}
              className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="text-4xl">
                🏛️
              </div>

              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                {place.name}
              </h2>

              <p className="mt-2 text-gray-600">
                {place.district}, Telangana
              </p>

              <p className="mt-4 font-semibold text-green-700">
                View Details →
              </p>
            </Link>
          ))}

        </div>

      </section>

      <footer className="bg-green-900 px-6 py-8 text-center text-white">
        <p>
          © 2026 Telangana Tourist Guide
        </p>
      </footer>

    </main>
  );
}