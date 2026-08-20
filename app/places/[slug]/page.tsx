import Link from "next/link";
import { getPlaceContent, getPlacesByCategory } from "@/lib/content";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const categories = [
  "temples",
  "historical",
  "nature",
  "attractions",
];

export function generateStaticParams() {
  return categories.flatMap((category) =>
    getPlacesByCategory(category).map((place) => ({
      slug: place.slug,
    }))
  );
}

export default async function PlacePage({ params }: PageProps) {
  const { slug } = await params;

  let place;
  let category: string | undefined;

  for (const currentCategory of categories) {
    try {
      place = await getPlaceContent(currentCategory, slug);
      category = currentCategory;
      break;
    } catch {
      // Try the next category
    }
  }

  if (!place || !category) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Place not found
          </h1>

          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-red-500 px-6 py-3 font-semibold text-white"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const metadata = place.frontMatter;

  const heroStyle = metadata.hero
    ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.20), rgba(0,0,0,0.70)), url('${metadata.hero}')`,
      }
    : {
        backgroundImage:
          "linear-gradient(135deg, #166534, #14532d)",
      };

  const directionsUrl =
    metadata.location?.latitude &&
    metadata.location?.longitude
      ? `https://www.google.com/maps/dir/?api=1&destination=${metadata.location.latitude},${metadata.location.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${metadata.name_en}, ${metadata.district}, ${metadata.state}`
        )}`;

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ========================================================= */}
      {/* Navigation */}
      {/* ========================================================= */}

      <header className="absolute left-0 right-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-white">

          <Link
            href="/"
            className="text-xl font-bold tracking-wide"
          >
            Travel Guide
          </Link>

          <Link
            href="/"
            className="rounded-md bg-white/15 px-5 py-2 text-sm font-medium backdrop-blur-sm transition hover:bg-white/25"
          >
            ← Home
          </Link>

        </nav>
      </header>


      {/* ========================================================= */}
      {/* Hero */}
      {/* ========================================================= */}

      <section
        className="relative flex min-h-[620px] items-end bg-cover bg-center"
        style={heroStyle}
      >

        <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-32">

          <div className="max-w-4xl text-white">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
              {category}
            </p>

            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              {metadata.name_en || metadata.name}
            </h1>

            <p className="mt-4 text-lg text-white/90 md:text-xl">
              {metadata.location?.city || metadata.district},{" "}
              {metadata.state}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-red-600"
              >
                📍 Get Directions
              </a>

              <a
                href="#plan-your-visit"
                className="rounded-lg border border-white/70 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                Plan Your Visit
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================================= */}
      {/* Quick Information */}
      {/* ========================================================= */}

      <section className="-mt-8 relative z-10 px-6">

        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-4">

          {/* Location */}
          <div className="rounded-xl bg-white p-5 shadow-xl">
            <p className="text-sm text-slate-500">
              Location
            </p>

            <p className="mt-1 font-bold text-slate-900">
              {metadata.location?.city || metadata.district}
            </p>
          </div>


          {/* District */}
          <div className="rounded-xl bg-white p-5 shadow-xl">
            <p className="text-sm text-slate-500">
              District
            </p>

            <p className="mt-1 font-bold text-slate-900">
              {metadata.district}
            </p>
          </div>


          {/* State */}
          <div className="rounded-xl bg-white p-5 shadow-xl">
            <p className="text-sm text-slate-500">
              State
            </p>

            <p className="mt-1 font-bold text-slate-900">
              {metadata.state}
            </p>
          </div>


          {/* Category */}
          <div className="rounded-xl bg-white p-5 shadow-xl">
            <p className="text-sm text-slate-500">
              Category
            </p>

            <p className="mt-1 font-bold capitalize text-slate-900">
              {metadata.category}
            </p>
          </div>

        </div>

      </section>


      {/* ========================================================= */}
      {/* Main Content */}
      {/* ========================================================= */}

      <div className="mx-auto max-w-6xl px-6 py-16">


        {/* ======================================================= */}
        {/* About */}
        {/* ======================================================= */}

        <section className="rounded-2xl bg-white p-8 shadow-sm md:p-10">

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
            About the Destination
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            About {metadata.name_en || metadata.name}
          </h2>

          <div
            className="place-content mt-6"
            dangerouslySetInnerHTML={{
              __html: place.contentHtml,
            }}
          />

        </section>


        {/* ======================================================= */}
        {/* Photo Gallery */}
        {/* ======================================================= */}

        {metadata.gallery && metadata.gallery.length > 0 && (
          <section className="mt-12">

            <div className="mb-7">

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Photos
              </h2>

            </div>


            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

              {/* Hero Image */}
              {metadata.hero && (
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm md:col-span-2 md:row-span-2">

                  <img
                    src={metadata.hero}
                    alt={metadata.name_en || metadata.name}
                    className="h-full min-h-[420px] w-full object-cover transition duration-500 hover:scale-105"
                  />

                </div>
              )}


              {/* Gallery Images */}
              {metadata.gallery.map((image) => (
                <div
                  key={image.src}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >

                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-48 w-full object-cover transition duration-500 hover:scale-105"
                  />

                </div>
              ))}

            </div>

          </section>
        )}


        {/* ======================================================= */}
        {/* Plan Your Visit */}
        {/* ======================================================= */}

        <section
          id="plan-your-visit"
          className="mt-12"
        >

          {/* Section Heading */}
          <div className="mb-7">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
              Plan Your Visit
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Everything You Need to Know
            </h2>

          </div>


          {/* Visit Information Cards */}
          <div className="grid gap-6 md:grid-cols-2">


            {/* ================================================= */}
            {/* Visit Information */}
            {/* ================================================= */}

            <div className="rounded-2xl bg-white p-7 shadow-sm">

              <div className="text-3xl">
                🗓️
              </div>

              <h3 className="mt-4 text-xl font-bold text-slate-900">
                Visit Information
              </h3>

              {metadata.visit ? (
                <div className="mt-4 space-y-3 text-slate-600">

                  {metadata.visit.best_time && (
                    <p>
                      <strong>Best time:</strong>{" "}
                      {metadata.visit.best_time}
                    </p>
                  )}

                  {metadata.visit.recommended_duration && (
                    <p>
                      <strong>Recommended duration:</strong>{" "}
                      {metadata.visit.recommended_duration}
                    </p>
                  )}

                </div>
              ) : (
                <p className="mt-3 text-slate-600">
                  Visit information will be added soon.
                </p>
              )}

            </div>


            {/* ================================================= */}
            {/* Transport */}
            {/* ================================================= */}

            <div className="rounded-2xl bg-white p-7 shadow-sm">

              <div className="text-3xl">
                🚗
              </div>

              <h3 className="mt-4 text-xl font-bold text-slate-900">
                How to Reach
              </h3>

              {metadata.transport ? (
                <div className="mt-4 space-y-3 text-slate-600">

                  {metadata.transport.airport && (
                    <p>
                      <strong>By Air:</strong>{" "}
                      {metadata.transport.airport}
                    </p>
                  )}

                  {metadata.transport.railway && (
                    <p>
                      <strong>By Train:</strong>{" "}
                      {metadata.transport.railway}
                    </p>
                  )}

                  {metadata.transport.road && (
                    <p>
                      <strong>By Road:</strong>{" "}
                      {metadata.transport.road}
                    </p>
                  )}

                </div>
              ) : (
                <p className="mt-3 text-slate-600">
                  Transportation information will be added soon.
                </p>
              )}

            </div>


            {/* ================================================= */}
            {/* Accommodation */}
            {/* ================================================= */}

            <div className="rounded-2xl bg-white p-7 shadow-sm">

              <div className="text-3xl">
                🏨
              </div>

              <h3 className="mt-4 text-xl font-bold text-slate-900">
                Accommodation
              </h3>

              {metadata.accommodation?.available ? (
                <p className="mt-3 leading-7 text-slate-600">
                  {metadata.accommodation.description ||
                    "Accommodation is available near this destination."}
                </p>
              ) : (
                <p className="mt-3 leading-7 text-slate-600">
                  Accommodation information will be added soon.
                </p>
              )}

            </div>


            {/* ================================================= */}
            {/* Official Information */}
            {/* ================================================= */}

            <div className="rounded-2xl bg-white p-7 shadow-sm">

              <div className="text-3xl">
                🛕
              </div>

              <h3 className="mt-4 text-xl font-bold text-slate-900">
                Visitor Information
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Check the latest official information before travelling.
                Timings, ticket availability, prices and visitor rules may
                change.
              </p>

              {metadata.official_url && (
                <a
                  href={metadata.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block font-semibold text-red-500 hover:text-red-600"
                >
                  Official Information →
                </a>
              )}

            </div>

          </div>

        </section>


        {/* ======================================================= */}
        {/* Darshan & Seva */}
        {/* ======================================================= */}

        {(metadata.darshan || metadata.sevas) && (
          <section className="mt-16">

            {/* Section Heading */}
            <div className="mb-8">

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
                TEMPLE SERVICES
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Darshan & Seva
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                Information about darshan and temple sevas. Availability,
                timings and booking arrangements may change, so visitors
                should verify the latest information from official temple
                sources.
              </p>

            </div>


            {/* ================================================= */}
            {/* Darshan Information */}
            {/* ================================================= */}

            {metadata.darshan && (
              <div className="mb-12">

                <div className="mb-6">

                  <h3 className="text-2xl font-bold text-slate-900">
                    {metadata.darshan.title || "Darshan Information"}
                  </h3>

                  {metadata.darshan.description && (
                    <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                      {metadata.darshan.description}
                    </p>
                  )}

                </div>


                {/* Darshan Options */}
                {metadata.darshan.options &&
                  metadata.darshan.options.length > 0 && (
                    <div className="grid gap-6 md:grid-cols-2">

                      {metadata.darshan.options.map((option) => (
                        <div
                          key={option.name}
                          className="rounded-2xl bg-white p-7 shadow-sm"
                        >

                          <div className="mb-4 text-3xl">
                            🙏
                          </div>

                          <h4 className="text-xl font-bold text-slate-900">
                            {option.name}
                          </h4>

                          {option.description && (
                            <p className="mt-3 leading-7 text-slate-600">
                              {option.description}
                            </p>
                          )}

                        </div>
                      ))}

                    </div>
                  )}

              </div>
            )}


            {/* ================================================= */}
            {/* Popular Sevas */}
            {/* ================================================= */}

            {metadata.sevas && (
              <div>

                <div className="mb-6">

                  <h3 className="text-2xl font-bold text-slate-900">
                    {metadata.sevas.title || "Popular Sevas"}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    Popular religious services and sevas associated with
                    the temple.
                  </p>

                </div>


                {/* Seva Cards */}
                {metadata.sevas.items &&
                  metadata.sevas.items.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                      {metadata.sevas.items.map((seva) => (
                        <div
                          key={seva.name}
                          className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >

                          <div className="mb-4 text-3xl">
                            🛕
                          </div>

                          <h4 className="text-xl font-bold text-slate-900">
                            {seva.name}
                          </h4>

                          {seva.description && (
                            <p className="mt-3 leading-7 text-slate-600">
                              {seva.description}
                            </p>
                          )}

                        </div>
                      ))}

                    </div>
                  )}

              </div>
            )}


            {/* ================================================= */}
            {/* Official Links */}
            {/* ================================================= */}

            {metadata.darshan &&
              (metadata.darshan.official_link ||
                metadata.darshan.schemes_link ||
                metadata.darshan.timings_link) && (
                <div className="mt-12 border-t border-slate-200 pt-8">

                  <h3 className="text-xl font-bold text-slate-900">
                    Official Information & Booking
                  </h3>

                  <p className="mt-2 text-slate-600">
                    Use the official temple sources to verify the latest
                    timings, seva availability and booking information.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-4">

                    {metadata.darshan.official_link && (
                      <a
                        href={metadata.darshan.official_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
                      >
                        Official Website →
                      </a>
                    )}

                    {metadata.darshan.schemes_link && (
                      <a
                        href={metadata.darshan.schemes_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-50"
                      >
                        Seva Schemes →
                      </a>
                    )}

                    {metadata.darshan.timings_link && (
                      <a
                        href={metadata.darshan.timings_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-50"
                      >
                        Temple Timings →
                      </a>
                    )}

                  </div>

                </div>
              )}

          </section>
        )}


        {/* ======================================================= */}
        {/* Facilities */}
        {/* ======================================================= */}

        {metadata.facilities &&
          metadata.facilities.length > 0 && (
            <section className="mt-12 rounded-2xl bg-slate-900 p-8 text-white md:p-10">

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">
                Visitor Facilities
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Facilities for Visitors
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">

                {metadata.facilities.map((facility) => (
                  <div
                    key={facility}
                    className="rounded-xl bg-white/10 p-5"
                  >
                    <p className="font-semibold">
                      ✓ {facility}
                    </p>
                  </div>
                ))}

              </div>

            </section>
          )}


        {/* ======================================================= */}
        {/* Nearby Places */}
        {/* ======================================================= */}

        {metadata.nearby_places &&
          metadata.nearby_places.length > 0 && (
            <section className="mt-12">

              <div className="mb-7">

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
                  Explore More
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  Nearby Places
                </h2>

              </div>


              <div className="grid gap-5 md:grid-cols-3">

                {metadata.nearby_places.map((placeName) => (
                  <div
                    key={placeName}
                    className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >

                    <h3 className="text-xl font-bold text-slate-900">
                      {placeName}
                    </h3>

                    <p className="mt-2 text-slate-600">
                      Explore this destination while planning
                      your trip.
                    </p>

                  </div>
                ))}

              </div>

            </section>
          )}


        {/* ======================================================= */}
        {/* Travel Tips */}
        {/* ======================================================= */}

        {metadata.tips &&
          metadata.tips.length > 0 && (
            <section className="mt-12 rounded-2xl bg-white p-8 shadow-sm md:p-10">

              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
                Travel Tips
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Tips for Visitors
              </h2>

              <ul className="mt-7 grid gap-4 md:grid-cols-2">

                {metadata.tips.map((tip) => (
                  <li
                    key={tip}
                    className="rounded-xl bg-slate-50 p-4 text-slate-700"
                  >
                    ✓ {tip}
                  </li>
                ))}

              </ul>

            </section>
          )}


        {/* ======================================================= */}
        {/* FAQ */}
        {/* ======================================================= */}

        {metadata.faqs &&
          metadata.faqs.length > 0 && (
            <section className="mt-12">

              <div className="mb-7">

                <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-500">
                  FAQ
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  Frequently Asked Questions
                </h2>

              </div>


              <div className="space-y-4">

                {metadata.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="rounded-xl bg-white p-6 shadow-sm"
                  >

                    <summary className="cursor-pointer font-bold text-slate-900">
                      {faq.question}
                    </summary>

                    <p className="mt-4 leading-7 text-slate-600">
                      {faq.answer}
                    </p>

                  </details>
                ))}

              </div>

            </section>
          )}

      </div>


      {/* ========================================================= */}
      {/* Footer */}
      {/* ========================================================= */}

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