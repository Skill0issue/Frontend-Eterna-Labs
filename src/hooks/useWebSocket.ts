"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Token } from "@/types/token";

export function useWebSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const interval = setInterval(() => {
      const tabs = ["New pairs", "Final Stretch", "Migrated"];

      tabs.forEach((tab) => {
        const key = ["tokens", tab];
        const list = queryClient.getQueryData<Token[]>(key);

        if (!list) return;

        // Pick 5–25% of tokens randomly to update
        const total = list.length;
        const updateCount = Math.max(1, Math.floor(total * (0.05 + Math.random() * 0.20)));

        const indicesToUpdate = new Set<number>();
        while (indicesToUpdate.size < updateCount) {
          indicesToUpdate.add(Math.floor(Math.random() * total));
        }

        // Update only selected tokens
        const updated = list.map((t, index) => {
          if (!indicesToUpdate.has(index)) {
            return t; // unchanged token
          }

          // Make large visible changes
          const nextPrice =
            t.CurrentPrice * (1 + (Math.random() - 0.5) * 0.40); // +-40%

          const nextVolatility =
            t.volatility * (1 + (Math.random() - 0.5) * 0.50); // +-50%

          return {
            ...t,

            // Price updates
            CurrentPrice: Number(nextPrice.toFixed(4)),
            change: Number((((nextPrice - t.CurrentPrice) / t.CurrentPrice) * 100).toFixed(2)),

            // Sparkline big shift
            ChartData: [...t.ChartData.slice(1), nextPrice],

            // Market data swings
            liquidity: Math.max(10, Math.floor(t.liquidity * (1 + (Math.random() - 0.5) * 0.60))),
            Volume: Math.max(10, Math.floor(t.Volume * (1 + (Math.random() - 0.5) * 0.40))),

            // Holder & buyer fluctuations
            Holders: Math.max(1, Math.floor(t.Holders * (1 + (Math.random() - 0.5) * 0.20))),
            Buyers: Math.max(0, Math.floor(t.Buyers * (1 + (Math.random() - 0.5) * 0.30))),
            Sellers: Math.max(0, Math.floor(t.Sellers * (1 + (Math.random() - 0.5) * 0.30))),

            // Token info big visible changes
            Top10Holders: Number((t.Top10Holders * (1 + (Math.random() - 0.5) * 0.30)).toFixed(2)),
            DevHoldings: Number((t.DevHoldings * (1 + (Math.random() - 0.5) * 0.40)).toFixed(2)),
            Snipers: Math.max(0, Math.floor(t.Snipers * (1 + (Math.random() - 0.5) * 1.10))),
            Insiders: Math.max(0, Math.floor(t.Insiders * (1 + (Math.random() - 0.5) * 0.40))),
            Bundlers: Math.max(0, Math.floor(t.Bundlers * (1 + (Math.random() - 0.5) * 0.50))),

            // Volatility fluctuation
            volatility: Number(nextVolatility.toFixed(3)),

            // Activity
            lastOnline: Math.floor(Math.random() * 120),

            // Random jumps
            watchers: Math.max(0, Math.floor(t.watchers * (1 + (Math.random() - 0.5) * 0.40))),
            holders24h: Math.max(1, Math.floor(t.holders24h * (1 + (Math.random() - 0.5) * 0.40))),
          };
        });

        queryClient.setQueryData(key, updated);
      });
    }, 800);

    return () => clearInterval(interval);
  }, [queryClient]);
}
