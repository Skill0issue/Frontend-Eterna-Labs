"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import type { Token } from "@/types/token";
import {
  Clock,
  Search,
  Users,
  Copy,
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

// SHADCN TOOLTIP
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  token: Token;
  onBuy?: (t: Token) => void;
  className?: string;
};

// Memoized small icons
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeIcon = (C: React.ComponentType<any>, name: string) => {
  const I = memo(() => <C width={12} height={12} className="mr-1" />);
  I.displayName = name;
  return I;
};

const IconTop10 = makeIcon(UserStar, "IconTop10");
const IconDev = makeIcon(ChefHat, "IconDev");
const IconSnipers = makeIcon(Crosshair, "IconSnipers");
const IconInsiders = makeIcon(Ghost, "IconInsiders");
const IconBundlers = makeIcon(Boxes, "IconBundlers");

// number formatting
function formatNum(n?: number | null) {
  if (n == null) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e12) return (n / 1e12).toFixed(1) + "T";
  if (abs >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (abs >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (abs >= 1e3) return (n / 1e3).toFixed(1) + "K";
  if (!Number.isInteger(n)) return Number(n).toLocaleString(undefined, { maximumFractionDigits: 6 });
  return String(n);
}

// stable badge color logic
function badgeColor(metric: string, val: number) {
  switch (metric) {
    case "Top10Holders":
      return val >= 40 ? "text-green-400" : "text-red-400";
    case "DevHoldings":
      return val >= 10 ? "text-green-400" : "text-red-400";
    case "Snipers":
      return val >= 25 ? "text-green-400" : "text-red-400";
    case "Insiders":
      return val >= 5 ? "text-green-400" : "text-red-400";
    case "Bundlers":
      return val >= 10 ? "text-green-400" : "text-red-400";
    default:
      return "text-green-400";
  }
}

// SHADCN tooltip wrapper (makes code clean)
function T({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default memo(function TokenRow({ token, onBuy, className = "" }: Props) {
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
    bonding = 0,
    canBuy,
    copyUrl,
    Twitter,
    Buyers,
    volatility,
  } = token;

  // bonding animation
  const [displayBonding, setDisplayBonding] = useState(
    Math.max(0, Math.min(100, bonding))
  );
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const from = displayBonding;
    const to = Math.max(0, Math.min(100, bonding));
    const start = performance.now();
    const dur = 350;

    if (raf.current !== null) {
      cancelAnimationFrame(raf.current);
    }

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayBonding(from + (to - from) * eased);

      if (p < 1) {
        raf.current = requestAnimationFrame(tick);
      }
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
      }
    };  
  }, [bonding]);


  // persistent border color
  const borderHex = bonding >= 50 ? "#22c55e" : "#ef4444";

  // market cap color (blue/yellow)
  const prevLiqRef = useRef(liquidity);
  useEffect(() => {
    prevLiqRef.current = liquidity;
  }, [liquidity]);

  const mcColor =
    liquidity >= prevLiqRef.current
      ? "text-blue-400"
      : "text-yellow-400";

  const pos = Math.max(-20, Math.min(20, change ?? 0));

  // ordered badges
  const badges = [
    {
      key: "Top10Holders",
      label: "Top 10 Holders",
      val: Top10Holders ?? 0,
      display: (Top10Holders ?? 0).toFixed(1) + "%",
      icon: <IconTop10 />,
    },
    {
      key: "DevHoldings",
      label: "Dev Holdings",
      val: DevHoldings ?? 0,
      display: (DevHoldings ?? 0).toFixed(1) + "%",
      icon: <IconDev />,
    },
    {
      key: "Snipers",
      label: "Snipers",
      val: Snipers ?? 0,
      display: String(Snipers ?? 0),
      icon: <IconSnipers />,
    },
    {
      key: "Insiders",
      label: "Insiders",
      val: Insiders ?? 0,
      display: String(Insiders ?? 0),
      icon: <IconInsiders />,
    },
    {
      key: "Bundlers",
      label: "Bundlers",
      val: Bundlers ?? 0,
      display: String(Bundlers ?? 0),
      icon: <IconBundlers />,
    },
  ];

  return (
    <div className="flex flex-col border-b mb-2 border-white/5 bg-[#111014] my-1 hover:bg-[#0f1113]/30 transition-colors">
      <div
        className={`relative group flex justify-between items-start gap-4 px-4 py-1 overflow-hidden ${className}`}
      >
        {/* LEFT */}
        <div className="flex gap-4 min-w-0">
          {/* Bonding border + avatar */}
          <div className="relative flex-shrink-0">
            <T text={`Bonding: ${Math.round(displayBonding)}%`}>
              <div className="relative w-16 h-16 sm:w-14 sm:h-14 lg:w-20 lg:h-20">
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    padding: "3px",
                    background: `conic-gradient(${borderHex} ${displayBonding}%, rgba(0,0,0,0.6) ${displayBonding}%)`,
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    boxShadow: `0 0 8px ${borderHex}66`,
                  }}
                />
                <div className="absolute inset-[3px] rounded-xl overflow-hidden bg-[#0b0c0d]">
                  <img
                    src={logo}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </T>

            <span className="absolute w-3 h-3 bg-green-500 rounded-full bottom-1 -right-1 ring-2 ring-black" />
          </div>

          {/* INFO */}
          <div className="flex flex-col min-w-0">
            {/* title */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <T text={`${name} • ${symbol}`}>
                      <h3 className="text-base font-semibold text-white truncate max-w-[12rem] sm:text-sm lg:text-lg">
                        {name}{" "}
                        <span className="ml-1 text-[13px] text-white/60 font-normal">
                          {symbol}
                        </span>
                      </h3>
                    </T>

                    <T text="Copy contract">
                      <button
                        className="ml-2 opacity-70 hover:opacity-100"
                        onClick={() =>
                          copyUrl && navigator.clipboard.writeText(copyUrl)
                        }
                      >
                        <Copy size={14} />
                      </button>
                    </T>
                  </div>

                  {/* SECOND ROW */}
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-white/70">
                    <T text={`Last seen ${lastOnline}s ago`}>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{lastOnline}s</span>
                      </span>
                    </T>

                    <T text="Open Twitter">
                      <button
                        className="opacity-80 hover:opacity-100"
                        onClick={() =>
                          Twitter && window.open(Twitter, "_blank")
                        }
                      >
                        <Feather size={12} />
                      </button>
                    </T>

                    <T text="Search Twitter">
                      <button
                        className="opacity-80 hover:opacity-100"
                        onClick={() =>
                          Twitter && window.open(Twitter, "_blank")
                        }
                      >
                        <Search size={12} />
                      </button>
                    </T>

                    <T text="Open link">
                      <button
                        className="opacity-80 hover:opacity-100"
                        onClick={() =>
                          Twitter && window.open(Twitter, "_blank")
                        }
                      >
                        <Link size={12} />
                      </button>
                    </T>

                    <T text={`Holders: ${formatNum(Holders)}`}>
                      <span className="flex items-center gap-1 min-w-0">
                        <Users size={12} />
                        <span className="truncate max-w-[5rem]">
                          {formatNum(Holders)}
                        </span>
                      </span>
                    </T>

                    <T text={`Buyers: ${formatNum(Buyers)}`}>
                      <span className="flex items-center gap-1 min-w-0">
                        <span className="opacity-80">B</span>
                        <span className="truncate max-w-[4rem]">
                          {formatNum(Buyers)}
                        </span>
                      </span>
                    </T>
                  </div>
                </div>
              </div>
            </div>

            {/* BADGES (desktop) */}
            <div className="hidden 2xl:flex flex-wrap items-center gap-1 mt-3 overflow-hidden">
              {badges.map((b) => (
                <T key={b.key} text={b.label}>
                  <div
                    className={`inline-flex items-center gap-2 px-2 py-1 rounded-full bg-black/50 text-[10px] font-medium ${badgeColor(
                      b.key,
                      b.val
                    )}`}
                  >
                    {b.icon}
                    <span className="truncate max-w-[5rem]">{b.display}</span>
                  </div>
                </T>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end justify-between flex-shrink-0 gap-3 min-w-0">
          {/* Market / Volume */}
          <div className="flex flex-col justify-end items-end gap-1 mt-3 sm:mt-0">
            <div className="text-right flex flex-col items-end justify-end">
              {/* MC */}
              <div className="text-[13px] flex items-end text-white/60 font-semibold lg:text-[16px] min-w-0">
                <T text={`Market cap (liquidity): ${formatNum(liquidity)}`}>
                  <span className="flex items-center gap-1 truncate max-w-[7rem] text-sm">
                    MC{" "}
                    <span className={`${mcColor} text-lg`}>
                      ${formatNum(liquidity)}
                    </span>
                  </span>
                </T>
              </div>

              {/* Volume */}
              <div className="text-white/60 min-w-0 flex items-end">
                <T text={`Volume: ${formatNum(Volume)}`}>
                  <span className="flex items-right justify-center gap-1 truncate max-w-[7rem]">
                    v <span className="text-white">${formatNum(Volume)}</span>
                  </span>
                </T>
              </div>
            </div>

            {/* volatility + tx + change bar */}
            <div className="hidden sm:flex flex-row gap-1 items-center justify-center text-right text-[12px] text-white/60">
              <T text={`Volatility: ${(volatility ?? 0).toFixed(3)}`}>
                <div className="flex gap-0.5 items-center">
                  F <SolLogo width={12} />
                  <span className="text-white/90">
                    {(volatility ?? 0).toFixed(3)}
                  </span>
                </div>
              </T>

              <T
                text={`Estimated TX: ${Math.max(
                  1,
                  Math.floor(Volume / 100000)
                )}`}
              >
                <div className="flex flex-row">
                  TX {Math.max(1, Math.floor(Volume / 100000))}
                </div>
              </T>

              {/* change bar */}
              <div className="w-8 text-right flex items-center justify-center">
                <div className="relative flex justify-center items-center w-full h-0.5 rounded-full bg-white/10">
                  <div className="absolute top-0 left-0 w-1/2 h-full bg-green-400 rounded-l-full" />
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-red-400 rounded-r-full" />

                  <div
                    className="absolute inset-0 h-full rounded-full"
                    style={{
                      left: "50%",
                      width: 2,
                      background:
                        change > 0
                          ? "#22c55e"
                          : change < 0
                            ? "#ef4444"
                            : "#fff",
                      transform: `translateX(${pos}px)`,
                      transition: "transform 0.25s",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BUY BUTTON */}
          <div className="hidden 2xl:flex">
            <T text={canBuy ? "Buy token" : "Cannot buy"}>
              <button
                disabled={!canBuy}
                onClick={() => onBuy?.(token)}
                className={`inline-flex items-center gap-2 px-2 py-1 rounded-full shadow-sm transition ${canBuy
                    ? "bg-purple text-white hover:brightness-110"
                    : "bg-white/6 text-white/60 cursor-not-allowed"
                  }`}
              >
                <FaBolt size={14} color="black" />
                <span className="hidden sm:inline text-sm font-semibold">
                  0 SOL
                </span>
                <span className="sm:hidden text-sm">Buy</span>
              </button>
            </T>
          </div>
        </div>
      </div>

      {/* MOBILE BADGES */}
      <div className="flex items-center gap-3 mb-2 ml-4 2xl:hidden overflow-hidden">
        {badges.map((b) => (
          <T key={b.key} text={b.label}>
            <div
              className={`inline-flex items-center gap-2 px-2 py-1 rounded-full bg-black/50 text-[10px] font-medium ${badgeColor(
                b.key,
                b.val
              )}`}
            >
              {b.icon}
              <span className="truncate max-w-[5rem]">{b.display}</span>
            </div>
          </T>
        ))}
      </div>

      <Separator dir="horizontal" />
    </div>
  );
});
