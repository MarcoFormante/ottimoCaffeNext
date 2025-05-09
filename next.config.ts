import type { NextConfig } from "next";


const nextConfig: NextConfig = {
    reactStrictMode:true,
    images:{
        remotePatterns: [
            {
                protocol:"http",
                hostname:"127.0.0.1",
                port:"20162",
                pathname:`/storage/v1/object/public/products.images/\/**`
            }
        ],
    }
};

export default nextConfig;
