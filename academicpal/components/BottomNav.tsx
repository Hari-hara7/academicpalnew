"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, BookOpen, User, Settings, MessageCircle } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/home", icon: Home, label: "Home" },
    { href: "/notes", icon: BookOpen, label: "Notes" },
    { href: "/messages", icon: MessageCircle, label: "Messages" },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-black border-t border-neutral-800 flex justify-between px-4 py-2 z-50 shadow-lg md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center text-xs font-bold transition-colors",
              isActive ? "text-white" : "text-white-400 hover:text-white"
            )}
          >
            <Icon
              size={24}
              className="mb-0.5 transition-transform duration-300 ease-in-out text-white"
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
