import { LiquidityArgs } from '../interfaces/LiquidityInterfaces';

export const calculateLiquidityBasicAccount: LiquidityArgs = {
    assets: [
        {
            cTokenBalance: '8',
            storedBorrowBalance: '0',
            exchangeRate: '0.5',
            underlyingPrice: '1500',
            collateralFactor: '0.5',
            enteredMarket: true,
            marketBorrowIndex: '1',
            accountBorrowIndex: '0',
            cProtections: [],
        },
        {
            cTokenBalance: '178',
            storedBorrowBalance: '0',
            exchangeRate: '1',
            underlyingPrice: '1',
            collateralFactor: '1',
            enteredMarket: true,
            marketBorrowIndex: '1',
            accountBorrowIndex: '0',
            cProtections: [],
        },
    ],
};

export const calculateLiquidityBasicAccountNotEnteredMarkets: LiquidityArgs = {
    assets: [
        {
            cTokenBalance: '8',
            storedBorrowBalance: '0',
            exchangeRate: '0.5',
            underlyingPrice: '1500',
            collateralFactor: '0.5',
            enteredMarket: false,
            marketBorrowIndex: '1',
            accountBorrowIndex: '1',
            cProtections: [],
        },
        {
            cTokenBalance: '178',
            storedBorrowBalance: '0',
            exchangeRate: '1',
            underlyingPrice: '1',
            collateralFactor: '1',
            enteredMarket: false,
            marketBorrowIndex: '1',
            accountBorrowIndex: '1',
            cProtections: [],
        },
    ],
};

export const calculateLiquidityBasicAccountWithCOPs: LiquidityArgs = {
    assets: [
        {
            cTokenBalance: '8',
            storedBorrowBalance: '0',
            exchangeRate: '0.5',
            underlyingPrice: '1500',
            collateralFactor: '0.5',
            enteredMarket: true,
            marketBorrowIndex: '1',
            accountBorrowIndex: '1',
            cProtections: [
                {
                    amount: '100',
                    expirationTimestamp: (Math.floor(Date.now() / 1000) + 1000000).toString(),
                    maturityWindow: '10800',
                    lockedValue: '1500',
                    strike: '1800',
                },
            ],
        },
        {
            cTokenBalance: '178',
            storedBorrowBalance: '0',
            exchangeRate: '1',
            underlyingPrice: '1',
            collateralFactor: '1',
            enteredMarket: true,
            marketBorrowIndex: '1',
            accountBorrowIndex: '1',
            cProtections: [],
        },
    ],
};

export const calculateLiquidityBasicAccountWithOutdatedCOP: LiquidityArgs = {
    assets: [
        {
            cTokenBalance: '8',
            storedBorrowBalance: '0',
            exchangeRate: '0.5',
            underlyingPrice: '1500',
            collateralFactor: '0.5',
            enteredMarket: true,
            marketBorrowIndex: '1',
            accountBorrowIndex: '1',
            cProtections: [
                {
                    amount: '100',
                    expirationTimestamp: '1120927416',
                    maturityWindow: '10800',
                    lockedValue: '1500',
                    strike: '1800',
                },
            ],
        },
        {
            cTokenBalance: '178',
            storedBorrowBalance: '0',
            exchangeRate: '1',
            underlyingPrice: '1',
            collateralFactor: '1',
            enteredMarket: true,
            marketBorrowIndex: '1',
            accountBorrowIndex: '1',
            cProtections: [],
        },
    ],
};

export const calculateLiquidityBasicAccountWithCOPsWithBorrow: LiquidityArgs = {
    assets: [
        {
            cTokenBalance: '8',
            storedBorrowBalance: '0',
            exchangeRate: '0.5',
            underlyingPrice: '1500',
            collateralFactor: '0.5',
            enteredMarket: true,
            marketBorrowIndex: '1',
            accountBorrowIndex: '1',
            cProtections: [
                {
                    amount: '100',
                    expirationTimestamp: (Math.floor(Date.now() / 1000) + 1000000).toString(),
                    maturityWindow: '10800',
                    lockedValue: '1500',
                    strike: '1800',
                },
            ],
        },
        {
            cTokenBalance: '178',
            storedBorrowBalance: '120',
            exchangeRate: '1',
            underlyingPrice: '1',
            collateralFactor: '1',
            enteredMarket: true,
            marketBorrowIndex: '1',
            accountBorrowIndex: '1',
            cProtections: [],
        },
    ],
};

