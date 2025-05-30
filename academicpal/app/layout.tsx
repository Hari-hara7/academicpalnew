"use client";

import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeHeader from "../components/NavBar";
import HomeFooter from "../components/Footerhome";
import BottomNav from "../components/BottomNav"; // 👈 Import the BottomNav component
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/home";

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white flex flex-col">
        {isHome ? <HomeHeader /> : <Header />}

        <main className="flex-grow">{children}</main>

        {/* Show BottomNav only on /home */}
        {isHome && <BottomNav />}

        {!isHome ? <HomeFooter /> : null}
      </body>
    </html>
  );
}
