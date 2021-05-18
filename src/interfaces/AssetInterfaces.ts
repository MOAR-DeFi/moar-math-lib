import { LiquidityArgs } from './LiquidityInterfaces';

export interface DepositArgs {
    cTokenBalance: string;
    marketExchangeRate: string;
}

export interface DepositValueArgs extends DepositArgs {
    price: string;
}

export interface BorrowArgs {
    storedBorrowBalance: string;
    marketBorrowIndex: string;
    accountBorrowIndex: string;
}

export interface BorrowValueArgs extends BorrowArgs {
    price: string;
}

export interface UtilizationArgs {
    cash: string;
    totalBorrows: string;
    reserves: string;
}

export interface InterestModel {
    multiplierPerBlock: string;
    baseRatePerBlock: string;
    jumpMultiplierPerBlock: string;
    kink: string;
}

export interface BorrowRatePerBlockArgs {
    utilization: string | UtilizationArgs;
    interestModel: InterestModel;
}

export interface SupplyRatePerBlockArgs extends BorrowRatePerBlockArgs {
    reserveFactor: string;
}

export interface BorrowApyArgs {
    borrowRatePerYear: string | BorrowRatePerBlockArgs;
}

export interface SupplyApyArgs {
    supplyRatePerYear: string | SupplyRatePerBlockArgs;
}

export interface NetApyArgs {
    deposits: {
        supplyApy: string | SupplyApyArgs;
        value: string | DepositValueArgs;
    }[];
    borrows: {
        borrowApy: string | BorrowApyArgs;
        value: string | BorrowValueArgs;
    }[];
}

export interface MarketSizeArgs {
    totalSupply: string;
    exchangeRate: string;
}

export interface MarketSizeValueArgs extends MarketSizeArgs {
    price: string;
}

export interface MarketTotalBorrowedArgs {
    totalBorrows: string;
}

export interface MarketTotalBorrowedValueArgs extends MarketTotalBorrowedArgs {
    price: string;
}

export interface LoanToValueArgs {
    totalBorrows: string | BorrowValueArgs[];
    liquidity: string | LiquidityArgs;
}

export interface ValueLockedByCopsAndBorrows {
    depositValue: string | DepositValueArgs;
    liquidity: string | LiquidityArgs;
}
