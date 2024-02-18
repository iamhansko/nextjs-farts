import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextAuth",
  description: "Next.js + NextAuth.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ul className="navbar">
            <li><Link href="/api/auth/signin">Sign In</Link></li>
            <li><Link href="/api/auth/signout?callbackUrl=/">Sign Out</Link></li>
            <li><Link href="/">Landnig Page</Link></li>
            <li><Link href="/client">User Page - Client Component</Link></li>
            <li><Link href="/server">User Page - Server Component</Link></li>
            <li><Link href="/partner">Partner Page</Link></li>
            <li><Link href="/admin">Admin Page</Link></li>
          </ul>
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
