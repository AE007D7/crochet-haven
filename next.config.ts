import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
  },
  // Old category URLs from before the categories were regrouped. Permanent
  // redirects keep any existing links and indexed URLs working.
  async redirects() {
    return [
      {
        source: "/categories/clothing",
        destination: "/categories/wearables",
        permanent: true,
      },
      {
        source: "/categories/blankets",
        destination: "/categories/home-decor",
        permanent: true,
      },
      {
        source: "/categories/accessories",
        destination: "/patterns",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
