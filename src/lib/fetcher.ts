import { generateTokenList } from "@/utils/generateToken";

export async function fetchTokens(tab: string) {
  const all = await generateTokenList(100);

  if (tab === "New pairs") return all.slice(0, 30);
  if (tab === "Final Stretch") return all.slice(30, 60);
  if (tab === "Migrated") return all.slice(60, 100);

  return all;
}

