"use client";

import React, { memo, useEffect, useRef, useState, useMemo } from "react";
import type { Token } from "@/types/token";
import {
  Clock,
  Search,
  Users,
  Feather,
  Link,
  Crosshair,
  Boxes,
  ChefHat,
  UserStar,
  Ghost,
} from "lucide-react";
import { FaBolt } from "react-icons/fa6";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { SolLogo } from "../../../public/svg/solana";

type Props = {
  token: Token;
  onBuy?: (t: Token) => void;
  className?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const makeIcon = (C: any, name: string) => {
  const I = memo(() => <C width={12} height={12} className="mr-1" />);
  I.displayName = name;
  return I;
};

const IconTop10 = makeIcon(UserStar, "IconTop10");
const IconDev = makeIcon(ChefHat, "IconDev");
const IconSnipers = makeIcon(Crosshair, "IconSnipers");
const IconInsiders = makeIcon(Ghost, "IconInsiders");
const IconBundlers = makeIcon(Boxes, "IconBundlers");

// stable formatting (Axiom-like)
const formatNum = (n?: number | null) => {
  if (n == null) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e12) return (n / 1e12).toFixed(1) + "T";
  if (abs >= 1e9) return (n / 1e9).toFixed(1) + "B";
  if (abs >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (abs >= 1e3) return (n / 1e3).toFixed(1) + "K";
  if (!Number.isInteger(n)) return Number(n).toLocaleString(undefined, { maximumFractionDigits: 6 });
  return String(n);
};

// pure rule for badge color — deterministic (no flicker)
const badgeColor = (metric: string, val: number) => {
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
};

// tiny Tooltip wrapper component (memo)
const TT = memo(function TT({ text, children }: { text: string; children: React.ReactNode }) {
  // using TooltipTrigger + TooltipContent directly (shadcn)
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="top">{text}</TooltipContent>
    </Tooltip>
  );
});

