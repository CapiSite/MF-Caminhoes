import path from "path";

export default function myImageLoader({ src, width, quality }) {
  const pathSrc = path.resolve(__dirname)
  return `http://${pathSrc}/${src}?w=${width}&q=${quality || 75}`;
}