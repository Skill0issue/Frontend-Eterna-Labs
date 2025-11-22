"use client";

import { Separator } from "@/components/ui/separator";

import {
  Compass,
  Activity,
  LineChart,
  AppWindow,
  Bell,
  Palette,
  Fuel,
  ListRestart,
  ChevronDown,
} from "lucide-react";
import { CgNotes } from "react-icons/cg";
import { RiWalletLine, RiCoinLine } from "react-icons/ri";
import { DiscordLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"; // example icons
import { GoGear } from "react-icons/go";

import { SolLogo } from "../../../public/svg/solana";
import { BtcLogo } from "../../../public/svg/bitcoin";
import { EthLogo } from "../../../public/svg/ethereum";

export default function Footer() {
  return (
    <footer className="w-full h-[35px] flex px-3 items-center justify-center bg-primary border-t border-border/10">
      <div className="flex flex-row items-center justify-between w-full ">
        {/* LEFT CLUSTER */}
        <div className="flex flex-row items-center gap-3">
          {/* PRESET */}
          <button className="flex px-2 py-1 gap-0.5 ml-4 text-xs rounded-md text-1 bg-primaryBlue/40 text-primaryBlue">
            <ListRestart size={16} />
            PRESET 1
          </button>

          {/* Wallet + Solana */}
          <div className="flex items-center gap-2 px-2 py-0.5 border rounded-full border-border/10">
            <div className="flex items-center justify-center gap-0.5">
              <RiWalletLine size={14} className="opacity-80" />
              <span className="text-xs text-1">1</span>
            </div>
            <div className="flex items-center justify-center gap-0.5">
              <SolLogo width={14} className="opacity-80" />
              <span className="text-xs text-1">0</span>
            </div>
            <ChevronDown size={12} />
          </div>

          <Separator orientation="vertical" className="h-4 bg-border/10" />

          {/* Gear, Wallet, Twitter, Discover, Pulse, PnL */}
          <div className="flex items-center gap-4 text-1 [&>*]:flex [&>*]:items-center [&>*]:justify-center font-light text-[12px] [&>*]:gap-1 opacity-80">
            <GoGear size={12} className="opacity-80" />

            <div className="relative">
              <RiWalletLine size={14} className="opacity-80" />
              Wallet
              <span className="absolute w-1 h-1 bg-red-500 rounded-full -top-0.5 -right-2" />
            </div>

            <div className="relative">
              <TwitterLogoIcon className="w-4 h-4 opacity-80" />
              Twitter
              <span className="absolute w-1 h-1 bg-red-500 rounded-full -top-0.5 -right-2" />
            </div>

            <div className="relative">
              <Compass size={16} className="opacity-80" />
              Discover
              <span className="absolute w-1 h-1 bg-red-500 rounded-full -top-0.5 -right-2" />
            </div>

            <div className="relative">
              <Activity size={16} className="opacity-80" />
              Pulse
              <span className="absolute w-1 h-1 bg-red-500 rounded-full -top-0.5 -right-2" />
            </div>

            <div className="relative">
              <LineChart size={16} className="opacity-80" />
              PnL
              <span className="absolute w-1 h-1 bg-red-500 rounded-full -top-0.5 -right-2" />
            </div>
          </div>

          <Separator orientation="vertical" className="h-4 ml-1 bg-border/10" />

          <div className="flex gap-2 *:max-lg:hidden">
            {/* Market Lighthouse */}
            <div
              className="flex items-center gap-1 p-[1px] rounded-full cursor-pointer text-1 bg-opacity-50"
              style={{
                background:
                  "linear-gradient(to right, rgb(83, 211, 142) 0%, rgb(231, 140, 25) 50%, rgb(255, 70, 98) 100%)",
                width: "40px",
              }}
            >
              <div className="flex items-center justify-center w-full h-full bg-primary rounded-full px-0.5 gap-0.5 ">
                <EthLogo color="green"/>
                <SolLogo />
                <BtcLogo color="orange"/>
              </div>
            </div>

            <Separator orientation="vertical" className="h-4 bg-border/10" />
            <div className="flex items-center justify-center gap-0.5 text-orange">
              <BtcLogo width={16} color="orange" />
              <span className="text-[12px]">$84.0K</span>
            </div>
            <div className="flex items-center justify-center gap-0.5 text-blue">
              <EthLogo width={16} color="purle" />
              <span className="text-[12px]">$2720</span>
            </div>
            <div className="flex items-center justify-center gap-0.5 text-green">
              <SolLogo width={16} />
              <span className="text-[12px]">$125.56</span>
            </div>
          </div>
        </div>

        {/* RIGHT CLUSTER */}
        <div className="flex flex-row items-center gap-3">
          {/* Recommended Fee */}
          <span className="flex items-center justify-center gap-3 text-xs text-1 opacity-80">
            $ 57.5K
            <div className="flex items-center justify-center leading-tight">
              <Fuel size={12} />
              0.0{" "}
              <span className="text-[8px] items-end justify-self-end">2</span>2
            </div>
            <RiCoinLine />
            0.003
          </span>

          <Separator orientation="vertical" className="h-4 bg-border/10" />

          {/* Connection Status */}
          <div className="flex items-center justify-center gap-1 px-2 py-0.5 text-green-500 bg-green-900 rounded-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span className="text-xs">Connection is stable</span>
          </div>

          {/* Server Selector */}
          <select className="text-xs uppercase bg-transparent outline-none text-1">
            <option value="global">Global</option>
          </select>

          <Separator orientation="vertical" className="h-4 bg-border/10" />

          {/* 3 Icons */}
          <div className="flex items-center gap-3 text-1">
            <AppWindow size={16} className="opacity-80" />
            <Bell size={16} className="opacity-80" />
            <Palette size={16} className="opacity-80" />
          </div>

          <Separator orientation="vertical" className="h-4 bg-border/10" />

          {/* Discord - X - Docs */}
          <div className="flex items-center gap-3">
            <DiscordLogoIcon className="w-4 h-4 text-1 opacity-80" />
            <TwitterLogoIcon className="w-4 h-4 text-1 opacity-80" />
            <div className="flex items-center gap-1 text-1 opacity-80">
              <CgNotes className="w-4 h-4 text-1 opacity-80" />
              <span className="text-xs">Docs</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
