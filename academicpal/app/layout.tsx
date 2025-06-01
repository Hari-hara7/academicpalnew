"use client";

import { usePathname } from "next/navigation";
import Header from "../components/Header";
import HomeHeader from "../components/NavBar";
import HomeFooter from "../components/Footerhome";
import BottomNav from "../components/BottomNav";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showHeader = pathname === "/" || pathname === "/signup";

const showHomeHeader =
  [
    "/home",
    "/chat",
    "/upload",
    "/dashboard",
    "/login",
    "/register",
    "/dashboard/study-planner",
    "/dashboard/timetable",
    "/dashboard/timetable/create",
    "/dashboard/study-groups",
    "/dashboard/flashcards",
    "/dashboard/flashcards/create",
    "/dashboard/study-reminders",
    "/dashboard/study-groups/create",
    "/dashboard/performance-analytics",
    "/dashboard/study-reminders/create",
    "/dashboard/blogs",
    "/dashboard/blogs/create",
    "/dashboard/performance-analytics/create"
  ].includes(pathname) ||///dashboard/study-groups/
  pathname.startsWith("/dashboard/timetable/edit/") ||
  pathname.startsWith("/dashboard/timetable/delete/") ||  pathname.startsWith("/dashboard/flashcards/edit/") || 
   pathname.startsWith("/dashboard/study-planner/edit/") ||  pathname.startsWith("/dashboard/study-planner/delete/") || 
    pathname.startsWith("/dashboard/study-reminders/edit/")  || 
    pathname.startsWith("/dashboard/blogs/") || 
    pathname.startsWith("/dashboard/study-groups/");
;



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
