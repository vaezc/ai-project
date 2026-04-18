export type CoinMarketCategory =
  | "favorites"
  | "hot"
  | "new"
  | "topGainers"
  | "newListed";

export interface MockCoin {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
  categories: CoinMarketCategory[];
  isFavorite?: boolean;
  listingCountdown?: string;
  listingStatusLabel?: string;
}

export const mockCoins: MockCoin[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 101023.66,
    change: 1.56,
    volume: "2.4B",
    categories: ["hot", "topGainers", "favorites", "newListed"],
    isFavorite: true,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 3284.52,
    change: 7.98,
    volume: "1.1B",
    categories: ["hot", "topGainers", "newListed"],
  },
  {
    symbol: "BNB",
    name: "BNB",
    price: 718.33,
    change: 0.31,
    volume: "456M",
    categories: ["hot", "newListed"],
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 129.98,
    change: -1.93,
    volume: "892M",
    categories: ["hot", "new", "topGainers", "newListed"],
  },
  {
    symbol: "XRP",
    name: "Ripple Credits",
    price: 3.981,
    change: 11.07,
    volume: "334M",
    categories: ["hot", "newListed"],
  },
  {
    symbol: "SHIB",
    name: "Shiba Inu",
    price: 0.00005789,
    change: 0.03,
    volume: "212M",
    categories: ["hot", "newListed"],
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.19079,
    change: 103.8,
    volume: "678M",
    categories: ["hot", "new", "topGainers", "favorites", "newListed"],
    isFavorite: true,
    listingCountdown: "2天 04:48:20",
    listingStatusLabel: "距结束",
  },
  {
    symbol: "LTC",
    name: "Litecoin",
    price: 65.55,
    change: 3.01,
    volume: "145M",
    categories: ["newListed"],
    listingCountdown: "3天 00:01:32",
    listingStatusLabel: "距结束",
  },
];

export function getCoinsByCategory(category: CoinMarketCategory) {
  return mockCoins.filter((coin) => coin.categories.includes(category));
}

export function getCoinsBySymbols(symbols: string[]) {
  return mockCoins.filter((coin) => symbols.includes(coin.symbol));
}

export function getFeaturedNewListings() {
  return mockCoins.filter((coin) => coin.listingCountdown);
}
