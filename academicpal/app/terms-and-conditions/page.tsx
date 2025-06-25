'use client';

import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck className="w-6 h-6 text-yellow-400" />
        <h1 className="text-2xl font-bold">Terms & Conditions</h1>
      </div>

      <p className="text-gray-400 mb-4">
        Welcome to <span className="text-white font-semibold">Academic Pal</span>. By accessing or using this website, you agree to be bound by the following terms and conditions. If you do not agree with any part of these terms, you must not use this platform.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">1. Platform Usage</h2>
      <p className="text-gray-400">
        Academic Pal is designed to support students by providing notes, past papers, and academic resources. All content is for educational purposes only and should not be considered an official replacement for academic institutions or their materials.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">2. User Responsibilities</h2>
      <p className="text-gray-400">
        Users are expected to use the website respectfully and legally. Do not misuse or attempt to exploit the platform or its features in any harmful way.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">3. Content Ownership</h2>
      <p className="text-gray-400">
        All study materials and website content provided on Academic Pal are the intellectual property of their respective owners. Users must not reproduce, distribute, or modify the content without permission.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">4. Disclaimer</h2>
      <p className="text-gray-400">
        Academic Pal is not affiliated with or endorsed by NMAMIT or any other official institution. While we strive for accuracy, we do not guarantee the correctness or completeness of any material provided.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">5. Account and Access</h2>
      <p className="text-gray-400">
        Access to certain features may require login. You are responsible for maintaining the confidentiality of your account information and are liable for all activities under your account.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">6. Changes to Terms</h2>
      <p className="text-gray-400">
        We may update these terms at any time without prior notice. Continued use of the website after changes implies your acceptance of the new terms.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">7. Contact Information</h2>
      <p className="text-gray-400">
        For any questions or concerns about these terms, please contact us at{" "}
        <span className="underline">hariharanath247@gmail.com</span>.
      </p>

      <p className="text-gray-400 mt-6 font-semibold">
        Note: Academic Pal is an independent platform created for student support and is not an official service or replica of NMAMIT College.
      </p>

      <Link href="/" className="block mt-8 text-gray-400 hover:text-white">
        &larr; Back to Home
      </Link>
    </div>
  );
}
