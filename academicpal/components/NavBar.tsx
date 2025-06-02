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
  X,
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
    { href: '/home', label: 'Home', icon: <Home className="w-4 h-4 mr-2" /> },
    { href: '/login', label: 'Tools', icon: <BookOpen className="w-4 h-4 mr-2" /> },
    { href: '/upload', label: 'Resources', icon: <FileText className="w-4 h-4 mr-2" /> },
    { href: '/register', label: 'Blog', icon: <FileText className="w-4 h-4 mr-2" /> },
    { href: '/about', label: 'About', icon: <Info className="w-4 h-4 mr-2" /> },
    { href: '/contact', label: 'Contact', icon: <Mail className="w-4 h-4 mr-2" /> },
    { href: '/dashboardd', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="bg-black text-white fixed top-0 left-0 w-full z-50 shadow-md font-sans">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-3">
          <Image src="/academicpal.jpg" alt="Academicpal Logo" width={70} height={70} className="rounded-md" />
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

        {/* User Info / Auth Desktop */}
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

          <SheetContent side="left" className="bg-black text-white w-64 p-6 flex flex-col">
            {/* Header with Avatar and Close Button */}
            <div className="flex items-center justify-between mb-6">
              {loading ? (
                <Skeleton className="h-12 w-12 rounded-full" />
              ) : user ? (
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.photoURL || ''} />
                    <AvatarFallback>{user.displayName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-semibold">{user.displayName || 'User'}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[120px]">{user.email}</p>
                  </div>
                </div>
              ) : (
                <Link href="/login">
                  <Button className="text-black bg-white">Login</Button>
                </Link>
              )}

              {/* Close Button */}
             
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-5">
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
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavBar;
