import { useQuery } from "@tanstack/react-query";
import { fetchTokens } from "../lib/fetcher";
import type { Token } from "@/types/token";

export function useTokens() {
  return useQuery<Token[]>({
    queryKey: ["tokens"],
    queryFn: () => fetchTokens(),
    staleTime: 1000 * 60 * 1, // 1 min
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
}
