"use client";

import React, { memo, useMemo } from "react";
import type { Token } from "@/types/token";
import {
  Clock,
  Search,
  Users,
  Copy,
  EyeOff,
  Slash,
  Flag,
  Feather,
  Link,
  Crosshair,
  Boxes,
  ChefHat,
  UserStar,
  Ghost,
} from "lucide-react";
import { SolLogo } from "../../../public/svg/solana";
import { FaBolt } from "react-icons/fa6";
import { Separator } from "@radix-ui/react-separator";

type Props = {
  token: Token;
  onBuy?: (t: Token) => void;
  className?: string;
};

const makeIcon = (
  Comp: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  name: string
) => {
  const I = memo(() => <Comp width={12} height={12} className="mr-1" />);
  I.displayName = name;
  return I;
};

const IconCrosshair = makeIcon(Crosshair, "IconCrosshair");
const IconChefHat = makeIcon(ChefHat, "IconChefHat");
const IconUserStar = makeIcon(UserStar, "IconUserStar");
const IconGhost = makeIcon(Ghost, "IconGhost");
const IconBoxes = makeIcon(Boxes, "IconBoxes");

function TokenRow({ token, onBuy, className = "" }: Props) {
  const {
    name,
    symbol,
    logo,
    lastOnline,
    Holders,
    change,
    liquidity,
    Volume,
    Snipers,
    DevHoldings,
    Top10Holders,
    Insiders,
    Bundlers,
    canBuy,
    copyUrl,
    Twitter,
    Buyers,
  } = token;

  // badges: convert raw counts -> percentage of holders (B)
  const pct = (v?: number) =>
    Holders && v !== undefined && Holders > 0
      ? `${Math.round((v / Holders) * 100)}%`
      : "0%";

  const badgeList = useMemo(
    () => [
      {
        key: "snipers",
        label: "Snipers",
        value: pct(Snipers),
        color: "text-green-400",
        icon: <IconCrosshair />,
      },
      {
        key: "dev",
        label: "Dev",
        value: pct(DevHoldings),
        color: "text-green-400",
        icon: <IconChefHat />,
      },
      {
        key: "top10",
        label: "Top10",
        value: pct(Top10Holders),
        color: "text-green-400",
        icon: <IconUserStar />,
      },
      {
        key: "ins",
        label: "Insiders",
        value: pct(Insiders),
        color: "text-white/60",
        icon: <IconGhost />,
      },
      {
        key: "bundlers",
        label: "Bundlers",
        value: pct(Bundlers),
        color: "text-red-400",
        icon: <IconBoxes />,
      },
    ],
    [Snipers, DevHoldings, Top10Holders, Insiders, Bundlers, Holders]
  );

  // format helpers
  const formatK = (n?: number) => {
    if (n === undefined || n === null) return "$0";
    const abs = Math.abs(n);
    if (abs >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (abs >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
    return `$${n}`;
  };

  const pos = Math.max(-20, Math.min(20, change));

  return (
    <div className="flex flex-col border-b mb-2 border-white/5 bg-[#111014] my-1 transition-colors hover:bg-[#0f1113]/30">
      <div
        className={`relative group w-full flex justify-between items-start gap-4 px-4 py-1  ${className}`}
      >
        {/* AVATAR + hover overlay icons */}
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            <div className="flex flex-col items-center justify-center ">
              <div className="relative  rounded-md  w-16 h-16 sm:w-14 sm:h-14 lg:w-20 lg:h-20 ring-1 ring-white/6 bg-[#0b0c0d]">
                <img
                  src={logo}
                  alt={name}
                  fetchPriority="high"
                  loading="eager"
                  className="object-cover w-full h-full "
                />
                {/* green ring indicator bottom-right */}
                <span className="absolute z-50 w-3 h-3 bg-green-500 rounded-full -bottom-1 -right-1 ring-2 ring-black" />
              </div>
            </div>
            {/* hover icons (appear only on row hover) */}
            <div className="absolute inset-0 flex flex-col gap-1 p-1 transition-opacity opacity-0 pointer-events-none group-hover:opacity-100">
              <div className="ml-0">
                <button
                  title="Hide"
                  className="p-1 rounded-md pointer-events-auto bg-black/60 hover:bg-black/80"
                  onClick={() => {
                    /* implement hide logic */
                  }}
                >
                  <EyeOff size={12} />
                </button>
              </div>
              <div>
                <button
                  title="Mute"
                  className="p-1 rounded-md pointer-events-auto bg-black/60 hover:bg-black/80"
                  onClick={() => {
                    /* implement mute logic */
                  }}
                >
                  <Slash size={12} />
                </button>
              </div>
              <div>
                <button
                  title="Report"
                  className="p-1 rounded-md pointer-events-auto bg-black/60 hover:bg-black/80"
                  onClick={() => {
                    /* implement report logic */
                  }}
                >
                  <Flag size={12} />
                </button>
              </div>
            </div>
            <div className="flex justify-start w-full mt-1">
              <div className="relative flex items-center">
                <button
                  className="group/tokenid relative px-2 py-0.5 rounded text-[10px] text-white/70 font-mono w-16 overflow-hidden text-ellipsis whitespace-nowrap transition-colors duration-200 hover:bg-transparent"
                  title={token.id}
                  onClick={() => {
                    if (token.id) navigator.clipboard.writeText(token.id);
                  }}
                  style={{
                    width: "64px",
                    minWidth: "64px",
                    maxWidth: "64px",
                    textAlign: "center",
                  }}
                >
                  <span className="block">{token.id}</span>
                </button>
                {/* Tooltip */}
                <div className="absolute z-10 mt-1 transition-opacity duration-200 -translate-x-1/2 opacity-0 pointer-events-none left-1/2 top-full group-hover/tokenid:opacity-100 group-hover/tokenid:pointer-events-auto">
                  <div className="px-2 py-1 font-mono text-xs text-white whitespace-pre bg-black rounded shadow-lg">
                    {token.id}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN content */}
          <div className="flex flex-col">
            <div className="flex-1 min-w-0">
              {/* top row: name / symbol & local actions (compact) */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-white truncate sm:text-sm lg:text-lg">
                      {name}{" "}
                      <span className="ml-1 text-[13px] text-white/60 font-normal">
                        {symbol}
                      </span>
                    </h3>

                    {/* copy contract */}
                    <button
                      title="Copy contract"
                      className="ml-2 opacity-70 hover:opacity-100"
                      onClick={() => {
                        if (copyUrl) navigator.clipboard.writeText(copyUrl);
                      }}
                    >
                      <Copy size={14} />
                    </button>
                  </div>

                  {/* second line: time / socials / holders/buyers/sellers */}
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-white/70">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{lastOnline}s</span>
                    </span>

                    {/* social / search */}
                    <button
                      title="Open Twitter"
                      className="opacity-80 hover:opacity-100"
                      onClick={() => {
                        if (Twitter) window.open(Twitter, "_blank");
                      }}
                    >
                      <Feather size={12} />
                    </button>
                    <button
                      title="Open Twitter"
                      className="opacity-80 hover:opacity-100"
                      onClick={() => {
                        if (Twitter) window.open(Twitter, "_blank");
                      }}
                    >
                      <Search size={12} />
                    </button>
                    <button
                      title="Open Twitter"
                      className="opacity-80 hover:opacity-100"
                      onClick={() => {
                        if (Twitter) window.open(Twitter, "_blank");
                      }}
                    >
                      <Link size={12} />
                    </button>

                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      <span>{Math.floor(Holders / 10000)}</span>
                    </span>

                    <span className="flex items-center gap-1">
                      <span className="opacity-80">B</span>
                      <span>{Math.floor(Buyers / 100)}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* badges row */}
            <div className="flex-wrap items-center hidden gap-1 mt-3 2xl:flex lg:">
              {badgeList.map((b) => (
                <div
                  key={b.key}
                  className={`inline-flex items-center gap-2 px-1 py-1 rounded-full bg-black/50 text-[10px] font-medium ${b.color}`}
                >
                  <span className="flex">
                    {b.icon}
                    {b.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* RIGHT column: price / change / buy */}
        <div className="flex flex-col items-end justify-between flex-shrink-0 gap-3">
          {/* right side compact stats (MC / V / fees / TX) */}
          <div className="flex flex-col items-center gap-1 mt-3 sm:mt-0">
            <div className="text-right">
              <div className="text-[13px] flex text-white/60 font-semibold lg:text-[16px]">
                MC{" "}
                <span className="ml-1 text-primaryBlue">
                  {formatK(liquidity)}
                </span>
              </div>
              <div className="text-white/60 text-6 ">
                v <span className="text-white">{formatK(Volume)}</span>
              </div>
            </div>

            <div className="hidden sm:flex flex-row gap-1 text-right text-[12px] text-white/60">
              <div className="flex gap-0.5 items-center justify-center">
                F
                <SolLogo width={12} />
                <span className="text-white/90">
                  {token.volatility?.toFixed?.(2)}
                </span>
              </div>
              <div className="flex flex-row">
                TX {Math.max(1, Math.floor(Volume / 100000))}
              </div>
              {/* price & change bar */}
              <div className="w-8 text-right">
                {/* Centered percentage bar (rounded & small) */}
                <div className="relative flex items-center w-full h-0.5 mt-2 overflow-hidden rounded-full bg-white/10">
                  {/* Left half (green) */}
                  <div className="absolute top-0 left-0 w-1/2 h-full bg-green-400 rounded-l-full" />
                  {/* Right half (red) */}
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-red-400 rounded-r-full" />
                  {/* Change indicator (moves from center) */}
                  <div
                    className="absolute top-0 h-full rounded-full"
                    style={{
                      left: "50%",
                      width: "1px",
                      background:
                        change === 0
                          ? "#fff"
                          : change > 0
                          ? "#22c55e"
                          : "#ef4444",
                      transform: `translateX(${pos}px)`,
                      transition: "transform 0.3s",
                    }}
                  />

                  {/* Center line */}
                  <div className="absolute left-1/2 top-0 h-full w-0.5 bg-white/30 -translate-x-1/2" />
                </div>
              </div>
            </div>
          </div>

          {/* buy button */}
          <div className="hidden 2xl:flex">
            <button
              disabled={!canBuy}
              onClick={() => onBuy?.(token)}
              className={`inline-flex items-center gap-2 px-2 py-1 rounded-full shadow-sm text-black transition ${
                canBuy
                  ? "bg-purple text-white hover:brightness-110"
                  : "bg-white/6 text-white/60 cursor-not-allowed"
              }`}
              title={canBuy ? "Buy" : "Cannot buy"}
            >
              <FaBolt size={14} color="black" />
              <span className="hidden text-sm font-semibold sm:inline">
                0 SOL
              </span>
              <span className="text-sm sm:hidden">Buy</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start flex-1 gap-3 mb-2 ml-4 flexwrap 2xl:hidden ">
        {badgeList.map((b) => (
          <div
            key={b.key}
            className={`inline-flex items-center gap-2 px-2 py-1 rounded-full bg-black/50 text-[10px] font-medium ${b.color}`}
          >
            <span className="flex">
              {b.icon}
              {b.value}
            </span>
          </div>
        ))}
      </div>
      <Separator dir="horizontal" />
    </div>
  );
}

export default React.memo(TokenRow);
