"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Token } from "@/types/token";

export function useWebSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const interval = setInterval(() => {
      const tabs = ["New pairs", "Final Stretch", "Migrated"];

      tabs.forEach((tab) => {
        const key = ["tokens", tab];
        const list = queryClient.getQueryData<Token[]>(key);
        if (!list) return;

        const updated = list.map((t) => {
          const priceFactor = 1 + (Math.random() - 0.5) * 0.04; // ±4%
          const nextPrice = t.CurrentPrice * priceFactor;

          return {
            ...t,

            // Price change
            CurrentPrice: Number(nextPrice.toFixed(4)),
            change: Number(
              (((nextPrice - t.CurrentPrice) / t.CurrentPrice) * 100).toFixed(2)
            ),

            // Sparkline
            ChartData: [...t.ChartData.slice(1), nextPrice],

            // REALISTIC volume change: ±10%
            Volume: Math.max(
              50,
              Math.floor(t.Volume * (1 + (Math.random() - 0.5) * 0.1))
            ),

            // REALISTIC liquidity: ±5%
            liquidity: Math.max(
              50,
              Math.floor(t.liquidity * (1 + (Math.random() - 0.5) * 0.05))
            ),

            // Holders grow slowly
            Holders: t.Holders + Math.floor(Math.random() * 5),

            // Snipers/Insiders/Bundlers wiggle slightly
            Snipers: Math.max(0, t.Snipers + Math.round((Math.random() - 0.5) * 2)),
            Insiders: Math.max(0, t.Insiders + Math.round((Math.random() - 0.5) * 1)),
            Bundlers: Math.max(0, t.Bundlers + Math.round((Math.random() - 0.5) * 2)),

            // Dev & top10 fluctuate slightly
            DevHoldings: Number(
              (t.DevHoldings + (Math.random() - 0.5) * 0.5).toFixed(2)
            ),
            Top10Holders: Number(
              (t.Top10Holders + (Math.random() - 0.5) * 0.5).toFixed(2)
            ),

            // Bonding wiggles
            bonding: Math.min(
              100,
              Math.max(0, t.bonding + Math.round((Math.random() - 0.5) * 4))
            ),

            // Activity
            lastOnline: Math.max(1, Math.floor(Math.random() * 120)),
          };
        });

        queryClient.setQueryData(key, updated);
      });
    }, 900);

    return () => clearInterval(interval);
  }, [queryClient]);
}
  