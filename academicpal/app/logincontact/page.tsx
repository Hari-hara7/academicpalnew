import { FC } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Linkedin, Instagram, Globe, MessageSquare } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const ContactPage: FC = () => {
  const contacts = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      href: "mailto:hariharanath247@gmail.com",
      display: "hariharanath247@gmail.com",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      href: "tel:+91 7989777877",
      display: "+91 798977 7877",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/hari-hara-nath-a13583282/",
      display: "linkedin.com/in/hari-hara-nath-a13583282",
      external: true,
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      title: "Instagram",
      href: "https://instagram.com/hari_hara_nath77",
      display: "@hari_hara_nath77",
      external: true,
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Portfolio",
      href: "https://hariharanath.is-cod.in/",
      display: "hariharanath.is-cod.in",
      external: true,
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Discord",
      href: "https://discord.gg/EVbcRNpP",
      display: "Join my Discord",
      external: true,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-12 select-none">Contact Me</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full">
        {contacts.map(({ icon, title, href, display, external }, idx) => (
          <Card
            key={idx}
            className="border border-white/20 bg-black hover:bg-white/10 transition-colors cursor-pointer"
          >
            <CardHeader className="flex items-center gap-4 border-b border-white/10 pb-3">
              <div className="p-2 border border-white/30 rounded-full text-white flex items-center justify-center">
                {icon}
              </div>
              <CardTitle className="text-lg text-white">{title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className={`${buttonVariants({
                  variant: "outline",
                })} w-full text-black border-white/20 hover:bg-white/10 truncate text-left`}
                aria-label={`Contact via ${title}`}
              >
                {display}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default ContactPage;
