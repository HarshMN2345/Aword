// Date: 03/08/2021
"use client";

import { CardCarousal } from "@/components/CardCarousal";
import { Cover } from "@/components/ui/cover";
import Button3D from "@/components/ui/homebutton";
import { CustomSession } from "./api/auth/[...nextauth]/options";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { redirect } from "next/navigation";
import { toast } from "sonner";

interface HomeProps {
  session: CustomSession | null;
}
// Note: Home Page Component
export default function NextHome({ session }: HomeProps) {
  return (
    <div
      className="overflow-hidden back flex flex-col w-screen min-h-screen dark:text-white overflow-y-auto"
      // style={{
      //   backgroundImage: 'url("https://imgs.search.brave.com/HcyuGlMo2oOjNlNSroTtDGy975gVzpq3a3JwAwXOZWQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDgwMTc5/NzMuanBn")',
      //   backgroundSize: '',
      //   backgroundPosition: 'center',
      // }}
    >
      <div>
        {/* <h1 className="top-0 left-0 m-4 p-1 bg-clip-text text-3xl font-bold text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Aword
        </h1> */}
        {session?.user?.name && ( 
          <TextGenerateEffect className="p-2 " words={`🔑Logged one is ${session.user.name}`} />
        )}
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">⚡</h1>
        <h1 className="text-4xl md:text-4xl lg:text-7xl font-semibold max-w-7xl mx-auto text-center mt-3 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Chat With Your Peers <br /> at{" "}
          <Cover>
            <span className="dark:text-amber-300 text-red-500">Warp Speed</span>
          </Cover>
        </h1>
        {session ? (
  <Button3D
    text="Start Now"
    onClick={() => redirect('/dashboard')}
    className="mt-4"
  />
) : (
  <Button3D
    text="Start Now"
    onClick={() => toast.error("Please Login to Continue")}
    className="mt-4"
  />
)}
      </div>
      <div className="mt-20 mb-10 px-4">
        <CardCarousal/>
      </div>
      <div className="text-center py-4 text-neutral-500 dark:text-neutral-400 mt-auto">
        <span>⚡</span>Made By Harsh Mahajan
      </div>
    </div>
  );
}
