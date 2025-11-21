import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { tickSparkline } from "@/utils/generateToken";
import type { Token } from "@/types/token";

export function useWebSocket(interval = 900) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const timer = setInterval(() => {
      queryClient.setQueryData(["tokens"], (prev: Token[] | undefined) => {
        if (!prev) return prev;

        return prev.map((token) => {
          // Smooth price movement
          const updatedChart = tickSparkline([...token.ChartData]);
          const first = updatedChart[0];
          const last = updatedChart[updatedChart.length - 1];

          return {
            ...token,
            ChartData: updatedChart,
            CurrentPrice: Number(last.toFixed(4)),
            change: Number((((last - first) / first) * 100).toFixed(2)),
          };
        });
      });
    }, interval);

    return () => clearInterval(timer);
  }, [queryClient, interval]);
}
