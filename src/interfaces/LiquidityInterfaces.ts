export interface LiquidityArgs {
    assets: {
        cTokenBalance: string;
        storedBorrowBalance: string;
        exchangeRate: string;
        underlyingPrice: string;
        collateralFactor: string;
        cProtections: {
            strike: string;
            amount: string;
            lockedValue: string;
            expirationTimestamp: string;
            maturityWindow: string;
        }[];
    }[];
}
