import React from "react";
import Link from "next/link";
import Logo from "./Logo";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header
      className="flex items-center justify-between p-4 bg-gray-900 text-white shadow-lg border-b-4 border-white"
      role="banner"
    >
      {/* Logo with aria-label for better accessibility */}
      <Link href="/" className="flex-shrink-0" aria-label="Go to homepage">
        <Logo size={50} />
      </Link>

      {/* Title */}
      <h1 className="text-3xl font-bold flex-grow text-center">{title}</h1>

      {/* Empty div removed, flex properties adjusted for alignment */}
      <div className="w-12"></div>
    </header>
  );
};

export default Header;
