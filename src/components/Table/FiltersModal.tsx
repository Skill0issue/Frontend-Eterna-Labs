import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings2 } from "lucide-react";
import type { Token } from "@/types/token";
import React, { useState } from "react";

interface FiltersModalProps {
  sortKey: keyof Token;
  sortDir: "asc" | "desc";
  onSortChange: (key: keyof Token, dir: "asc" | "desc") => void;
}

export function FiltersModal({
  sortKey,
  sortDir,
  onSortChange,
}: FiltersModalProps) {
  const [localSortKey, setLocalSortKey] = useState<keyof Token>(sortKey);
  const [localSortDir, setLocalSortDir] = useState<"asc" | "desc">(sortDir);

  const handleApply = () => {
    onSortChange(localSortKey, localSortDir);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Settings2 className="w-5 h-5 cursor-pointer text-white/70 hover:text-white" />
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto bg-[#0d0e11] border border-white/10 text-white max-w-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl">Filters</DialogTitle>
        </DialogHeader>

        {/* Tabs Header */}
        <Tabs defaultValue="pairs" className="w-full">
          <TabsList className="flex gap-6 mb-4 bg-transparent text-white/70">
            <TabsTrigger
              value="pairs"
              className="data-[state=active]:text-white   data-[state=active]:bg-primary"
            >
              New Pairs
            </TabsTrigger>
            <TabsTrigger
              value="final"
              className="data-[state=active]:text-white data-[state=active]:bg-primary"
            >
              Final Stretch
            </TabsTrigger>
            <TabsTrigger
              value="migrated"
              className="data-[state=active]:text-white data-[state=active]:bg-primary"
            >
              Migrated
            </TabsTrigger>
          </TabsList>

          {/* Protocol Grid */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-white/80">Protocols</p>
              <button className="text-xs text-white/60 hover:text-white">
                Select All
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                "Pump",
                "Bags",
                "Daos.fun",
                "Believe",
                "Boop",
                "Raydium",
                "Pump AMM",
                "Mayhem",
                "Moonshot",
                "Candle",
                "Jupiter Studio",
                "LaunchLab",
                "Meteora AMM",
                "Orca",
                "Bonk",
                "Heaven",
                "Sugar",
                "Moomit",
              ].map((p) => (
                <div
                  key={p}
                  className="px-3 py-1 text-xs rounded-lg cursor-pointer bg-white/5 text-white/80 hover:bg-white/10"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Quote Tokens */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-white/80">Quote Tokens</p>
              <button className="text-xs text-white/60 hover:text-white">
                Unselect All
              </button>
            </div>
            <div className="flex gap-2">
              {["SOL", "USDC", "USD1"].map((q) => (
                <div
                  key={q}
                  className="px-3 py-1 text-xs rounded-lg cursor-pointer bg-white/5 text-white/80 hover:bg-white/10"
                >
                  {q}
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="mb-1 text-xs text-white/70">Search Keywords</p>
              <Input
                placeholder="keyword1, keyword2"
                className="bg-white/5 border-white/10"
              />
            </div>
            <div>
              <p className="mb-1 text-xs text-white/70">Exclude Keywords</p>
              <Input
                placeholder="keyword1, keyword2"
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>

          {/* Subtabs */}
          <Tabs defaultValue="audit" className="w-full">
            <TabsList className="flex gap-4 mb-4 bg-transparent text-white/70">
              <TabsTrigger
                value="audit"
                className="data-[state=active]:text-white data-[state=active]:bg-primary"
              >
                Audit
              </TabsTrigger>
              <TabsTrigger
                value="metrics"
                className="data-[state=active]:text-white  data-[state=active]:bg-primary"
              >
                Metrics
              </TabsTrigger>
              <TabsTrigger
                value="socials"
                className="data-[state=active]:text-white  data-[state=active]:bg-primary"
              >
                Socials
              </TabsTrigger>
            </TabsList>

            {/* Audit Tab */}
            <TabsContent value="audit" className="space-y-4 ">
              <p className="text-sm">Audit filters</p>

              {/* Age */}
              <div>
                <p className="mb-1 text-xs text-white/70">Age</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Min"
                    className="bg-white/5 border-white/10"
                  />
                  <Input
                    placeholder="Max"
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Metrics Tab */}
            <TabsContent value="metrics" className="space-y-4 text-white/70">
              <p className="text-sm">Metrics filters</p>
            </TabsContent>

            {/* Socials Tab */}
            <TabsContent value="socials" className="space-y-4 text-white/70">
              <p className="text-sm">Social filters</p>
            </TabsContent>
          </Tabs>

          {/* Sorting Section */}
          <div className="mb-6">
            <p className="mb-2 text-sm text-white/80">Sort By</p>

            <div className="flex flex-wrap gap-2">
              {(
                [
                  { key: "CurrentPrice", label: "Price" },
                  { key: "Volume", label: "Volume" },
                  { key: "liquidity", label: "Liquidity" },
                ] as { key: keyof Token; label: string }[]
              ).map((s) => {
                const isActive = localSortKey === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => {
                      setLocalSortKey(s.key);
                      setLocalSortDir(
                        isActive && localSortDir === "desc" ? "asc" : "desc"
                      );
                    }}
                    className={`
                      px-3 py-1 text-xs rounded-lg flex items-center gap-1
                      ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-white/5 text-white/80"
                      }
                      hover:bg-white/10 transition
                    `}
                  >
                    {s.label}
                    <span className="text-[10px] opacity-80">
                      {isActive ? (localSortDir === "asc" ? "↑" : "↓") : "↕"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <div className="flex gap-2">
              <Button className="bg-white/10 hover:bg-white/20">Import</Button>
              <Button className="bg-white/10 hover:bg-white/20">Export</Button>
            </div>
            <Button
              type="submit"
              onClick={handleApply}
              className="px-6 text-white bg-blue-600 hover:bg-blue-700"
            >
              Apply All
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
