// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['indigo-secret-viper-132.mypinata.cloud']
//     }
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['indigo-secret-viper-132.mypinata.cloud'],
//   },
//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers: [
//           {
//             key: "Content-Security-Policy",
//             value:
//               "default-src 'self'; " +
//               "script-src 'self' 'unsafe-inline'; " +
//               "object-src 'none'; " +
//               "frame-ancestors 'none'; " +
//               "frame-src https://www.google.com; " +
//               "style-src 'self' 'unsafe-inline'; " +
//               "img-src 'self' data: https:; " +
//               "font-src 'self' https: data:;",
//           },
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

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['indigo-secret-viper-132.mypinata.cloud'],
  },
  async headers() {
    return [
      // 1) Restringir CORS en /_next/image para no exponerlo con "*"
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://honra-health-center-front-xejz.vercel.app",
          },
        ],
      },
      // 2) Cabeceras CSP y demás para todas las rutas
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              // A) default-src 'self'
              "default-src 'self'; " +
              // B) script-src: por ahora permitimos inline, pero a futuro migrar a nonces
              "script-src 'self' 'unsafe-inline'; " +
              // C) object-src (bloqueamos plugins)
              "object-src 'none'; " +
              // D) frame-ancestors (nadie puede embebernos)
              "frame-ancestors 'none'; " +
              // E) frame-src para iframes que carguemos (solo Google en este ejemplo)
              "frame-src https://www.google.com; " +
              // F) form-action para restringir dónde se envían formularios
              "form-action 'self'; " +
              // G) style-src: por ahora permitimos inline, plan a futuro usar nonces
              "style-src 'self' 'unsafe-inline'; " +
              // H) img-src: solo nuestro dominio + Pinata (sin wildcard https:)
              "img-src 'self' data: https://indigo-secret-viper-132.mypinata.cloud; " +
              // I) font-src: solo nuestro dominio + Google Fonts (si lo usas) o local data
              "font-src 'self' https://fonts.gstatic.com data:; " +
              // J) connect-src: permitimos fetch a nuestro backend en Koyeb
              "connect-src 'self' https://heavy-leshia-chhuilingchen-7beb916f.koyeb.app;",
          },
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
            value: "same-site",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

