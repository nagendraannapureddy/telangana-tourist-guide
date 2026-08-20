import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/* =========================================================
   Types
   ========================================================= */

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface DarshanOption {
  name: string;
  description?: string;
}

export interface SevaItem {
  name: string;
  description?: string;
}

export interface PlaceMetadata {
  /* Basic information */
  name: string;
  name_en: string;
  category: string;
  state: string;
  district: string;

  /* Hero image */
  hero?: string;

  /* Location */
  location?: {
    city?: string;
    latitude?: number;
    longitude?: number;
  };

  /* Visit information */
  visit?: {
    best_time?: string;
    recommended_duration?: string;
  };

  /* Transport */
  transport?: {
    airport?: string;
    railway?: string;
    road?: string;
  };

  /* Accommodation */
  accommodation?: {
    available?: boolean;
    description?: string;
  };

  /* Facilities */
  facilities?: string[];

  /* Nearby places */
  nearby_places?: string[];

  /* Official website */
  official_url?: string;

  /* Gallery */
  gallery?: GalleryImage[];

  /* Travel tips */
  tips?: string[];

  /* FAQs */
  faqs?: {
    question: string;
    answer: string;
  }[];

  /* =======================================================
     Darshan
     ======================================================= */

  darshan?: {
    title?: string;
    description?: string;

    options?: DarshanOption[];

    official_link?: string;
    schemes_link?: string;
    timings_link?: string;
  };

  /* =======================================================
     Popular Sevas
     ======================================================= */

  sevas?: {
    title?: string;
    items?: SevaItem[];
  };
}


/* =========================================================
   Get complete place content
   ========================================================= */

export async function getPlaceContent(
  category: string,
  slug: string
) {
  const filePath = path.join(
    process.cwd(),
    "content",
    "telangana",
    category,
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Place content file not found: ${filePath}`
    );
  }

  const fileContents = fs.readFileSync(
    filePath,
    "utf8"
  );

  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);

  return {
    frontMatter: data as PlaceMetadata,
    contentHtml: processedContent.toString(),
  };
}


/* =========================================================
   Get all places from a category
   ========================================================= */

export function getPlacesByCategory(
  category: string
): (PlaceMetadata & { slug: string })[] {

  const directory = path.join(
    process.cwd(),
    "content",
    "telangana",
    category
  );

  if (!fs.existsSync(directory)) {
    return [];
  }

  const files = fs.readdirSync(directory);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {

      const filePath = path.join(
        directory,
        file
      );

      const fileContents = fs.readFileSync(
        filePath,
        "utf8"
      );

      const { data } = matter(fileContents);

      return {
        slug: file.replace(/\.md$/, ""),
        ...(data as PlaceMetadata),
      };
    });
}