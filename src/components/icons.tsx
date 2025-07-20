import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="hsl(var(--primary))" />
      <path d="M12 11.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" fill="hsl(var(--primary-foreground))" stroke="hsl(var(--primary-foreground))" />
      <path d="M12 11.5v4" stroke="hsl(var(--primary-foreground))" />
      <path d="M12 11.5L14.5 9" stroke="hsl(var(--primary-foreground))" />
      <path d="M12 11.5L9.5 9" stroke="hsl(var(--primary-foreground))" />
    </svg>
  ),
};
