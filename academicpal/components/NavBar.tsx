'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Menu,
  Home,
  BookOpen,
  FileText,
  Info,
  Mail,
  LayoutDashboard,
} from 'lucide-react';

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const navLinks = [
    { href: '/', label: 'Home', icon: <Home className="w-4 h-4 mr-2" /> },
    { href: '/roadmaps', label: 'Roadmaps', icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { href: '/resources', label: 'Resources', icon: <FileText className="w-4 h-4 mr-2" /> },
    { href: '/blog', label: 'Blog', icon: <FileText className="w-4 h-4 mr-2" /> },
    { href: '/about', label: 'About', icon: <Info className="w-4 h-4 mr-2" /> },
    { href: '/contact', label: 'Contact', icon: <Mail className="w-4 h-4 mr-2" /> },
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black border-b border-white/10 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/academicpal.jpg" alt="Academicpal Logo" width={42} height={42} className="rounded-md" />
          <span className="text-xl font-bold text-white tracking-tight font-[Poppins]">
            Academicpal
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center px-2 py-1 text-white/90 hover:text-white transition duration-200 border-b-2 border-transparent hover:border-white"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-white">
                <AvatarImage src={user.photoURL || ''} />
                <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
              </Avatar>
              <div className="text-sm text-white">
                <p className="font-semibold">{user.displayName}</p>
                <p className="text-xs text-white/70">{user.email}</p>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <Button className="bg-white text-black hover:bg-gray-200 transition">Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="bg-gradient-to-br from-black to-zinc-900 text-white w-64 p-6 shadow-lg">
            <div className="flex flex-col items-center gap-4 mb-6">
              {loading ? (
                <Skeleton className="h-16 w-16 rounded-full" />
              ) : user ? (
                <>
                  <Avatar className="h-16 w-16 ring-2 ring-white shadow-md">
                    <AvatarImage src={user.photoURL || ''} />
                    <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="text-lg font-bold">{user.displayName}</p>
                    <p className="text-xs text-white/70">{user.email}</p>
                  </div>
                </>
              ) : (
                <Link href="/login">
                  <Button className="w-full text-black bg-white">Login</Button>
                </Link>
              )}
            </div>

            <SheetTitle className="text-xl font-bold mb-4 border-b border-white/20 pb-2">
              Menu
            </SheetTitle>

            <div className="space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center text-sm text-white/90 hover:text-white transition duration-200"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavBar;
