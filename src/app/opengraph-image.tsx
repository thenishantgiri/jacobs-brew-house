import { createOGImage, ogSize } from "./_og-shared";

export const alt = "Jacob's Brew House — Premium Cafe Experience in Jaipur";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return createOGImage("Premium Cafe Experience", "Malviya Nagar, Jaipur");
}
