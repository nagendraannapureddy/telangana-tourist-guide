import Link from "next/link";
import { getPlacesByCategory } from "@/lib/content";

export default function Home() {
  const historicalPlaces = getPlacesByCategory("historical");
  const temples = getPlacesByCategory("temples");

  return (
    <main className="min-h-screen bg-white">

      {/* Navigation */}
      <header className="absolute left-0 right-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-white">

          <Link
            href="/"
            className="text-xl font-bold tracking-wide"
          >
            Travel Guide
          </Link>

          <div className="hidden items-center gap-8 md:flex">

            <Link
              href="/historical"
              className="text-sm font-medium text-white/90 transition hover:text-white"
            >
              Destinations
            </Link>

            <a
              href="#experiences"
              className="text-sm font-medium text-white/90 transition hover:text-white"
            >
              Experiences
            </a>

            <a
              href="#categories"
              className="text-sm font-medium text-white/90 transition hover:text-white"
            >
              Categories
            </a>

            <Link
              href="/historical"
              className="rounded-md bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
            >
              Plan Your Trip
            </Link>

          </div>

          <div className="flex items-center gap-5 text-lg">
            <span>🌐</span>
            <span>⌕</span>
            <span>♡</span>
          </div>

        </nav>
      </header>


      {/* Hero */}
      <section
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.50)), url('/india-hero.jpg')",
        }}
      >

        <div className="mx-auto max-w-4xl px-6 pt-20 text-center text-white">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-white/90">
            Travel • Discover • Experience
          </p>

          <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
            Discover the Beauty
            <span className="block text-yellow-400">
              Around You
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
            Explore India's diverse cultures, breathtaking landscapes,
            ancient heritage and unforgettable destinations.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">

            <Link
              href="/historical"
              className="rounded-md bg-red-500 px-7 py-3.5 font-semibold text-white shadow-lg transition hover:bg-red-600"
            >
              Explore Destinations
            </Link>

            <a
              href="#categories"
              className="rounded-md border border-white/70 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Explore Experiences
            </a>

          </div>

        </div>


        {/* Floating category bar */}
        <div className="absolute bottom-8 left-1/2 w-[90%] max-w-5xl -translate-x-1/2">

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-full bg-white px-6 py-4 text-sm font-medium text-slate-700 shadow-2xl">

            <a href="#india" className="hover:text-red-500">
              India 360
            </a>

            <span className="text-slate-300">|</span>

            <a href="#adventure" className="hover:text-red-500">
              Adventure
            </a>

            <span className="text-slate-300">|</span>

            <a href="#nature" className="hover:text-red-500">
              Nature
            </a>

            <span className="text-slate-300">|</span>

            <a href="#wildlife" className="hover:text-red-500">
              Wildlife
            </a>

            <span className="text-slate-300">|</span>

            <a href="#heritage" className="hover:text-red-500">
              Heritage
            </a>

            <span className="text-slate-300">|</span>

            <a href="#spiritual" className="hover:text-red-500">
              Spiritual
            </a>

          </div>

        </div>

      </section>


      {/* Introduction */}
      <section
        id="experiences"
        className="bg-white px-6 py-20"
      >

        <div className="mx-auto max-w-6xl text-center">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
            Explore India
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-5xl">
            Your Journey Starts Here
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            From ancient monuments and spiritual destinations to
            breathtaking mountains, beaches and wildlife, discover
            incredible experiences across India.
          </p>

        </div>

      </section>


      {/* Experiences */}
      <section
        id="categories"
        className="bg-slate-50 px-6 py-16"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-10">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
              Discover
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Explore by Experience
            </h2>

          </div>


          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {/* Heritage */}
            <Link
              href="/historical"
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

           <div className="h-52 overflow-hidden">
  <img
    src="/images/heritage.png"
    alt="Indian heritage"
    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
  />
