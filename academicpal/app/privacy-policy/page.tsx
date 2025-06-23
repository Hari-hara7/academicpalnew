"use client";

import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 max-w-3xl mx-auto font-light leading-relaxed">
      <div className="flex items-center gap-2 mb-8">
        <ShieldCheck className="w-6 h-6 text-yellow-500" />
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
      </div>

      <p className="text-gray-400 mb-6">
        This Privacy Policy describes how Academic Pal ("we", "our", or "us") collects, uses, and discloses your information when you access or use our services. By using Academic Pal, you agree to the terms of this Privacy Policy.
      </p>

      <h2 className="text-xl font-medium text-white mt-8 mb-2">1. Information We Collect</h2>
      <p className="text-gray-400">
        We may collect personal information that you voluntarily provide, such as your name, email address, and other identifying details required for login, communication, or support purposes.
      </p>

      <h2 className="text-xl font-medium text-white mt-8 mb-2">2. How We Use Your Information</h2>
      <p className="text-gray-400">
        The information we collect is used to operate and maintain our services, personalize your experience, communicate with you, and improve our offerings.
      </p>

      <h2 className="text-xl font-medium text-white mt-8 mb-2">3. Use of Third-Party Services</h2>
      <p className="text-gray-400">
        We may engage third-party services that help us operate our website. These parties are granted access only to the extent necessary and are obligated to maintain your data confidentiality.
      </p>

      <h2 className="text-xl font-medium text-white mt-8 mb-2">4. Your Rights</h2>
      <p className="text-gray-400">
        You have the right to access, correct, or delete your personal data. To exercise your rights, please contact us at <span className="underline">Hariharanath247@gmail.com</span>.
      </p>

      <h2 className="text-xl font-medium text-white mt-8 mb-2">5. Data Security</h2>
      <p className="text-gray-400">
        We implement industry-standard security measures to protect your information. However, no method of transmission or storage is 100% secure.
      </p>

      <h2 className="text-xl font-medium text-white mt-8 mb-2">6. Changes to This Policy</h2>
      <p className="text-gray-400">
        This Privacy Policy may be updated periodically. Any significant changes will be posted on this page with an updated revision date.
      </p>

      <h2 className="text-xl font-medium text-white mt-8 mb-2">7. Contact</h2>
      <p className="text-gray-400">
        If you have any questions or concerns regarding this policy, please reach out to us at{" "}
        <span className="underline">Hariharanath247@gmail.com</span>.
      </p>

      <Link href="/" className="block mt-10 text-yellow-500 hover:underline">
        &larr; Back to Home
      </Link>
    </div>
  );
}
