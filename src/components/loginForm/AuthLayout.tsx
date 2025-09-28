
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
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <GradientBg className=' hidden md:block absolute w-full h-screen bg-gradient-to-br from-blue-700 rounded-full blur-[5rem]' />
     

      {/* Main content */}
      <div className="w-full max-w-md md:max-w-lg relative">
        <div className="bg-card shadow-elegant rounded-2xl p-8 backdrop-blur-sm border border-border/50">
          <div className="text-center mb-8">
            <div className=" mx-auto mb-4 flex items-center justify-center ">
            <Image src="/assets/logo.png" className=" h-20 w-30"  alt="Logo" width={100} height={100} />
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-1">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};