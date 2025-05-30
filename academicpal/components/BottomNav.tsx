"use client";

import { Home, MessageCircle, Users2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Search", icon: Search, href: "/search" },
  { name: "Chats", icon: MessageCircle, href: "/chats" },
  { name: "Community", icon: Users2, href: "/community" },
];

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50 md:hidden">
      <nav className="flex justify-between items-center px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href} className="flex flex-col items-center text-gray-700 hover:text-blue-600">
              <Button variant="ghost" className="flex flex-col items-center space-y-1">
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.name}</span>
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
