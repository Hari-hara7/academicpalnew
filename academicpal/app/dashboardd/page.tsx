"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LogOut, Mail, UserCircle, Info } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/signup");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/signup");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white text-lg font-semibold">
        Loading your dashboard...
      </div>
    );

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-2">
        <UserCircle className="w-8 h-8 text-white" /> Welcome, {user.displayName?.split(" ")[0]}!
      </h1>

      <Card className="w-full max-w-md bg-gray-900 text-white shadow-xl rounded-2xl border border-gray-700">
        <CardHeader className="flex flex-col items-center gap-4">
          <Image
            src={user.photoURL || "/default-profile.png"}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full border-2 border-gray-600"
          />
          <div className="text-center">
            <h2 className="text-lg md:text-xl font-semibold flex items-center justify-center gap-2">
              <UserCircle className="w-4 h-4 text-white" /> {user.displayName}
            </h2>
            <p className="flex items-center gap-2 text-xs text-gray-400">
              <Mail className="w-4 h-4 text-white" /> {user.email}
            </p>
          </div>
        </CardHeader>

        <Separator className="bg-gray-700" />

        <CardContent className="mt-4 space-y-2 text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Info className="w-4 h-4 text-white" /> This dashboard is your personalized space in Academic Pal.
          </p>
          <p className="text-xs text-gray-400">
            Explore notes, access features, and manage your profile — all in one place.
          </p>
        </CardContent>

        <Separator className="bg-gray-700 my-4" />

        <CardFooter className="flex justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
          >
            <LogOut className="w-4 h-4 text-white" /> Logout
          </button>
        </CardFooter>
      </Card>

      <p className="mt-6 text-xs text-gray-500 text-center max-w-xs">
        Academic Pal - Your trusted partner in academic excellence. <br />
        <span className="italic">Not affiliated with NMAMIT College.</span>
      </p>
    </main>
  );
};

export default Dashboard;
