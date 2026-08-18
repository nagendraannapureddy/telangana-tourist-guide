import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface PlaceMetadata {
  name: string;
  name_en: string;
  category: string;
  state: string;
  district: string;
}

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

  const fileContents = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);

  return {
    frontMatter: data as PlaceMetadata,
    contentHtml: processedContent.toString(),
  };
}

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
      const filePath = path.join(directory, file);
      const fileContents = fs.readFileSync(filePath, "utf8");

      const { data } = matter(fileContents);

      return {
        slug: file.replace(".md", ""),
        ...(data as PlaceMetadata),
      };
    });
}