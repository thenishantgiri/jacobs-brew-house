import { createOGImage, ogSize } from "../_og-shared";

export const alt = "Contact Jacob's Brew House";
export const size = ogSize;
export const contentType = "image/png";

export default async function OGImage() {
  return createOGImage("Get In Touch", "Malviya Nagar, Jaipur");
}
