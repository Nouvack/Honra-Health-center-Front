// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['indigo-secret-viper-132.mypinata.cloud']
//     },
//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers: [
//           {
//             key: "X-Frame-Options",
//             value: "DENY",
//           },
//           {
//             key: "X-Content-Type-Options",
//             value: "nosniff",
//           },
//           {
//             key: "Referrer-Policy",
//             value: "no-referrer",
//           },
//           {
//             key: "Strict-Transport-Security",
//             value: "max-age=63072000; includeSubDomains; preload",
//           },
//           {
//             key: "Permissions-Policy",
//             value: "camera=(), microphone=(), geolocation=()",
//           },
//           {
//             key: "Cross-Origin-Resource-Policy",
//             value: "same-site",
//           },
//         ],
//       },
//     ];
//   },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['indigo-secret-viper-132.mypinata.cloud'],
  },
  async headers() {
    return [
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://honra-health-center-front-xejz.vercel.app",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;


/** @type {import('next').NextConfig}
const nextConfig = {
    images: {
        domains: ['indigo-secret-viper-132.mypinata.cloud']
    }
};

export default nextConfig; */