import React from 'react';
import Link from 'next/link';
import { Toaster } from 'sonner';

export default function FlashcardsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className="mb-4 mt-12">
        <Link href="/dashboard/flashcards">All Flashcards</Link> |{' '}
        <Link href="/dashboard/flashcards/create">Create New</Link>
       
      </nav>
      <Toaster position="top-center" richColors />
      <main>{children}</main>
    </div>
  );
}
