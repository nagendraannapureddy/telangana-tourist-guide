import Link from "next/link";
import { getPlacesByCategory } from "@/lib/content";

export default function Home() {
  const temples = getPlacesByCategory("temples");

  return (
    <main className="min-h-screen bg-white">

      {/* Header */}
      <header className="bg-green-800 text-white">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <h1 className="text-3xl font-bold">
            Telangana Tourist Guide
          </h1>

          <p className="mt-2 text-green-100">
            Discover temples, historical places and beautiful destinations
            across Telangana
          </p>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="bg-green-50">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Explore Telangana
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Find the best temples, historical places, waterfalls, lakes and
            tourist attractions for your next trip.
          </p>

          <button className="mt-8 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800">
            Explore Places
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900">
          Explore by Category
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-4">

          <div className="rounded-xl border p-6 shadow-sm">
            <div className="text-4xl">🛕</div>

            <h3 className="mt-4 text-xl font-semibold">
              Temples
            </h3>

            <p className="mt-2 text-gray-600">
              Discover famous temples across Telangana.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm">
            <div className="text-4xl">🏛️</div>

            <h3 className="mt-4 text-xl font-semibold">
              Historical Places
            </h3>

            <p className="mt-2 text-gray-600">
              Explore forts, monuments and historical sites.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm">
            <div className="text-4xl">🌊</div>

            <h3 className="mt-4 text-xl font-semibold">
              Nature
            </h3>

            <p className="mt-2 text-gray-600">
              Find waterfalls, lakes, forests and scenic places.
            </p>
          </div>

          <div className="rounded-xl border p-6 shadow-sm">
            <div className="text-4xl">📍</div>

            <h3 className="mt-4 text-xl font-semibold">
              Tourist Attractions
            </h3>

            <p className="mt-2 text-gray-600">
              Discover popular places to visit in Telangana.
            </p>
          </div>

        </div>
      </section>

      {/* Dynamic Temple Places */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-12">

          <h2 className="text-2xl font-bold text-gray-900">
            Popular Temples
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">

            {temples.map((temple) => (
              <Link
                key={temple.slug}
                href={`/places/${temple.slug}`}
                className="rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="text-4xl">
                  🛕
                </div>

                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {temple.name}
                </h3>

                <p className="mt-2 text-gray-600">
                  {temple.district}, Telangana
                </p>

                <p className="mt-4 font-semibold text-green-700">
                  View Details →
                </p>

              </Link>
            ))}

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 px-6 py-8 text-center text-white">
        <p>
          © 2026 Telangana Tourist Guide
        </p>
      </footer>

    </main>
  );
}