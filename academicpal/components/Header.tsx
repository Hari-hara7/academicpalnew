"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-black text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
  
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/academicpal.jpg"
              alt="Academic Pal Logo"
              height={40}
              width={90}
              priority
              className="rounded-md"
            />
          </Link>
          <h1
            className="text-xl sm:text-2xl font-serif font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Academic Pal
          </h1>
        </div>

       

        {/* Mobile Menu */}
       
      </div>

      <Separator className="bg-gray-800" />
    </header>
  );
};

export default Header;
