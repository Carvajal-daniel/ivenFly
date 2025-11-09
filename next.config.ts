// next.config.js

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Se você tiver outras configurações, coloque-as aqui (ex: reactStrictMode: true)
  
  // *** CONFIGURAÇÃO DO PROXY PARA CORRIGIR CORS ***
  async rewrites() {
    return [
      {
        // 1. O caminho que seu código no FRONT-END chamará.
        // Vamos usar /api/proxy/
        source: '/api/proxy/:path*', 
        
        destination: 'https://api.uplys.com.br/api/:path*', 
      },
    ];
  },
};

export default nextConfig;