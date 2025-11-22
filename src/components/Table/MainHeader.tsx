"use client";

import {
  RefreshCw,
  ChevronDown,
  Bookmark,
  Grid2x2,
  Volume2,
  Settings,
} from "lucide-react";
import {RiWalletLine} from 'react-icons/ri'
import { SolLogo } from "../../../public/svg/solana";
import { BnbLogo } from "../../../public/svg/BnbLogo";

export default function MainHeader() {
  return (
    <header className="w-full flex-1 flex items-center justify-between px-4 py-3 bg-[#0b0c10] text-white">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3 ml-2">
        <span className="text-xl font-normal">Pulse</span>
        <SolLogo className="w-6 h-6 m-1 bg-[rgb(34 36 45)]/60 rounded-full " />
        <BnbLogo className="w-6 h-6 opacity-80" />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 text-white/70">
        {/* Refresh */}
        <RefreshCw className="w-5 h-5 cursor-pointer hover:text-white" />

        {/* Display Dropdown */}
        <div className="flex items-center gap-1 px-3 py-1 cursor-pointer bg-white/5 rounded-xl hover:bg-white/10">
          <span className="text-sm">Display</span>
          <ChevronDown size={16} />
        </div>

        {/* Icons */}
        <Bookmark className="hidden w-5 h-5 cursor-pointer hover:text-white sm:block" />
        <Grid2x2 className="hidden w-5 h-5 cursor-pointer hover:text-white sm:block" />
        <Volume2 className="hidden w-5 h-5 cursor-pointer hover:text-white sm:block" />
        <Settings className="hidden w-5 h-5 cursor-pointer hover:text-white sm:block" />

        {/* Right pill */}
        <div className="flex items-center gap-2 px-2 py-0.5 border rounded-full border-border/10">
          <div className="flex items-center justify-center gap-0.5">
            <RiWalletLine size={20}/>
            <span className="text-xs text-1">1</span>
          </div>
          <div className="flex items-center justify-center gap-0.5">
            <SolLogo width={24} />
            <span className="text-xs text-1">0</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
