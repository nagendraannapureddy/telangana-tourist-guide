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
      category,
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
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h1 className="text-3xl font-bold">Place not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-green-800 text-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <h1 className="text-3xl font-bold">
            {place.frontMatter.name}
          </h1>

          <p className="mt-2 text-green-100">
            {place.frontMatter.name_en}
          </p>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-6 py-10">
        <div
          className="place-content"
          dangerouslySetInnerHTML={{
            __html: place.contentHtml,
          }}
        />
      </article>

      <footer className="mt-10 bg-green-900 px-6 py-8 text-center text-white">
        <p>© 2026 Telangana Tourist Guide</p>
      </footer>
    </main>
  );
}