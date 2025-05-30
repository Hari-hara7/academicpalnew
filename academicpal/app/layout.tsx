"use client";

import { usePathname } from "next/navigation";
import Header from "../components/Header";
import HomeHeader from "../components/NavBar";
import HomeFooter from "../components/Footerhome";
import BottomNav from "../components/BottomNav";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Show Header only on "/" and "/signup"
  const showHeader = pathname === "/" || pathname === "/signup";

  // Show HomeHeader on "/home", "/chat", and "/upload"
  const showHomeHeader = ["/home", "/chat", "/upload"].includes(pathname);

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white flex flex-col">
        {showHeader && <Header />}
        {showHomeHeader && <HomeHeader showUid={true} />}

        <main className="flex-grow">{children}</main>

        {/* BottomNav only on /home */}
        {pathname === "/home" && <BottomNav />}

        {/* Show HomeFooter except on /home */}
        {pathname !== "/home" && <HomeFooter />}
      </body>
    </html>
  );
}
