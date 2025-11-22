"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTokens } from "../lib/fetcher";
import type { Token } from "@/types/token";

export function useTokens(tab: string) {
  return useQuery<Token[]>({
    queryKey: ["tokens", tab],
    queryFn: () => fetchTokens(tab),
    staleTime: 1000 * 60 * 1, // 1 min
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
}
