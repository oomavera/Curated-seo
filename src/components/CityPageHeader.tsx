"use client";

import Image from "next/image";
import logo from "../../public/Logo2.png";

export default function CityPageHeader() {
  return (
    <header className="flex flex-row justify-between items-center py-2 sm:py-4 px-4 sm:px-8 max-w-7xl mx-auto w-full backdrop-blur-sm gap-2 sm:gap-0">
      <div className="flex flex-1 items-center sm:hidden">
        <a
          href="tel:+14074701780"
          className="text-xs font-semibold tracking-wider text-mountain hover:text-midnight transition-colors duration-300 whitespace-nowrap truncate max-w-[90vw]"
          style={{ minWidth: 0 }}
        >
          (407) 470-1780
        </a>
      </div>
      <div className="hidden sm:flex items-center">
        <Image src={logo} alt="Curated Cleanings Logo" width={160} height={64} priority placeholder="blur" />
      </div>
      <div className="flex-1 flex justify-center sm:hidden">
        <Image
          src={logo}
          alt="Curated Cleanings Logo"
          width={240}
          height={96}
          className="h-24 w-auto max-w-[80vw]"
        />
      </div>
      <div className="flex flex-1 justify-end items-center sm:hidden">
        <a
          href="tel:+14074701780"
          className="bg-midnight text-snow px-4 py-2 rounded-full font-semibold hover:bg-mountain hover:text-snow transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-xs"
        >
          CALL NOW
        </a>
      </div>
      <div className="hidden sm:flex items-center gap-6">
        <a
          href="tel:+14074701780"
          className="text-xl font-semibold tracking-wider text-mountain hover:text-midnight transition-colors duration-300 whitespace-nowrap"
        >
          (407) 470-1780
        </a>
        <a
          href="tel:+14074701780"
          className="bg-midnight text-snow px-5 py-2 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-mountain hover:text-snow transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
        >
          CALL NOW
        </a>
      </div>
    </header>
  );
} 