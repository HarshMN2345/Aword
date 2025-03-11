import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import ThemeSwitch from "@/components/themeSwitch";
import SessionButton from "@/components/SessionButton";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "./api/auth/[...nextauth]/options";
import SessionProvider from "@/providers/SessionProvider";

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
            <div className="absolute top-0 flex flex-row items-center gap-2 right-0 m-4 p-1">
     <ThemeSwitch/>
     <SessionButton session={session} /> 
     {/* Pass session to client component */}
   </div>   <div className="scrollbar-hidden">{children}</div>

          </ThemeProvider>
      </body>
      </SessionProvider>
    </html>
  );
}
