// Date: 03/08/2021

import ThemeSwitch from "@/components/themeSwitch";
import { Cover } from "@/components/ui/cover";
import Button3D from "@/components/ui/homebutton";

// Note: Home Page Component
export default function Home() {
  return (
    <div className="overflow-hidden w-screen h-screen dark:text-white">
      <div>
        <h1 className="p-2 bg-clip-text text-3xl font-bold text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Aword
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Chat With Your Peers <br /> at{" "}
          <Cover>
            <span className="dark:text-amber-300 text-red-500">Warp Speed</span>
          </Cover>
        </h1>
        <Button3D text="Start Now" className="mt-4" /> {/* Added margin-bottom to create space */}
      </div>
    </div>
  );
}
