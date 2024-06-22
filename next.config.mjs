/** @type {import('next').NextConfig} */

const nextConfig = {

  images: {
    dangerouslyAllowSVG: true,
    domains: ['localhost'], // Aggiungi il tuo dominio se necessario
  },
  async headers() {

    return [
      {

        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,PATCH,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-Requested-With,Authorization,Content-Type,Accept" },
        ],

      },
    ];
  },
};


export default nextConfig;