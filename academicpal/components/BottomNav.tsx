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
    <nav className="fixed bottom-0 inset-x-0 bg-black/80 backdrop-blur-md border-t border-neutral-800 flex justify-around px-2 py-1 sm:px-4 sm:py-2 z-50 shadow-lg md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center text-[10px] sm:text-xs font-medium transition-colors duration-200",
              isActive ? "text-white" : "text-neutral-400 hover:text-white"
            )}
          >
            <Icon
              size={20}
              className={cn(
                "mb-0.5 transition-transform duration-300 ease-in-out",
                isActive ? "text-white" : "text-neutral-400"
              )}
            />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
