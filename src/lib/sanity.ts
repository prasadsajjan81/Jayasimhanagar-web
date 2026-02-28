import { createClient } from "next-sanity";
// Changed to named export to remove the warning
import createImageUrlBuilder from '@sanity/image-url'; 

export const client = createClient({
  projectId: "tx0yow9y", // Ensure your real ID is here
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

// Updated way to initialize the image builder
const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}