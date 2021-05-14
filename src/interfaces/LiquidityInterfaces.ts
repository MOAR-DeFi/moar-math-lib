export interface LiquidityArgs {
    assets: {
        cTokenBalance: string;
        storedBorrowBalance: string;
        exchangeRate: string;
        underlyingPrice: string;
        collateralFactor: string;
        enteredMarket: boolean;
        marketBorrowIndex: string;
        accountBorrowIndex: string;
        cProtections: {
            strike: string;
            amount: string;
            lockedValue: string;
            expirationTimestamp: string;
            maturityWindow: string;
        }[];
    }[];
}
