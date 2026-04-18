export interface MockUser {
  totalAssets: number;
  dailyEarnings: number;
  dailyEarningsPercent: number;
  currency: string;
  username: string;
  avatarFallback: string;
}

export const mockUser: MockUser = {
  totalAssets: 10285.32,
  dailyEarnings: 128.45,
  dailyEarningsPercent: 1.26,
  currency: "USD",
  username: "Snoopy",
  avatarFallback: "SN",
};
