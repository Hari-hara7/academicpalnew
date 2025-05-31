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

const showHomeHeader =
  [
    "/home",
    "/chat",
    "/upload",
    "/dashboard",
    "/login",
    "/register",
    "/dashboard/timetable",
    "/dashboard/timetable/create",
    "/dashboard/flashcards",
    "/dashboard/flashcards/create"
  ].includes(pathname) ||///dashboard/flashcards/edit/
  pathname.startsWith("/dashboard/timetable/edit/") ||
  pathname.startsWith("/dashboard/timetable/delete/") ||  pathname.startsWith("/dashboard/flashcards/edit/");



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
