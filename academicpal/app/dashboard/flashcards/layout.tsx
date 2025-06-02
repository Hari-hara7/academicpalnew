import React from 'react';
import Link from 'next/link';
import { Toaster } from 'sonner';

export default function FlashcardsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen p-4 font-sans bg-black text-white">
      
      <Toaster position="top-center" richColors />
      <main className="flex-1 w-full max-w-4xl mx-auto">{children}</main>
    </div>
  );
}