export const calculateLiquidityBasicAccountWithCOPNotLocked: LiquidityArgs = {
    assets: [
        {
            cTokenBalance: '8',
            storedBorrowBalance: '0',
            exchangeRate: '0.5',
            underlyingPrice: '1500',
            collateralFactor: '0.5',
            enteredMarket: true,
            marketBorrowIndex: '1',
            accountBorrowIndex: '1',
            cProtections: [
                {
                    amount: '100',
                    expirationTimestamp: (Math.floor(Date.now() / 1000) + 1000000).toString(),
                    maturityWindow: '10800',
                    lockedValue: '0',
                    strike: '1800',
                },
            ],
        },
        {
            cTokenBalance: '178',
            storedBorrowBalance: '0',
            exchangeRate: '1',
            underlyingPrice: '1',
            collateralFactor: '1',
            enteredMarket: true,
            marketBorrowIndex: '1',
            accountBorrowIndex: '1',
            cProtections: [],
        },
    ],
};

export const calculateLiquidityBasicAccountWithCOPMTM: LiquidityArgs = {
    assets: [
        {
            cTokenBalance: '8',
            storedBorrowBalance: '0',
            exchangeRate: '0.5',
            underlyingPrice: '2000',
            collateralFactor: '0.5',
            enteredMarket: true,
            marketBorrowIndex: '1',
            accountBorrowIndex: '1',
            cProtections: [
                {
                    amount: '100',
                    expirationTimestamp: (Math.floor(Date.now() / 1000) + 1000000).toString(),
                    maturityWindow: '10800',
                    lockedValue: '1500',
                    strike: '1800',
                },
            ],
        },
        {
            cTokenBalance: '178',
            storedBorrowBalance: '0',
            exchangeRate: '1',
            underlyingPrice: '1',
            collateralFactor: '1',
            enteredMarket: true,
            marketBorrowIndex: '1',
            accountBorrowIndex: '1',
            cProtections: [],
        },
    ],
};

export const calculateLiquidityBasicAccountMultipleCOPsMultipleBorrows: LiquidityArgs = {
    assets: [
        {
            cTokenBalance: '8',
            storedBorrowBalance: '0',
            exchangeRate: '0.5',
            underlyingPrice: '1500',
            collateralFactor: '0.5',
            enteredMarket: true,
            marketBorrowIndex: '1',
            accountBorrowIndex: '1',
            cProtections: [
                {
                    amount: '100',
                    expirationTimestamp: (Math.floor(Date.now() / 1000) + 1000000).toString(),
                    maturityWindow: '10800',
                    lockedValue: '1500',
                    strike: '1800',
                },
            ],
        },
        {
            cTokenBalance: '178',
            storedBorrowBalance: '120',
            exchangeRate: '1',
            underlyingPrice: '1',
            collateralFactor: '1',
            enteredMarket: true,
            marketBorrowIndex: '1',
            accountBorrowIndex: '1',
            cProtections: [],
        },
        {
            cTokenBalance: '4000',
            storedBorrowBalance: '0',
            exchangeRate: '0.25',
            underlyingPrice: '25',
            collateralFactor: '0.6',
            enteredMarket: true,
            marketBorrowIndex: '1',
            accountBorrowIndex: '1',
            cProtections: [
                {
                    amount: '60',
                    expirationTimestamp: (Math.floor(Date.now() / 1000) + 1000000).toString(),
                    maturityWindow: '10800',
                    lockedValue: '1800',
                    strike: '30',
                },
            ],
        },
        {
            cTokenBalance: '0',
            storedBorrowBalance: '1000',
            exchangeRate: '1',
            underlyingPrice: '0.09',
            collateralFactor: '0.75',
            enteredMarket: true,
            marketBorrowIndex: '1',
            accountBorrowIndex: '1',
            cProtections: [],
        },
    ],
};
