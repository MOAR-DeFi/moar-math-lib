import { CalculateLiquidityArgs } from '../MOARCalculationTypes'

export const calculateLiquidityBasicAccount : CalculateLiquidityArgs = {
    assets: [
        {
        cTokenBalance: "8",
        storedBorrowBalance: "0",
        underlyingAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
        exchangeRate: "0.5",
        underlyingPrice: "1500",
        collateralFactor: "0.5",
        cProtections: []
        },
        {
        cTokenBalance: "178",
        storedBorrowBalance: "0",
        underlyingAddress: "0x49f86aeb1fabd5446bfa584a122a1939695eedda",
        exchangeRate: "1",
        underlyingPrice: "1",
        collateralFactor: "1",
        cProtections: []
        }
    ]
}

export const calculateLiquidityBasicAccountWithCOPs : CalculateLiquidityArgs = {
    assets: [
        {
            cTokenBalance: "8",
            storedBorrowBalance: "0",
            underlyingAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
            exchangeRate: "0.5",
            underlyingPrice: "1500",
            collateralFactor: "0.5",
            cProtections: [
               {
                    id: "234934423",
                    amount: "100",
                    expirationTimestamp: "1620927416",
                    maturityWindow: "10800",
                    lockedValue: "1500",
                    strike: "1800",
                    underlyingAsset: "0xc778417e063141139fce010982780140aa0cd5ab",
                }
            ]
        },
        {
            cTokenBalance: "178",
            storedBorrowBalance: "0",
            underlyingAddress: "0x49f86aeb1fabd5446bfa584a122a1939695eedda",
            exchangeRate: "1",
            underlyingPrice: "1",
            collateralFactor: "1",
            cProtections: []
        },
    ]
}

export const calculateLiquidityBasicAccountWithOutdatedCOP : CalculateLiquidityArgs = {
    assets: [
        {
            cTokenBalance: "8",
            storedBorrowBalance: "0",
            underlyingAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
            exchangeRate: "0.5",
            underlyingPrice: "1500",
            collateralFactor: "0.5",
            cProtections: [
                {
                    id: "234934423",
                    amount: "100",
                    expirationTimestamp: "1120927416",
                    maturityWindow: "10800",
                    lockedValue: "1500",
                    strike: "1800",
                    underlyingAsset: "0xc778417e063141139fce010982780140aa0cd5ab",
                }
            ]
        },
        {
            cTokenBalance: "178",
            storedBorrowBalance: "0",
            underlyingAddress: "0x49f86aeb1fabd5446bfa584a122a1939695eedda",
            exchangeRate: "1",
            underlyingPrice: "1",
            collateralFactor: "1",
            cProtections: []
        },
    ]
}

export const calculateLiquidityBasicAccountWithCOPsWithBorrow : CalculateLiquidityArgs = {
    assets: [
        {
            cTokenBalance: "8",
            storedBorrowBalance: "0",
            underlyingAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
            exchangeRate: "0.5",
            underlyingPrice: "1500",
            collateralFactor: "0.5",
            cProtections: [
                {
                    id: "234934423",
                    amount: "100",
                    expirationTimestamp: "1620927416",
                    maturityWindow: "10800",
                    lockedValue: "1500",
                    strike: "1800",
                    underlyingAsset: "0xc778417e063141139fce010982780140aa0cd5ab",
                }
            ]
        },
        {
            cTokenBalance: "178",
            storedBorrowBalance: "120",
            underlyingAddress: "0x49f86aeb1fabd5446bfa584a122a1939695eedda",
            exchangeRate: "1",
            underlyingPrice: "1",
            collateralFactor: "1",
            cProtections: []
        },
    ]
}

export const calculateLiquidityBasicAccountWithCOPNotLocked : CalculateLiquidityArgs = {
    assets: [
        {
            cTokenBalance: "8",
            storedBorrowBalance: "0",
            underlyingAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
            exchangeRate: "0.5",
            underlyingPrice: "1500",
            collateralFactor: "0.5",
            cProtections: [
                {
                    id: "234934423",
                    amount: "100",
                    expirationTimestamp: "2620927416",
                    maturityWindow: "10800",
                    lockedValue: "0",
                    strike: "1800",
                    underlyingAsset: "0xc778417e063141139fce010982780140aa0cd5ab",
                }
            ]
        },
        {
            cTokenBalance: "178",
            storedBorrowBalance: "0",
            underlyingAddress: "0x49f86aeb1fabd5446bfa584a122a1939695eedda",
            exchangeRate: "1",
            underlyingPrice: "1",
            collateralFactor: "1",
            cProtections: []
        },
    ]
}

export const calculateLiquidityBasicAccountWithCOPMTM : CalculateLiquidityArgs = {
    assets: [
        {
            cTokenBalance: "8",
            storedBorrowBalance: "0",
            underlyingAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
            exchangeRate: "0.5",
            underlyingPrice: "2000",
            collateralFactor: "0.5",
            cProtections: [
                {
                    id: "234934423",
                    amount: "100",
                    expirationTimestamp: "2620927416",
                    maturityWindow: "10800",
                    lockedValue: "1500",
                    strike: "1800",
                    underlyingAsset: "0xc778417e063141139fce010982780140aa0cd5ab",
                }
            ]
        },
        {
            cTokenBalance: "178",
            storedBorrowBalance: "0",
            underlyingAddress: "0x49f86aeb1fabd5446bfa584a122a1939695eedda",
            exchangeRate: "1",
            underlyingPrice: "1",
            collateralFactor: "1",
            cProtections: []
        },
    ]
}


export const calculateLiquidityBasicAccountMultipleCOPsMultipleBorrows : CalculateLiquidityArgs = {
    assets: [
        {
            cTokenBalance: "8",
            storedBorrowBalance: "0",
            underlyingAddress: "0xc778417e063141139fce010982780140aa0cd5ab",
            exchangeRate: "0.5",
            underlyingPrice: "1500",
            collateralFactor: "0.5",
            cProtections: [
                {
                    id: "234934423",
                    amount: "100",
                    expirationTimestamp: "2620927416",
                    maturityWindow: "10800",
                    lockedValue: "1500",
                    strike: "1800",
                    underlyingAsset: "0xc778417e063141139fce010982780140aa0cd5ab",
                }
            ]
        },
        {
            cTokenBalance: "178",
            storedBorrowBalance: "120",
            underlyingAddress: "0x49f86aeb1fabd5446bfa584a122a1939695eedda",
            exchangeRate: "1",
            underlyingPrice: "1",
            collateralFactor: "1",
            cProtections: []
        },
        {
            cTokenBalance: "4000",
            storedBorrowBalance: "0",
            underlyingAddress: "0x893e750d21562a73e916f0f267004cbbddd36f05",
            exchangeRate: "0.25",
            underlyingPrice: "25",
            collateralFactor: "0.6",
            cProtections: [
                {
                    id: "7647646764",
                    amount: "60",
                    expirationTimestamp: "2620927416",
                    maturityWindow: "10800",
                    lockedValue: "1800",
                    strike: "30",
                    underlyingAsset: "0x893e750d21562a73e916f0f267004cbbddd36f05",
                }
            ]
        },
        {
            cTokenBalance: "0",
            storedBorrowBalance: "1000",
            underlyingAddress: "0x5fa9197f8abba8021ba95375c83f2c5254c7e3ff",
            exchangeRate: "1",
            underlyingPrice: "0.09",
            collateralFactor: "0.75",
            cProtections: []
        },
    ]
}