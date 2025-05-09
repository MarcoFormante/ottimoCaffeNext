import type { NextConfig } from "next";


const nextConfig: NextConfig = {
    images:{
        remotePatterns: [
            {
                protocol:"http",
                hostname:"127.0.0.1",
                pathname:`/storage/v1/object/public/products.images//**`
            }
        ],
    }
};

export default nextConfig;
