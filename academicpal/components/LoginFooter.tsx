import { FC } from "react";
import Image from "next/image";
import { Github, Linkedin, Mail, FileText, ShieldCheck, Phone } from "lucide-react";

const LoginFooter: FC = () => {
  return (
    <footer className="bg-black text-white border-t border-white/20 ">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-6">
        {/* Logo + Text */}
        <div className="flex items-center justify-center md:justify-start space-x-3 select-none">
          <Image
            src="/academicpal.jpg"  // Replace with your actual logo file name and extension
            alt="Academic Pal Logo"
            width={60}
            height={60}
            priority
            className="object-contain"
          />
          <span className="text-2xl  tracking-wide font-bold font-poppins">Academic Pal</span>
        </div>

        {/* Navigation Links with icons */}
        <nav className="flex flex-wrap justify-center md:justify-start gap-6 text-sm md:text-base">
          <a
            href="/privacy-policy"
            className="flex items-center gap-1 text-white/80 hover:text-white transition-colors duration-200 font-medium"
          >
            <ShieldCheck className="w-4 h-4" />
            Privacy Policy
          </a>
          <a
            href="/terms-and-conditions"
            className="flex items-center gap-1 text-white/80 hover:text-white transition-colors duration-200 font-medium"
          >
            <FileText className="w-4 h-4" />
            Terms & Conditions
          </a>
          
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end gap-6">
          {[
            {
              href: "mailto:hariharanath247@gmail.com",
              label: "Email",
              icon: <Mail className="w-6 h-6 text-white" />,
            },
            {
              href: "https://github.com/Academic-pal",
              label: "GitHub",
              icon: <Github className="w-6 h-6 text-white" />,
            },
            {
              href: "https://www.linkedin.com/company/102724699/admin/dashboard/",
              label: "LinkedIn",
              icon: <Linkedin className="w-6 h-6 text-white" />,
            },
          ].map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="p-3 border border-white/20 rounded-full hover:bg-white/10 transition-transform duration-300 ease-in-out hover:scale-110"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Separator Line */}
      <div className="border-t border-white/20 mt-8"></div>

      {/* Copyright */}
      <div className="text-center text-xs sm:text-sm text-white/50 py-4 select-none">
        © {new Date().getFullYear()} Academic Pal. All rights reserved.
      </div>
    </footer>
  );
};

export default LoginFooter;
