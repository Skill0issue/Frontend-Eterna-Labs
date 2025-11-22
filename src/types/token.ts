export type Token = {
    // Filters
    id : string,
    hidden: boolean,
    Protocol: string,
    
    // Identity
    name: string,
    symbol: string,
    logo: string,

    // Basic Info
    lastOnline: number,
    isVerified: boolean,

    // social Links
    Twitter: string,
    copyUrl:string,

    //synthetic data
    length: number,
    start: number,
    volatility : number,
    bonding: number;

    // statistics
    CurrentPrice: number,
    change: number,
    ChartData: number[],

    // Market Data
    liquidity: number,
    Volume: number,
    
    // TXNS
    Holders: number,
    Buyers : number,
    Sellers: number,

    // Token Info
    Top10Holders: number,
    DevHoldings: number,
    Snipers : number,
    Insiders: number,
    Bundlers: number,
    DexPaid: "Unpaid" | "Paid",
    watchers: number,
    holders24h: number,

    canBuy: boolean
}