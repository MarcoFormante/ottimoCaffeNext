import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/admin",  
        has: [{ type: "host", value: "admin.novacreatives.com" }],  
        destination: "/admin", 
      },
      
      {
        source: "/admin",
        destination: "/404",  
      },
    ];
  },

};

export default nextConfig;
