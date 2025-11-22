"use client";

import React, { useState, useMemo, useCallback } from "react";
import type { Token } from "@/types/token";
import TokenRow from "./TokenRow";
import { TableSkeleton } from "./TableSkeleton";
import { Pause } from "lucide-react";
import { SolLogo } from "../../../public/svg/solana";
import { FiltersModal } from "./FiltersModal";
import { FixedSizeList } from "react-window";
import { TooltipProvider } from "@/components/ui/tooltip";

interface sectionProps {
  title: string;
  tokens: Token[] | undefined;
  loading: boolean;
  selected: string;
  onSelect: (value: string) => void;
}

export default function Section(props: sectionProps) {
  const { selected, onSelect } = props;

  // SORT STATE
  const [sortKey, setSortKey] = useState<keyof Token>("CurrentPrice");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sortedTokens = useMemo(() => {
    if (!props.tokens) return [];
    return [...props.tokens].sort((a, b) => {
      const aVal = a[sortKey] as number;
      const bVal = b[sortKey] as number;
      return sortDir === "desc" ? bVal - aVal : aVal - bVal;
    });
  }, [props.tokens, sortKey, sortDir]);

  // Virtualized renderer
  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const tok = sortedTokens[index];
      return (
        <div style={style}>
          <TokenRow token={tok} />
        </div>
      );
    },
    [sortedTokens]
  );

  return (
    <TooltipProvider>

      <div className="w-full flex flex-col h-[calc(100vh-225px)] bg-[#0b0c10] rounded-2xl border border-white/20 overflow-hidden">
        {/* MOBILE TABS */}
        <div className="xl:hidden w-full py-2 flex flex-1 justify-between bg-[#111217] border-b border-white/10">
          <div className="flex max-w-full gap-2 text-lg text-white min-w-fit">
            {["New Pairs", "Final Stretch", "Migrated"].map((tab) => {
              const isActive = selected === tab;
              return (
                <button
                  key={tab}
                  onClick={() => onSelect(tab)}
                  className="flex flex-col items-center flex-1"
                >
                  <span
                    className={`${isActive ? "text-white" : "text-white/60"
                      } min-w-32 transition`}
                  >
                    {tab}
                  </span>

                  {/* underline */}
                  <div
                    className={`h-[2px] w-full mt-1 transition-all ${isActive ? "bg-white" : "bg-transparent"
                      }`}
                  />
                </button>
              );
            })}
          </div>
          <div className="flex items-center mr-4 justfify-center">
            <FiltersModal
              sortKey={sortKey}
              sortDir={sortDir}
              onSortChange={(key, dir) => {
                setSortKey(key);
                setSortDir(dir);
              }}
            />
          </div>
        </div>

        {/* HEADER */}
        <div className="hidden xl:flex items-center justify-between px-3 py-1 text-white bg-[#111217] border-b border-white/10">
          <h2 className="text-lg">{props.title}</h2>

          <div className="flex items-center gap-3 rounded-full bg-[#111014] px-3 py-1 text-white/70">
            <Pause size={18} className="cursor-pointer hover:text-white" />
            <div className="flex items-center gap-2 cursor-pointer hover:text-white">
              <span className="text-sm">0</span>
              <SolLogo />
            </div>
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 bg-white/5 rounded text-xs">P1</span>
              <span className="px-2 py-0.5 bg-white/5 rounded text-xs">P2</span>
              <span className="px-2 py-0.5 bg-white/5 rounded text-xs">P3</span>
            </div>

            <FiltersModal
              sortKey={sortKey}
              sortDir={sortDir}
              onSortChange={(key, dir) => {
                setSortKey(key);
                setSortDir(dir);
              }}
            />
          </div>
        </div>

        {/* TABLE */}
        {props.loading ? (
          <TableSkeleton />
        ) : (
          <FixedSizeList
            height={window.innerHeight}
            itemCount={sortedTokens.length}
            itemSize={115} // height per TokenRow
            width={"100%"}
            className="bg-[#111217] custom-scrollbar"
          >
            {Row}
          </FixedSizeList>
        )}


        {/* SCROLLBAR */}
        <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
      `}</style>


      </div>
    </TooltipProvider>
  );
}
