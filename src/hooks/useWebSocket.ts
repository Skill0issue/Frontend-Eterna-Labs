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

        // Update ALL tokens
        const updated = list.map((token) => {
          const nextPrice =
            token.CurrentPrice * (1 + (Math.random() - 0.5) * 0.02); // ±2% change

          return {
            ...token,
            CurrentPrice: Number(nextPrice.toFixed(4)),
            change: Number(((Math.random() - 0.5) * 8).toFixed(2)), // random -4% to +4%
            ChartData: [...token.ChartData.slice(1), nextPrice],
          };
        });

        queryClient.setQueryData(key, updated);
      });
    }, 900);

    return () => clearInterval(interval);
  }, [queryClient]);
}
