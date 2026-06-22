/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Export 100 % statique → hébergement Netlify sans runtime, URLs propres
  // (/mentions-legales, /confidentialite) sans extension « .html ».
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
};
export default nextConfig;
