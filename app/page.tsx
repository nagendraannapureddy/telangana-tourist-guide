import Link from "next/link";
import Image from "next/image";
import { getPlacesByCategory } from "@/lib/content";

export default function Home() {
  const historicalPlaces = getPlacesByCategory("historical");
  const temples = getPlacesByCategory("temples");

  return (
    <main className="min-h-screen bg-white">

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

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

        </nav>
      </header>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[760px] overflow-hidden bg-slate-900">

        <Image
          src="/india-hero.jpg"
          alt="Beautiful Indian heritage destination"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Hero content */}
        <div className="relative z-10 flex min-h-[760px] items-center justify-center px-6 pb-28 pt-24">

          <div className="max-w-5xl text-center text-white">

            <p className="text-sm font-bold uppercase tracking-[0.35em] text-white">
              Travel • Discover • Experience
            </p>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight md:text-7xl">
              Discover the Beauty
              <br />
              <span className="text-yellow-400">
                Around You
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/90 md:text-xl">
              Explore India&apos;s diverse cultures, breathtaking landscapes,
              ancient heritage and unforgettable destinations.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-4">

              <Link
                href="/historical"
                className="rounded-lg bg-red-500 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-red-600"
              >
                Explore Destinations
              </Link>

              <a
                href="#experiences"
                className="rounded-lg border border-white/70 bg-black/20 px-8 py-4 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Explore Experiences
              </a>

            </div>

          </div>

        </div>


        {/* =====================================================
            CATEGORY BAR
        ===================================================== */}

        <div className="absolute bottom-8 left-1/2 z-20 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2">

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-full bg-white px-6 py-4 text-sm font-medium text-slate-600 shadow-xl md:gap-x-7">

            <a
              href="#"
              className="transition hover:text-red-500"
            >
              India 360
            </a>

            <span className="hidden h-5 w-px bg-slate-300 md:block" />

            <a
              href="#experiences"
              className="transition hover:text-red-500"
            >
              Adventure
            </a>

            <span className="hidden h-5 w-px bg-slate-300 md:block" />

            <a
              href="#categories"
              className="transition hover:text-red-500"
            >
              Nature
            </a>

            <span className="hidden h-5 w-px bg-slate-300 md:block" />

            <a
              href="#categories"
              className="transition hover:text-red-500"
            >
              Wildlife
            </a>

            <span className="hidden h-5 w-px bg-slate-300 md:block" />

            <a
              href="#experiences"
              className="transition hover:text-red-500"
            >
              Heritage
            </a>

            <span className="hidden h-5 w-px bg-slate-300 md:block" />

            <a
              href="#temples"
              className="transition hover:text-red-500"
            >
              Spiritual
            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="bg-white px-6 py-20">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
            Discover Telangana
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Explore the Heart of Telangana
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Discover temples, historical landmarks, cultural destinations,
            architecture and natural beauty across Telangana.
          </p>

        </div>

      </section>


      {/* =====================================================
          HISTORICAL DESTINATIONS
      ===================================================== */}

      {historicalPlaces.length > 0 && (

        <section
          id="experiences"
          className="bg-slate-50 px-6 py-20"
        >

          <div className="mx-auto max-w-7xl">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
              Explore Heritage
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Historical Destinations
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Explore forts, monuments, ancient architecture and historic
              destinations across Telangana.
            </p>


            <div className="mt-10 grid gap-6 md:grid-cols-3">

              {historicalPlaces.slice(0, 6).map((place) => (

                <Link
                  key={place.slug}
                  href={`/places/${place.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  {/* Image */}

                  <div className="relative h-52 overflow-hidden bg-slate-100">

                    {place.hero ? (

                      <Image
                        src={place.hero}
                        alt={place.name_en || place.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center bg-slate-100">
                        <span className="text-6xl">
                          🏛️
                        </span>
                      </div>

                    )}

                  </div>


                  {/* Information */}

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


      {/* =====================================================
          POPULAR TEMPLES
      ===================================================== */}

      {temples.length > 0 && (

        <section
          id="temples"
          className="bg-white px-6 py-20"
        >

          <div className="mx-auto max-w-7xl">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
              Spiritual Destinations
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Popular Temples
            </h2>

            <p className="mt-3 max-w-2xl text-slate-600">
              Explore important temples and pilgrimage destinations
              throughout Telangana.
            </p>


            <div className="mt-10 grid gap-6 md:grid-cols-3">

              {temples.slice(0, 6).map((temple) => (

                <Link
                  key={temple.slug}
                  href={`/places/${temple.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  {/* =================================================
                      TEMPLE IMAGE
                  ================================================= */}

                  <div className="relative h-52 overflow-hidden bg-slate-100">

                    {temple.hero ? (

                      <Image
                        src={temple.hero}
                        alt={temple.name_en || temple.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-50">

                        <span className="text-7xl">
                          🛕
                        </span>

                      </div>

                    )}

                  </div>


                  {/* =================================================
                      TEMPLE INFORMATION
                  ================================================= */}

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


      {/* =====================================================
          CATEGORIES
      ===================================================== */}

      <section
        id="categories"
        className="bg-slate-50 px-6 py-20"
      >

        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
            Explore More
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Plan Your Telangana Journey
          </h2>


          <div className="mt-10 grid gap-6 md:grid-cols-3">


            {/* Historical */}

            <Link
              href="/historical"
              className="group rounded-2xl bg-white p-8 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="text-5xl">
                🏛️
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Historical Places
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Explore forts, monuments and historic destinations
                across Telangana.
              </p>

              <p className="mt-5 font-semibold text-red-500">
                Explore →
              </p>

            </Link>


            {/* Temples */}

            <a
              href="#temples"
              className="group rounded-2xl bg-white p-8 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="text-5xl">
                🛕
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Temples
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Discover important temples and spiritual destinations
                throughout Telangana.
              </p>

              <p className="mt-5 font-semibold text-red-500">
                Explore →
              </p>

            </a>


            {/* Trip Planning */}

            <Link
              href="/historical"
              className="group rounded-2xl bg-white p-8 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="text-5xl">
                🗺️
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Plan Your Trip
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Find destinations, travel information and useful
                details for planning your journey.
              </p>

              <p className="mt-5 font-semibold text-red-500">
                Start Planning →
              </p>

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          CALL TO ACTION
      ===================================================== */}

      <section className="bg-slate-900 px-6 py-20 text-white">

        <div className="mx-auto max-w-5xl text-center">

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
            Start Exploring
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Your Telangana Journey Starts Here
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Explore historical landmarks, temples and cultural
            destinations across Telangana.
          </p>

          <div className="mt-8">

            <Link
              href="/historical"
              className="inline-block rounded-lg bg-red-500 px-8 py-3.5 font-semibold text-white transition hover:bg-red-600"
            >
              Explore Destinations →
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

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