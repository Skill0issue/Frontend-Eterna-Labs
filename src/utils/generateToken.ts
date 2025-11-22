import type { Token } from "@/types/token";
import { random } from "./random";
import { generateSparkline } from "./sparklinegen";
import { randomLogoSymbol } from "./namegen";

const NAMES = [
  "enemy",
  "toast",
  "orbit",
  "nova",
  "mirai",
  "onyx",
  "aster",
  "pyro",
  "flux",
  "vexon",
  "ripple",
  "warp",
  "pixel",
  "fury",
  "zenith",
];

export function generateToken(): Token {
  const id = crypto.randomUUID();
  const name = random.pick(NAMES);
  const { symbol, logo } = randomLogoSymbol(name);

  //sparkline
  const length = random.int(25, 60);
  const start = random.float(0.0001, 5, 4);
  const volatility = random.float(0.02, 0.08, 3);

  const ChartData = generateSparkline(length, start, volatility);

  const first = ChartData[0];
  const last = ChartData[ChartData.length - 1];

  const CurrentPrice = Number(last.toFixed(4));
  const change = Number((((last - first) / first) * 100).toFixed(2));

  return {
    id,
    hidden: random.bool(0.1),
    Protocol: random.bool(0.5) ? "Solana" : "Ethereum",
    name,
    symbol,
    logo,
    lastOnline: random.int(1, 120),
    isVerified: random.bool(0.3),
    Twitter: `https://twitter.com/${name}`,
    copyUrl: `https://token.com/${id}`,

    length,
    start,
    volatility,

    CurrentPrice,
    change,
    ChartData,

    liquidity: random.int(5_000, 500_000),
    Volume: random.int(2_000, 2_000_000),

    Holders: random.int(50, 30000),
    Buyers: random.int(5, 500),
    Sellers: random.int(5, 400),

    Top10Holders: random.float(10, 90),
    DevHoldings: random.float(0.1, 20),
    Snipers: random.int(20, 50),
    Insiders: random.int(0, 30),
    Bundlers: random.int(0, 50),
    DexPaid: random.bool(0.3) ? "Paid" : "Unpaid",

    watchers: random.int(10, 2000),
    holders24h: random.int(5, 500),

    canBuy: true,
  };
}

export async function generateTokenList(count:number):Promise<Token[]>{
    return Array.from({length:count},()=>generateToken());
}

export function tickSparkline(spark: number[]) {
  const last = spark[spark.length - 1];
  const next = last * (1 + (Math.random() * 0.04 - 0.02)); // -2% to +2%
  spark.push(Number(next.toFixed(4)));
  spark.shift();
  return spark;
}
