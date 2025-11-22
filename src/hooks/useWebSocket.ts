"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Token } from "@/types/token";
import { tickSparkline } from "@/utils/generateToken";

function normalRandom() {
  // Box-Muller
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export function useWebSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const interval = setInterval(() => {
      const tabs = ["New pairs", "Final Stretch", "Migrated"];

      tabs.forEach((tab) => {
        const key = ["tokens", tab];
        const list = queryClient.getQueryData<Token[]>(key);
        if (!list || list.length === 0) return;

        const total = list.length;
        // smaller active set -> realistic market (3% - 15%)
        const updateCount = Math.max(1, Math.floor(total * (0.03 + Math.random() * 0.12)));
        const indicesToUpdate = new Set<number>();
        while (indicesToUpdate.size < updateCount) {
          indicesToUpdate.add(Math.floor(Math.random() * total));
        }

        const updated = list.map((t, idx) => {
          if (!indicesToUpdate.has(idx)) {
            // small drifting noise for non-active tokens (keeps things alive)
            if (Math.random() < 0.02) {
              const small = 1 + (Math.random() - 0.5) * 0.01;
              const nextPrice = Math.max(0.0001, Number((t.CurrentPrice * small).toFixed(6)));
              return { ...t, CurrentPrice: nextPrice, ChartData: [...t.ChartData.slice(1), nextPrice], change: Number((((nextPrice - t.CurrentPrice) / t.CurrentPrice) * 100).toFixed(2)) };
            }
            return t;
          }

          // realistic stochastic price update
          const vol = Math.max(0.001, t.volatility ?? 0.03); // token vol
          const mu = -0.0005; // small negative drift to avoid runaway
          const shock = normalRandom() * vol; // gaussian shock
          // log-normal step
          const factor = Math.exp(mu + shock);
          const nextPrice = Math.max(0.0001, Number((t.CurrentPrice * factor).toFixed(6)));

          // mean-reversion nudging for very large swings
          const changePct = (nextPrice - t.CurrentPrice) / t.CurrentPrice;
          let adjPrice = nextPrice;
          if (Math.abs(changePct) > 0.35) {
            // pull back toward previous by 30%
            adjPrice = t.CurrentPrice + (nextPrice - t.CurrentPrice) * 0.35;
          }

          // volume reacts to absolute movement
          const volumeMultiplier = 1 + Math.min(8, Math.abs(changePct) * 6) + Math.random() * 0.5;
          const newVolume = Math.max(10, Math.floor(t.Volume * volumeMultiplier));

          // liquidity nudges slightly inversely to volatility
          const liquidityChange = 1 + (Math.random() - 0.5) * 0.02 + (Math.abs(changePct) * 0.1);
          const newLiquidity = Math.max(100, Math.floor(t.liquidity * liquidityChange));

          // small slow-moving holder changes
          const holdersChange = Math.max(1, Math.floor(t.Holders * (1 + (Math.random() - 0.5) * 0.02 + Math.sign(changePct) * 0.01)));

          // bonding slowly drifts, big moves can bump bonding up/down
          let newBonding = t.bonding ?? 0;
          // small drift
          newBonding = Math.max(0, Math.min(100, Math.round(newBonding + (Math.random() - 0.5) * 2)));
          // big move effect
          if (Math.abs(changePct) > 0.12) {
            newBonding = Math.max(0, Math.min(100, newBonding + Math.sign(changePct) * Math.round(Math.min(15, Math.abs(changePct) * 100))));
          }

          // ChartData tick (respect token volatility)
          const newChart = tickSparkline(t.ChartData, vol);

          // compute percent change
          const newChangePct = Number((((adjPrice - t.CurrentPrice) / t.CurrentPrice) * 100).toFixed(2));

          // Slightly vary snipers/insiders occasionally (rare)
          const newSnipers = Math.max(0, Math.floor(t.Snipers * (1 + (Math.random() - 0.5) * 0.05)));
          const newInsiders = Math.max(0, Math.floor(t.Insiders * (1 + (Math.random() - 0.5) * 0.05)));

          return {
            ...t,
            CurrentPrice: Number(adjPrice.toFixed(6)),
            ChartData: newChart,
            change: newChangePct,
            Volume: newVolume,
            liquidity: newLiquidity,
            Holders: holdersChange,
            Buyers: Math.max(0, Math.floor(t.Buyers * (1 + (Math.random() - 0.5) * 0.2))),
            Sellers: Math.max(0, Math.floor(t.Sellers * (1 + (Math.random() - 0.5) * 0.2))),
            Top10Holders: Number((t.Top10Holders * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2)),
            DevHoldings: Number((t.DevHoldings * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2)),
            Snipers: newSnipers,
            Insiders: newInsiders,
            Bundlers: Math.max(0, Math.floor(t.Bundlers * (1 + (Math.random() - 0.5) * 0.05))),
            volatility: Number(Math.max(0.001, t.volatility * (1 + (Math.random() - 0.5) * 0.1)).toFixed(4)),
            lastOnline: Math.floor(Math.random() * 120),
            watchers: Math.max(0, Math.floor(t.watchers * (1 + (Math.random() - 0.5) * 0.05))),
            holders24h: Math.max(0, Math.floor(t.holders24h * (1 + (Math.random() - 0.5) * 0.05))),
            bonding: newBonding,
          };
        });

        queryClient.setQueryData(key, updated);
      });
    }, 10); // 1s ticks — realistic cadence

    return () => clearInterval(interval);
  }, [queryClient]);
}
