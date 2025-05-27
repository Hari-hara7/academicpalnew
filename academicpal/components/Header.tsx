"use client"; // Add this since it uses client-side behavior (like image imports)

import Image from "next/image";
// Make sure this is in `public` or use static import

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-black">
      <div className="flex items-center">
        <Image
          src="/academicpal.jpg"
          alt="Academic Pal Logo"
          height={40}       // specify height and width explicitly
          width={120}       
          priority           // optional: for eager loading of important images
        />
        <h1
          className="text-white text-3xl ml-4 font-serif font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Academic Pal
        </h1>
      </div>
    </header>
  );
};

export default Header;