</div>

              <div className="p-6">

                <h3 className="text-xl font-bold text-slate-900">
                  Heritage
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Explore India's ancient monuments, forts and historical
                  landmarks.
                </p>

                <p className="mt-5 font-semibold text-red-500">
                  Explore →
                </p>

              </div>

            </Link>


            {/* Nature */}
            <div
              id="nature"
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

             <div className="h-52 overflow-hidden">
  <img
    src="/images/nature.png"
    alt="Indian nature and landscapes"
    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
  />
</div>

              <div className="p-6">

                <h3 className="text-xl font-bold text-slate-900">
                  Nature
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Discover mountains, waterfalls, forests and scenic
                  landscapes.
                </p>

                <p className="mt-5 font-semibold text-red-500">
                  Explore →
                </p>

              </div>

            </div>


            {/* Wildlife */}
            <div
              id="wildlife"
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="h-52 overflow-hidden">
  <img
    src="/images/wildlife.png"
    alt="Indian wildlife"
    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
  />
</div>

              <div className="p-6">

                <h3 className="text-xl font-bold text-slate-900">
                  Wildlife
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Experience India's incredible wildlife and natural
                  habitats.
                </p>

                <p className="mt-5 font-semibold text-red-500">
                  Explore →
                </p>

              </div>

            </div>


            {/* Spiritual */}
            <div
              id="spiritual"
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="h-52 overflow-hidden">
  <img
    src="/images/spiritual.png"
    alt="Indian spiritual destination"
    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
  />
</div>

              <div className="p-6">

                <h3 className="text-xl font-bold text-slate-900">
                  Spiritual
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Visit India's famous temples and spiritual destinations.
                </p>

                <p className="mt-5 font-semibold text-red-500">
                  Explore →
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* Popular Historical Places */}
      {historicalPlaces.length > 0 && (
        <section className="bg-white px-6 py-20">

          <div className="mx-auto max-w-7xl">

            <div className="mb-10">

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
                Must Visit
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                Popular Historical Places
              </h2>

            </div>

            <div className="grid gap-6 md:grid-cols-3">

              {historicalPlaces.slice(0, 3).map((place) => (
                <Link
                  key={place.slug}
                  href={`/places/${place.slug}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  <div className="flex h-56 items-center justify-center bg-gradient-to-br from-amber-100 to-orange-50">

                    <span className="text-7xl transition group-hover:scale-110">
                      🏛️
                    </span>

                  </div>

                  <div className="p-6">

                    <h3 className="text-xl font-bold text-slate-900">
                      {place.name}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {place.district}, Telangana
                    </p>

                    <p className="mt-4 font-semibold text-red-500">
                      Explore →
                    </p>

                  </div>

                </Link>
              ))}

            </div>

          </div>

        </section>
      )}


      {/* Popular Temples */}
      {temples.length > 0 && (
        <section className="bg-slate-50 px-6 py-20">

          <div className="mx-auto max-w-7xl">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
              Spiritual Destinations
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Popular Temples
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">

              {temples.slice(0, 3).map((temple) => (
                <Link
                  key={temple.slug}
                  href={`/places/${temple.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  <div className="flex h-52 items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-50">

                    <span className="text-7xl transition group-hover:scale-110">
                      🛕
                    </span>

                  </div>

                  <div className="p-6">

                    <h3 className="text-xl font-bold text-slate-900">
                      {temple.name}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {temple.district}, Telangana
                    </p>

                    <p className="mt-4 font-semibold text-red-500">
                      Explore →
                    </p>

                  </div>

                </Link>
              ))}

            </div>

          </div>

        </section>
      )}


      {/* Footer */}
      <footer className="bg-slate-950 px-6 py-12 text-center text-white">

        <h2 className="text-xl font-bold">
          Travel Guide
        </h2>

        <p className="mt-3 text-sm text-slate-400">
          Discover India. Experience the journey.
        </p>

        <p className="mt-6 text-xs text-slate-500">
          © 2026 Travel Guide. All rights reserved.
        </p>

      </footer>

    </main>
  );
}