export default memo(function TokenRow({ token, onBuy, className = "" }: Props) {
  // destructure token
  const {
    id,
    name,
    symbol,
    logo,
    lastOnline,
    Holders,
    liquidity,
    Volume,
    Snipers,
    DevHoldings,
    Top10Holders,
    Insiders,
    Bundlers,
    volatility,
    change,
    bonding = 0,
    canBuy,
    Twitter,
    Buyers,
  } = token;

  const [displayBonding, setDisplayBonding] = useState<number>(() => Math.max(0, Math.min(100, bonding)));
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const from = displayBonding;
    const to = Math.max(0, Math.min(100, bonding));
    const duration = 350;


    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayBonding(from + (to - from) * eased);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [bonding]);

  // border hex stable, computed once per render
  const borderHex = useMemo(() => (bonding >= 50 ? "#22c55e" : "#ef4444"), [bonding]);

  // market-cap color (stable based on liquidity increasing/decreasing)
  const prevLiqRef = useRef<number | undefined>(liquidity);
  useEffect(() => {
    prevLiqRef.current = liquidity;
  }, [liquidity]);
  const mcColor = useMemo(() => (liquidity >= (prevLiqRef.current ?? 0) ? "text-blue-400" : "text-yellow-400"), [liquidity]);

  // clamp change indicator position
  const pos = useMemo(() => Math.max(-20, Math.min(20, change ?? 0)), [change]);
  const badges = useMemo(
    () => [
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
    ],
    [Top10Holders, DevHoldings, Snipers, Insiders, Bundlers]
  );

  const borderStyle = useMemo(
    () => ({
      padding: "3px",
      background: `conic-gradient(${borderHex} ${displayBonding}%, #222 ${displayBonding}%)`,
      WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      transition: "background 0.2s linear",
      boxShadow: `0 0 12px ${borderHex}55`,
    }),
    [borderHex, displayBonding]
  );

  return (
    <div className="flex flex-col border-b font-inter tracking-tight mb-2 border-white/5 bg-[#111014] hover:bg-[#0f1113]/30 transition-colors">
      <div className={`flex group relative justify-between items-start gap-4 px-4 py-1 my-1 ${className}`}>

        {/* ACTION BUTTONS – ABOVE IMAGE */}
        <div
          className="
            absolute 
            top-1 left-4  
            hidden flex-col gap-1
            group-hover:flex
            transition-opacity duration-200
            z-[50]
            pointer-events-none 
          "
        >
          <div className="pointer-events-auto">
            <TT text="Hide">
              <div className="w-5 h-5 rounded-md bg-black/60 border border-white/10 flex items-center justify-center hover:bg-black/80">
                <Ghost size={14} className="text-white/80" />
              </div>
            </TT>
          </div>

          <div className="pointer-events-auto">
            <TT text="Watchlist">
              <div className="w-5 h-5 rounded-md bg-black/60 border border-white/10 flex items-center justify-center hover:bg-black/80">
                <UserStar size={12} className="text-blue-300" />
              </div>
            </TT>
          </div>

          <div className="pointer-events-auto">
            <TT text="Mute">
              <div className="w-5 h-5 rounded-md bg-black/60 border border-white/10 flex items-center justify-center hover:bg-black/80">
                <Crosshair size={12} className="text-red-300" />
              </div>
            </TT>
          </div>
        </div>

        {/* LEFT */}
        <div className="flex gap-4 min-w-0">
          {/* BONDING IMAGE */}
          <div className="relative flex-shrink-0">
            <TT text={`Bonding: ${Math.round(displayBonding)}%`}>
              <div className="relative w-16 h-16 sm:w-14 sm:h-14 lg:w-20 lg:h-20">
                {/* animated border (no absolute on inner image) */}
                <div className="absolute inset-0 rounded-2xl" style={borderStyle} />
                <div className="rounded-2xl overflow-hidden bg-[#0b0c0d]">
                  <img
                    src={logo}
                    alt={name}
                    className="w-full h-full object-cover rounded-2xl"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </TT>

            {/* online dot */}
            <span className="absolute w-3 h-3 bg-green-500 rounded-full bottom-4 -right-1 ring-2 ring-black" />
            <TT text={id ?? ""}>
              <div className="mt-1 text-[11px] text-white/40 w-full text-center items-center truncate">
                {id ? `${id.slice(0, 4)}...${id.slice(-4)}` : ""}
              </div>
            </TT>
          </div>

          {/* NAME + ROW INFO */}
          <div className="flex flex-col min-w-0">
            <TT text={`${name} • ${symbol}`}>
              <h3 className="text-base font-semibold text-white truncate max-w-[12rem] sm:text-sm lg:text-lg">
                {name} <span className="ml-1 text-[13px] text-white/60">{symbol}</span>
              </h3>
            </TT>

            <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-white/70">
              <TT text={`Last seen ${lastOnline}s ago`}>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {lastOnline}s
                </span>
              </TT>

              <TT text="Twitter">
                <button className="opacity-80 hover:opacity-100" onClick={() => Twitter && window.open(Twitter, "_blank")}>
                  <Feather size={12} />
                </button>
              </TT>

              <TT text="Search">
                <button className="opacity-80 hover:opacity-100">
                  <Search size={12} />
                </button>
              </TT>

              <TT text="Open link">
                <button className="opacity-80 hover:opacity-100">
                  <Link size={12} />
                </button>
              </TT>

              <TT text={`Holders: ${formatNum(Holders)}`}>
                <span className="flex items-center gap-1">
                  <Users size={12} /> {formatNum(Holders)}
                </span>
              </TT>

              <TT text={`Buyers: ${formatNum(Buyers)}`}>
                <span className="flex items-center gap-1">B {formatNum(Buyers)}</span>
              </TT>
            </div>

            {/* BADGES */}
            <div className="hidden 2xl:flex gap-1 mt-3">
              {badges.map((b) => (
                <TT key={b.key} text={b.label}>
                  <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full bg-black/50 text-[10px] font-medium ${badgeColor(b.key, b.val)}`}>
                    {b.icon}
                    {b.display}
                  </div>
                </TT>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end justify-between text-end gap-3">
          <div className="text-right">
            <TT text={`Market cap: ${formatNum(liquidity)}`}>
              <div className="flex justify-end text-white/70 text-xs items-end text-end">
                MC &nbsp;
                <div className={`text-[16px] ${mcColor}`}>${formatNum(liquidity)}</div>
              </div>
            </TT>

            <TT text={`Volume: ${formatNum(Volume)}`}>
              <div className="flex text-xs text-white/70 justify-end items-center text-center">
                V&nbsp;<div className="text-white text-[16px]"> ${formatNum(Volume)}</div>
              </div>
            </TT>
          </div>

          <div className="hidden sm:flex flex-row gap-2 items-center text-[12px] text-white/60">
            <TT text={`Volatility: ${(volatility ?? 0).toFixed(3)}`}>
              <div className="flex items-center gap-1">
                F <SolLogo width={12} />
                <span className="text-white/90">{(volatility ?? 0).toFixed(3)}</span>
              </div>
            </TT>

            <TT text={`Estimated TX: ${Math.max(1, Math.floor((Volume ?? 0) / 100000))}`}>
              <div>TX {Math.max(1, Math.floor((Volume ?? 0) / 100000))}</div>
            </TT>

            {/* CHANGE BAR */}
            <div className="w-10 flex items-center justify-center">
              <div className="relative w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-1/2 bg-green-400" />
                <div className="absolute right-0 top-0 h-full w-1/2 bg-red-400" />

                <div
                  className="absolute top-0 h-full rounded-full"
                  style={{
                    width: "2px",
                    left: "50%",
                    transform: `translateX(${pos}px)`,
                    backgroundColor: change > 0 ? "#22c55e" : change < 0 ? "#ef4444" : "#ffffff",
                    transition: "transform .25s ease-out, background-color .2s ease",
                  }}
                />

                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/30 -translate-x-1/2" />
              </div>
            </div>
          </div>

          <TT text={canBuy ? "Buy token" : "Not available"}>
            <button
              disabled={!canBuy}
              onClick={() => onBuy?.(token)}
              className={`px-2 py-1 rounded-full flex items-center font-semibold leading-tight tracking-tight text-xs gap-1 ${canBuy ? "bg-purple text-black" : "bg-white/10 text-black/60 cursor-not-allowed"}`}
            >
              <FaBolt size={12} color="black" />
              0 SOL
            </button>
          </TT>
        </div>
      </div>
    </div>
  );
});
