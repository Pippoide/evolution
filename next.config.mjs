/** @type {import('next').NextConfig} */
  
  const nextConfig = {
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