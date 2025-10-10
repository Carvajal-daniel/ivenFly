import GradientBg from '@/lib/gradient';
import Image from 'next/image';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-black dark:via-gray-950 dark:to-black">
      
      {/* Gradient background effects */}
      <GradientBg className="hidden md:block absolute w-full h-screen bg-gradient-to-br from-blue-700 to-purple-600 dark:from-blue-900 dark:to-purple-900 dark:opacity-30 rounded-full blur-[5rem]" />
      
      {/* Additional glow effects for dark mode */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-[100px] pointer-events-none" />

      {/* Main content */}
      <div className="w-full max-w-md md:max-w-lg relative z-10">
        <div className="bg-white/80 dark:bg-gray-900/90 shadow-elegant rounded-2xl p-8 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 transition-all duration-300">
          
          <div className="text-center mb-8">
            {/* Logo container with glow effect */}
            <div className="mx-auto mb-4 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-primary/20 dark:bg-primary/30 blur-2xl rounded-full" />
              <Image 
                src="/assets/logo2.png" 
                className="h-18 w-20 md:h-28 md:w-30 -mb-5 relative z-10 drop-shadow-lg" 
                alt="Logo" 
                width={100} 
                height={100} 
              />
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
              {title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          </div>
          
          {children}
        </div>

        {/* Decorative bottom accent */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © 2024 Uplys. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};