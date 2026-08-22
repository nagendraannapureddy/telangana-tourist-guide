import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPlaceContent,
  getPlacesByCategory,
} from "@/lib/content";

/* =========================================================
   STATIC PARAMS
   Required because the project uses output: "export"
   ========================================================= */

export function generateStaticParams() {
  const historical = getPlacesByCategory("historical");
  const temples = getPlacesByCategory("temples");

  return [
    ...historical.map((place) => ({
      slug: place.slug,
    })),
    ...temples.map((place) => ({
      slug: place.slug,
    })),
  ];
}


/* =========================================================
   PLACE PAGE
   ========================================================= */

export default async function PlacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  /* ---------------------------------------------------------
     Find the place category
     --------------------------------------------------------- */

  const historicalPlaces = getPlacesByCategory("historical");
  const templePlaces = getPlacesByCategory("temples");

  const historicalPlace = historicalPlaces.find(
    (place) => place.slug === slug
  );

  const templePlace = templePlaces.find(
    (place) => place.slug === slug
  );

  const place = historicalPlace || templePlace;

  if (!place) {
    notFound();
  }

  const category = historicalPlace
    ? "historical"
    : "temples";

  /* ---------------------------------------------------------
     Get Markdown content
     --------------------------------------------------------- */

  const { frontMatter, contentHtml } =
    await getPlaceContent(category, slug);


  return (
    <main className="min-h-screen bg-slate-50">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-slate-950">

        <div className="relative h-[520px] w-full">

          {frontMatter.hero ? (

            <Image
              src={frontMatter.hero}
              alt={
                frontMatter.name_en ||
                frontMatter.name
              }
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />

          ) : (

            <div className="flex h-full items-center justify-center bg-slate-800">

              <span className="text-8xl">
                {category === "temples" ? "🛕" : "🏛️"}
              </span>

            </div>

          )}

          <div className="absolute inset-0 bg-black/45" />


          {/* Navigation */}

          <div className="absolute left-0 right-0 top-0 z-20">

            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">

              <Link
                href="/"
                className="text-xl font-bold text-white"
              >
                Travel Guide
              </Link>

              <div className="hidden items-center gap-8 md:flex">

                <Link
                  href="/historical"
                  className="text-sm font-medium text-white/90 hover:text-white"
                >
                  Destinations
                </Link>

                <Link
                  href="/#experiences"
                  className="text-sm font-medium text-white/90 hover:text-white"
                >
                  Experiences
                </Link>

                <Link
                  href="/#categories"
                  className="text-sm font-medium text-white/90 hover:text-white"
                >
                  Categories
                </Link>

                <Link
                  href="/historical"
                  className="rounded-md bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
                >
                  Plan Your Trip
                </Link>

              </div>

            </nav>

          </div>


          {/* Hero text */}

          <div className="absolute inset-0 z-10 flex items-end">

            <div className="mx-auto w-full max-w-7xl px-6 pb-16">

              <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-400">
                {category === "temples"
                  ? "Spiritual Destination"
                  : "Historical Destination"}
              </p>

              <h1 className="mt-4 max-w-5xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
                {frontMatter.name}
              </h1>

              <p className="mt-4 text-lg text-white/90">
                {frontMatter.location?.city ||
                  frontMatter.district}
                , {frontMatter.state}
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          QUICK INFORMATION
      ===================================================== */}

      <section className="relative z-20 -mt-10 px-6">

        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">


          {/* Location */}

          <div className="rounded-2xl bg-white p-6 shadow-lg">

            <p className="text-sm text-slate-500">
              Location
            </p>

            <p className="mt-2 text-lg font-bold text-slate-900">
              {frontMatter.location?.city ||
                frontMatter.district}
            </p>

          </div>


          {/* District */}

          <div className="rounded-2xl bg-white p-6 shadow-lg">

            <p className="text-sm text-slate-500">
              District
            </p>

            <p className="mt-2 text-lg font-bold text-slate-900">
              {frontMatter.district}
            </p>

          </div>


          {/* State */}

          <div className="rounded-2xl bg-white p-6 shadow-lg">

            <p className="text-sm text-slate-500">
              State
            </p>

            <p className="mt-2 text-lg font-bold text-slate-900">
              {frontMatter.state}
            </p>

          </div>


          {/* Category */}

          <div className="rounded-2xl bg-white p-6 shadow-lg">

            <p className="text-sm text-slate-500">
              Category
            </p>

            <p className="mt-2 text-lg font-bold capitalize text-slate-900">
              {frontMatter.category}
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT THE DESTINATION
      ===================================================== */}

      <section className="px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-12">

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
              About the Destination
            </p>

            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              About {frontMatter.name_en || frontMatter.name}
            </h2>


            {/* =================================================
                IMPORTANT:
                Markdown HTML styling
                ================================================= */}

            <div
              className="
                mt-10

                text-lg
                leading-8
                text-slate-700

                [&_h1]:mb-6
                [&_h1]:mt-10
                [&_h1]:text-4xl
                [&_h1]:font-bold
                [&_h1]:leading-tight
                [&_h1]:text-slate-900

                [&_h2]:mb-5
                [&_h2]:mt-14
                [&_h2]:border-b
                [&_h2]:border-green-200
                [&_h2]:pb-4
                [&_h2]:text-3xl
                [&_h2]:font-bold
                [&_h2]:leading-tight
                [&_h2]:text-green-800

                [&_h3]:mb-4
                [&_h3]:mt-10
                [&_h3]:text-2xl
                [&_h3]:font-bold
                [&_h3]:text-slate-900

                [&_p]:mb-6
                [&_p]:leading-8

                [&_ul]:mb-8
                [&_ul]:ml-6
                [&_ul]:list-disc
                [&_ul]:space-y-3

                [&_ol]:mb-8
                [&_ol]:ml-6
                [&_ol]:list-decimal
                [&_ol]:space-y-3

                [&_li]:pl-2

                [&_a]:font-semibold
                [&_a]:text-red-500
                [&_a]:underline
                [&_a]:hover:text-red-600

                [&_strong]:font-bold
                [&_strong]:text-slate-900

                [&_em]:italic

                [&_blockquote]:my-8
                [&_blockquote]:border-l-4
                [&_blockquote]:border-green-600
                [&_blockquote]:bg-green-50
                [&_blockquote]:p-5
                [&_blockquote]:italic
              "
              dangerouslySetInnerHTML={{
                __html: contentHtml,
              }}
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          PHOTOS
      ===================================================== */}

      {frontMatter.gallery &&
        frontMatter.gallery.length > 0 && (

          <section className="px-6 pb-20">

            <div className="mx-auto max-w-7xl">

              <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
                Explore
              </p>

              <h2 className="mt-2 text-4xl font-bold text-slate-900">
                Photos
              </h2>


              <div className="mt-10 grid gap-5 md:grid-cols-3">

                {frontMatter.gallery.map(
                  (image, index) => (

                    <div
                      key={`${image.src}-${index}`}
                      className={`
                        relative overflow-hidden rounded-2xl
                        bg-slate-100
                        ${
                          index === 0
                            ? "md:col-span-2 md:row-span-2 h-[420px]"
                            : "h-[200px]"
                        }
                      `}
                    >

                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition duration-500 hover:scale-105"
                        sizes={
                          index === 0
                            ? "(max-width: 768px) 100vw, 66vw"
                            : "(max-width: 768px) 100vw, 33vw"
                        }
                      />

                    </div>

                  )
                )}

              </div>

            </div>

          </section>

        )}


      {/* =====================================================
          PLAN YOUR VISIT
      ===================================================== */}

      <section
        id="plan-your-visit"
        className="bg-slate-50 px-6 py-20"
      >

        <div className="mx-auto max-w-7xl">

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
            Plan Your Visit
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-900">
            Everything You Need to Know
          </h2>


          <div className="mt-10 grid gap-6 md:grid-cols-2">


            {/* Visit Information */}

            {frontMatter.visit && (

              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

                <div className="text-4xl">
                  📅
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  Visit Information
                </h3>

                {frontMatter.visit.best_time && (

                  <p className="mt-5 text-slate-600">
                    <strong className="text-slate-900">
                      Best time:
                    </strong>{" "}
                    {frontMatter.visit.best_time}
                  </p>

                )}

                {frontMatter.visit.recommended_duration && (

                  <p className="mt-3 text-slate-600">
                    <strong className="text-slate-900">
                      Recommended duration:
                    </strong>{" "}
                    {frontMatter.visit.recommended_duration}
                  </p>

                )}

              </div>

            )}


            {/* How to Reach */}

            {frontMatter.transport && (

              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

                <div className="text-4xl">
                  🚗
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  How to Reach
                </h3>

                {frontMatter.transport.airport && (

                  <p className="mt-5 text-slate-600">
                    <strong className="text-slate-900">
                      By Air:
                    </strong>{" "}
                    {frontMatter.transport.airport}
                  </p>

                )}

                {frontMatter.transport.railway && (

                  <p className="mt-3 text-slate-600">
                    <strong className="text-slate-900">
                      By Train:
                    </strong>{" "}
                    {frontMatter.transport.railway}
                  </p>

                )}

                {frontMatter.transport.road && (

                  <p className="mt-3 text-slate-600">
                    <strong className="text-slate-900">
                      By Road:
                    </strong>{" "}
                    {frontMatter.transport.road}
                  </p>

                )}

              </div>

            )}


            {/* Accommodation */}

            {frontMatter.accommodation && (

              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

                <div className="text-4xl">
                  🏨
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  Accommodation
                </h3>

                <p className="mt-5 leading-7 text-slate-600">
                  {frontMatter.accommodation.description ||
                    "Accommodation options are available near the destination. Check current availability before travelling."}
                </p>

              </div>

            )}


            {/* Official Information */}

            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">

              <div className="text-4xl">
                🛕
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Visitor Information
              </h3>

              <p className="mt-5 leading-7 text-slate-600">
                Check the latest official information before
                travelling. Timings, ticket availability,
                prices and visitor rules may change.
              </p>

              {frontMatter.official_url && (

                <a
                  href={frontMatter.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block font-semibold text-red-500 hover:text-red-600"
                >
                  Official Information →
                </a>

              )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          DARSHAN INFORMATION
      ===================================================== */}

      {frontMatter.darshan && (

        <section className="px-6 py-20">

          <div className="mx-auto max-w-7xl">

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
              Temple Services
            </p>

            <h2 className="mt-2 text-4xl font-bold text-slate-900">
              {frontMatter.darshan.title ||
                "Darshan Information"}
            </h2>

            {frontMatter.darshan.description && (

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                {frontMatter.darshan.description}
              </p>

            )}


            {/* Darshan Options */}

            {frontMatter.darshan.options &&
              frontMatter.darshan.options.length > 0 && (

                <div className="mt-10 grid gap-6 md:grid-cols-2">

                  {frontMatter.darshan.options.map(
                    (option, index) => (

                      <div
                        key={`${option.name}-${index}`}
                        className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200"
                      >

                        <h3 className="text-xl font-bold text-slate-900">
                          {option.name}
                        </h3>

                        {option.description && (

                          <p className="mt-3 leading-7 text-slate-600">
                            {option.description}
                          </p>

                        )}

                      </div>

                    )
                  )}

                </div>

              )}


            {/* Official links */}

            <div className="mt-8 flex flex-wrap gap-4">

              {frontMatter.darshan.official_link && (

                <a
                  href={frontMatter.darshan.official_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
                >
                  Official Information →
                </a>

              )}

              {frontMatter.darshan.schemes_link && (

                <a
                  href={frontMatter.darshan.schemes_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Darshan / Schemes →
                </a>

              )}

              {frontMatter.darshan.timings_link && (

                <a
                  href={frontMatter.darshan.timings_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Timings →
                </a>

              )}

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          POPULAR SEVAS
      ===================================================== */}

      {frontMatter.sevas &&
        frontMatter.sevas.items &&
        frontMatter.sevas.items.length > 0 && (

          <section className="bg-slate-50 px-6 py-20">

            <div className="mx-auto max-w-7xl">

              <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
                Temple Services
              </p>

              <h2 className="mt-2 text-4xl font-bold text-slate-900">
                {frontMatter.sevas.title ||
                  "Popular Sevas"}
              </h2>


              <div className="mt-10 grid gap-6 md:grid-cols-3">

                {frontMatter.sevas.items.map(
                  (seva, index) => (

                    <div
                      key={`${seva.name}-${index}`}
                      className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200"
                    >

                      <div className="text-4xl">
                        🙏
                      </div>

                      <h3 className="mt-5 text-xl font-bold text-slate-900">
                        {seva.name}
                      </h3>

                      {seva.description && (

                        <p className="mt-3 leading-7 text-slate-600">
                          {seva.description}
                        </p>

                      )}

                    </div>

                  )
                )}

              </div>

            </div>

          </section>

        )}


      {/* =====================================================
          FACILITIES
      ===================================================== */}

      {frontMatter.facilities &&
        frontMatter.facilities.length > 0 && (

          <section className="px-6 py-20">

            <div className="mx-auto max-w-7xl rounded-3xl bg-slate-950 p-8 md:p-12">

              <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
                Visitor Facilities
              </p>

              <h2 className="mt-3 text-4xl font-bold text-white">
                Facilities for Visitors
              </h2>


              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                {frontMatter.facilities.map(
                  (facility, index) => (

                    <div
                      key={`${facility}-${index}`}
                      className="rounded-xl bg-slate-800 px-6 py-5 text-lg font-semibold text-white"
                    >
                      ✓ {facility}
                    </div>

                  )
                )}

              </div>

            </div>

          </section>

        )}


      {/* =====================================================
          NEARBY PLACES
      ===================================================== */}

      {frontMatter.nearby_places &&
        frontMatter.nearby_places.length > 0 && (

          <section className="bg-slate-50 px-6 py-20">

            <div className="mx-auto max-w-7xl">

              <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
                Explore More
              </p>

              <h2 className="mt-2 text-4xl font-bold text-slate-900">
                Nearby Places
              </h2>


              <div className="mt-10 grid gap-6 md:grid-cols-3">

                {frontMatter.nearby_places.map(
                  (nearby, index) => (

                    <div
                      key={`${nearby}-${index}`}
                      className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200"
                    >

                      <h3 className="text-xl font-bold text-slate-900">
                        {nearby}
                      </h3>

                      <p className="mt-3 text-slate-600">
                        Explore this destination while planning
                        your trip.
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

          </section>

        )}


      {/* =====================================================
          TRAVEL TIPS
      ===================================================== */}

      {frontMatter.tips &&
        frontMatter.tips.length > 0 && (

          <section className="px-6 py-20">

            <div className="mx-auto max-w-7xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-12">

              <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
                Travel Tips
              </p>

              <h2 className="mt-2 text-4xl font-bold text-slate-900">
                Tips for Visitors
              </h2>


              <div className="mt-10 grid gap-5 md:grid-cols-2">

                {frontMatter.tips.map(
                  (tip, index) => (

                    <div
                      key={`${tip}-${index}`}
                      className="rounded-xl bg-slate-50 px-6 py-5 text-lg text-slate-700"
                    >
                      ✓ {tip}
                    </div>

                  )
                )}

              </div>

            </div>

          </section>

        )}


      {/* =====================================================
          FAQ
      ===================================================== */}

      {frontMatter.faqs &&
        frontMatter.faqs.length > 0 && (

          <section className="bg-slate-50 px-6 py-20">

            <div className="mx-auto max-w-7xl">

              <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
                FAQ
              </p>

              <h2 className="mt-2 text-4xl font-bold text-slate-900">
                Frequently Asked Questions
              </h2>


              <div className="mt-10 space-y-5">

                {frontMatter.faqs.map(
                  (faq, index) => (

                    <details
                      key={`${faq.question}-${index}`}
                      className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
                    >

                      <summary className="cursor-pointer list-none text-lg font-bold text-slate-900">
                        <span className="mr-3 inline-block transition group-open:rotate-90">
                          ▶
                        </span>

                        {faq.question}
                      </summary>

                      <p className="mt-5 pl-7 leading-8 text-slate-600">
                        {faq.answer}
                      </p>

                    </details>

                  )
                )}

              </div>

            </div>

          </section>

        )}


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