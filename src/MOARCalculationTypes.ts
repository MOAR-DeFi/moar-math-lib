export interface CalculateLiquidityArgs {
  assets: {
    cTokenBalance?: string;
    storedBorrowBalance?: string;
    underlyingAddress?: string;
    exchangeRate?: string;
    underlyingPrice?: string;
    collateralFactor?: string;
    cProtections?: {
      id?: string;
      strike?: string;
      amount?: string;
      lockedValue?: string;
      expirationTimestamp?: string;
      underlyingAsset?: string;
      maturityWindow?: string;
    }[]
  }[]
}