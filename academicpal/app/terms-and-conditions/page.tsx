"use client";

import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Privacy Policy</h1>
      </div>
      <p className="text-gray-400 mb-4">
        At Academic Pal, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.
      </p>

      <p className="text-gray-400 mb-4 font-semibold">
        Please note: Academic Pal is an independent platform and is not an official service or replica of NMAMIT College.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">Information We Collect</h2>
      <p className="text-gray-400">
        We may collect personal information such as your name, email address, and other relevant details when you interact with our website.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <p className="text-gray-400">
        Your information is used to provide and improve our services, respond to inquiries, and ensure a seamless experience on Academic Pal.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">Third-Party Services</h2>
      <p className="text-gray-400">
        We may use third-party services to help us operate the website, and they may have access to your personal information.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="text-gray-400">
        You have the right to access, update, or delete your personal information. Contact us at <span className="underline">hariharanath247@gmail.com</span> for assistance.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">Changes to This Policy</h2>
      <p className="text-gray-400">
        We may update this policy from time to time. Changes will be posted on this page.
      </p>

      <p className="text-gray-400 mt-6">
        If you have any questions about this Privacy Policy, please contact us at{" "}
        <span className="underline">Hariharanath247@gmail.com</span>.
      </p>

      <Link href="/" className="block mt-8 text-gray-400 hover:text-white">
        &larr; Back to Home
      </Link>
    </div>
  );
}
