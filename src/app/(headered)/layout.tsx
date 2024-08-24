'use client'

import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();

  return (
    <>
      <div className="h-16 md:h-24 font-display text-xl md:text-4xl bg-slate-900 w-screen flex items-center px-4 md:px-8">
        <a href="/" className=" font-black">
          ryansalik.com
        </a>

        <div className="ml-2">{path}</div>
      </div>
      <div className="pd-12">{children}</div>
    </>
  );
}
