import { createOGImage, ogSize } from "../_og-shared";

export const alt = "Gallery — Jacob's Brew House";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return createOGImage("Gallery", "Explore Our Spaces");
}
