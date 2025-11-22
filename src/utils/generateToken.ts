import type { Token } from "@/types/token";
import { random } from "./random";
import { generateSparkline } from "./sparklinegen";
import { randomLogoSymbol } from "./namegen";

const NAMES = [
  "enemy","toast","orbit","nova","mirai","onyx","aster","pyro","flux","vexon","ripple","warp","pixel","fury","zenith",
];

export function generateToken(): Token {
  const id = crypto.randomUUID();
  const name = random.pick(NAMES);
  const { symbol, logo } = randomLogoSymbol(name);

  // realistic sparkline length & starting price
  const length = random.int(30, 80);
  const start = Number(random.float(0.01, 2, 4).toFixed(4));
  const volatility = Number(random.float(0.01, 0.12, 4)); // volatility range

  const ChartData = generateSparkline(length, start, volatility);

  const first = ChartData[0];
  const last = ChartData[ChartData.length - 1];
  const CurrentPrice = Number(last.toFixed(4));
  const change = Number((((last - first) / first) * 100).toFixed(2));

  // realistic liquidity/volume ranges
  const liquidity = random.int(10_000, 5_000_000);
  const Volume = random.int(1_000, 2_000_000);

  return {
    id,
    hidden: random.bool(0.08),
    Protocol: random.bool(0.6) ? "Solana" : "Ethereum",
    name,
    symbol,
    logo,
    lastOnline: random.int(1, 120),
    isVerified: random.bool(0.25),
    Twitter: `https://twitter.com/${name}`,
    copyUrl: `https://token.com/${id}`,

    length,
    start,
    volatility,

    CurrentPrice,
    change,
    ChartData,

    liquidity,
    Volume,

    Holders: random.int(100, 20000),
    Buyers: random.int(1, 500),
    Sellers: random.int(1, 400),

    Top10Holders: Number(random.float(5, 70).toFixed(2)),
    DevHoldings: Number(random.float(0.5, 25).toFixed(2)),
    Snipers: random.int(0, 40),
    Insiders: random.int(0, 30),
    Bundlers: random.int(0, 50),
    bonding: random.int(0, 100),
    DexPaid: random.bool(0.3) ? "Paid" : "Unpaid",

    watchers: random.int(10, 2000),
    holders24h: random.int(1, 500),

    canBuy: true,
  };
}

export async function generateTokenList(count: number): Promise<Token[]> {
  return Array.from({ length: count }, () => generateToken());
}

export function tickSparkline(spark: number[], volatility = 0.04) {
  // small realistic walk with volatility influence
  const last = spark[spark.length - 1] ?? 0.01;
  const rnd = (Math.random() - 0.5) * 2; // -1..1
  const shock = Math.exp((rnd * volatility)); // log-normal style step
  const next = Math.max(0.0001, Number((last * shock).toFixed(6)));
  const nextArr = [...spark.slice(1), next];
  return nextArr;
}
