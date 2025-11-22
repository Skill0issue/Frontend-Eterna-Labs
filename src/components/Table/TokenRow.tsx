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
    bonding,
    canBuy,
    copyUrl,
    Twitter,
    Buyers,
    volatility,
  } = token;

  // -------------------------------
  // TRACK PREVIOUS TOKEN STATE
  // -------------------------------
  const prevRef = useRef<Token | null>(null);
  useEffect(() => {
    prevRef.current = token;
  }, [token]);

  const prev = prevRef.current;

  // -------------------------------
  // IMPROVEMENT-BASED COLOR LOGIC
  // -------------------------------
  const improvementColor = (current: number, prevValue?: number) => {
    if (prevValue === undefined) return "text-white/60";

    const diff = current - prevValue;
    if (diff > 0) return "text-green-400"; // improved
    if (diff < 0) return "text-red-400";   // worsened
    return "text-white/60";
  };

  // -------------------------------
  // NORMALIZED BADGE VALUES
  // -------------------------------
  const normPct = (value: number, maxHint: number) =>
    Math.min(100, Math.max(0, Math.round((value / maxHint) * 100)));

  const badgeList = [
    {
      key: "Snipers",
      label: "Snipers",
      value: normPct(Snipers, 50),
      raw: Snipers,
      prev: prev?.Snipers,
      icon: <IconCrosshair />,
    },
    {
      key: "DevHoldings",
      label: "Dev",
      value: Math.round(DevHoldings),
      raw: DevHoldings,
      prev: prev?.DevHoldings,
      icon: <IconChefHat />,
    },
    {
      key: "Top10Holders",
      label: "Top10",
      value: Math.round(Top10Holders),
      raw: Top10Holders,
      prev: prev?.Top10Holders,
      icon: <IconUserStar />,
    },
    {
      key: "Insiders",
      label: "Insiders",
      value: normPct(Insiders, 30),
      raw: Insiders,
      prev: prev?.Insiders,
      icon: <IconGhost />,
    },
    {
      key: "Bundlers",
      label: "Bundlers",
      value: normPct(Bundlers, 50),
      raw: Bundlers,
      prev: prev?.Bundlers,
      icon: <IconBoxes />,
    },
  ];

  // -------------------------------
  // FORMATTING
  // -------------------------------
  const formatK = (n?: number) => {
    if (!n) return "$0";
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
    return `$${n}`;
  };

  const pos = Math.max(-20, Math.min(20, change));

  // -------------------------------
  // SMOOTH ANIMATED BONDING RING
  // -------------------------------
  const [displayBonding, setDisplayBonding] = useState(bonding);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const from = displayBonding;
    const to = bonding;
    const duration = 350;

    if (raf.current) {
      cancelAnimationFrame(raf.current);
    }

    const animate = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplayBonding(from + (to - from) * ease);

      if (p < 1) {
        raf.current = requestAnimationFrame(animate);
      }
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
      }
    };
  }, [bonding]);

  // bonding color: improvement-based, not threshold-based
  const borderColor = improvementColor(bonding, prev?.bonding).replace("text-", "#").replace("-400", "");

  // -------------------------------
  // RENDER
  // -------------------------------
  return (
    <div className="flex flex-col border-b mb-2 border-white/5 bg-[#111014] my-1 hover:bg-[#0f1113]/30 transition-colors">
      <div className={`relative group flex justify-between items-start gap-4 px-4 py-1 ${className}`}>

        {/* LEFT SECTION */}
        <div className="flex gap-4">
          {/* BONDING BORDER + IMAGE */}
          <div className="relative flex-shrink-0">
            <div className="relative w-16 h-16 sm:w-14 sm:h-14 lg:w-20 lg:h-20">

              {/* BORDER (Square, Rounded) */}
              <div
                className="absolute inset-0 rounded-xl transition-all"
                style={{
                  padding: "3px",
                  background: `conic-gradient(${borderColor} ${displayBonding}%, #222 ${displayBonding}%)`,
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              {/* IMAGE */}
              <div className="absolute inset-[3px] rounded-xl overflow-hidden bg-[#0b0c0d]">
                <img src={logo} alt={name} className="object-cover w-full h-full" />
              </div>
            </div>

            {/* online dot */}
            <span className="absolute w-3 h-3 bg-green-500 rounded-full bottom-7 -right-1 ring-2 ring-black" />
          </div>

          {/* MAIN CONTENT */}
          <div className="flex flex-col">
            {/* Name / Symbol */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-white truncate sm:text-sm lg:text-lg">
                      {name}{" "}
                      <span className="ml-1 text-[13px] text-white/60 font-normal">{symbol}</span>
                    </h3>

                    <button
                      title="Copy"
                      className="ml-2 opacity-70 hover:opacity-100"
                      onClick={() => copyUrl && navigator.clipboard.writeText(copyUrl)}
                    >
                      <Copy size={14} />
                    </button>
                  </div>

                  {/* Line 2 */}
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-white/70">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{lastOnline}s</span>
                    </span>

                    {[Feather, Search, Link].map((Icon, i) => (
                      <button
                        key={i}
                        className="opacity-80 hover:opacity-100"
                        onClick={() => Twitter && window.open(Twitter, "_blank")}
                      >
                        <Icon size={12} />
                      </button>
                    ))}

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

            {/* BADGES */}
            <div className="hidden 2xl:flex flex-wrap items-center gap-1 mt-3">
              {badgeList.map((b) => {
                const color = improvementColor(b.raw, b.prev);
                return (
                  <div
                    key={b.key}
                    className={`inline-flex items-center gap-2 px-2 py-1 rounded-full bg-black/50 text-[10px] font-medium ${color}`}
                  >
                    {b.icon}
                    {b.value}%
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col items-end justify-between flex-shrink-0 gap-3">
          {/* MC + Volume */}
          <div className="flex flex-col items-center gap-1 mt-3 sm:mt-0">
            <div className="text-right">
              <div className="text-[13px] flex text-white/60 font-semibold lg:text-[16px]">
                MC <span className="ml-1 text-primaryBlue">{formatK(liquidity)}</span>
              </div>
              <div className="text-white/60">v <span className="text-white">{formatK(Volume)}</span></div>
            </div>

            {/* Treemap Bar */}
            <div className="hidden sm:flex flex-row gap-1 text-right text-[12px] text-white/60">
              <div className="flex gap-0.5 items-center">
                F <SolLogo width={12} />
                <span className="text-white/90">{(volatility ?? 0).toFixed(2)}</span>
              </div>

              <div className="flex flex-row">
                TX {Math.max(1, Math.floor(Volume / 100000))}
              </div>

              <div className="w-8 text-right">
                <div className="relative flex items-center w-full h-0.5 mt-2 rounded-full bg-white/10">
                  <div className="absolute left-0 w-1/2 h-full bg-green-400" />
                  <div className="absolute right-0 w-1/2 h-full bg-red-400" />

                  <div
                    className="absolute h-full"
                    style={{
                      left: "50%",
                      width: 2,
                      background: change > 0 ? "#22c55e" : change < 0 ? "#ef4444" : "#fff",
                      transform: `translateX(${pos}px)`,
                      transition: "transform .25s",
                    }}
                  />

                  <div className="absolute left-1/2 w-0.5 h-full bg-white/30 -translate-x-1/2" />
                </div>
              </div>
            </div>
          </div>

          {/* Buy Button */}
          <div className="hidden 2xl:flex">
            <button
              disabled={!canBuy}
              onClick={() => onBuy?.(token)}
              className={`inline-flex items-center gap-2 px-2 py-1 rounded-full shadow-sm transition
                ${canBuy ? "bg-purple text-white hover:brightness-110" : "bg-white/6 text-white/60 cursor-not-allowed"}
              `}
            >
              <FaBolt size={14} color="black" />
              <span className="hidden sm:inline text-sm font-semibold">0 SOL</span>
              <span className="sm:hidden text-sm">Buy</span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE BADGES */}
      <div className="flex items-center gap-3 mb-2 ml-4 2xl:hidden">
        {badgeList.map((b) => {
          const color = improvementColor(b.raw, b.prev);
          return (
            <div
              key={b.key}
              className={`inline-flex items-center gap-2 px-2 py-1 rounded-full bg-black/50 text-[10px] font-medium ${color}`}
            >
              {b.icon}
              {b.value}%
            </div>
          );
        })}
      </div>

      <Separator dir="horizontal" />
    </div>
  );
}

export default React.memo(TokenRow);
