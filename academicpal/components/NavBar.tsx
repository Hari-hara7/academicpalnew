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
    <nav className="bg-black text-white fixed top-0 left-0 w-full z-50 shadow-md font-sans">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/academicpal.jpg" alt="Academicpal Logo" width={42} height={42} className="rounded-md" />
          <span className="text-xl font-semibold tracking-tight leading-tight font-[Poppins]">
            Academicpal
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center hover:text-gray-400 transition-colors duration-200"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* User Info / Auth */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : user ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.photoURL || ''} />
                <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{user.email}</span>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="ghost" className="text-black bg-white hover:bg-gray-100">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-gray-800">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="bg-black text-white w-64 p-6">
            <SheetTitle className="text-xl font-bold mb-6">Menu</SheetTitle>
            <div className="space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center text-sm hover:text-gray-400 transition"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}

              <div className="mt-6 border-t border-gray-700 pt-4">
                {loading ? (
                  <Skeleton className="h-10 w-10 rounded-full" />
                ) : user ? (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photoURL || ''} />
                      <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.displayName}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                ) : (
                  <Link href="/login">
                    <Button className="w-full text-black bg-white mt-2">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavBar;
