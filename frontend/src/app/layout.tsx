import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import ThemeSwitch from "@/components/themeSwitch";
import SessionButton from "@/components/SessionButton";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
import SessionProvider from "@/providers/SessionProvider";
import UserAvatar from "@/components/UserAvatar";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aword",
  description: "To chat with the real ones",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session:CustomSession|null=await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <h1 className="top-0 left-0 m-4 p-1 bg-clip-text text-3xl font-bold text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          <Link href='/'>Aword</Link>
        </h1>
            <div className="absolute top-0 flex flex-row items-center gap-2 right-0 m-4 p-1">
              <Link href='/dashboard'>
            <UserAvatar image={session?.user?.image ?? "https://2.bp.blogspot.com/-QHegZPWCQR8/Vy30HOI5UJI/AAAAAAAAUPU/kI5RtjD8T50a64EYbd5nWy3nr2Fo8CBVgCLcB/s1600/Moon+animated+gifs+1.gif"} name={session?.user?.name ?? ""} />
            </Link>
     <ThemeSwitch/>
     <SessionButton session={session} /> 
     {/* Pass session to client component */}
   </div>   <div className="scrollbar-hidden">{children}
   <Toaster />
   </div>

          </ThemeProvider>
      </body>
      </SessionProvider>
    </html>
  );
}
