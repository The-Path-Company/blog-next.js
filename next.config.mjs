/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";
const devBaseUrl = "http://localhost:1337";
const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ??
  process.env.STRAPI_API_URL ??
  devBaseUrl;

let strapiPattern = {
  protocol: "http",
  hostname: "localhost",
  port: "1337",
  pathname: "/uploads/**",
};

let parsedUrl = null;
try {
  parsedUrl = new URL(strapiUrl);
} catch (error) {
  parsedUrl = null;
}

if (parsedUrl) {
  strapiPattern = {
    protocol: parsedUrl.protocol.replace(":", ""),
    hostname: parsedUrl.hostname,
    pathname: "/uploads/**",
  };
  if (parsedUrl.port) {
    strapiPattern.port = parsedUrl.port;
  }
}

const nextConfig = {
  images: {
    remotePatterns: [strapiPattern],
    dangerouslyAllowLocalIP: isDev,
  },
};

export default nextConfig;
