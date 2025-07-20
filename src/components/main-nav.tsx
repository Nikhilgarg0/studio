"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pill, Stethoscope, User } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/medicines", label: "Medicines", icon: Pill },
  { href: "/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/profile", label: "Profile", icon: User },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border shadow-t-lg z-10">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-bold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
