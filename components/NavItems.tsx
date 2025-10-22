"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My Journey", href: "my-journey" },
];

const NavItems = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2">
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          className={cn(
            "px-4 py-2 rounded-lg transition-all duration-200 font-medium",
            pathname === href ? "bg-accent text-accent-foreground shadow-sm" : "text-foreground hover:bg-secondary/60"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
