import { MaxOptimizableValueArgs } from './AssetInterfaces';

export interface CopTotalValueArgs {
    strike: string;
    amount: string;
}

export interface CopMaxLockableValueArgs {
    cop: {
        strike: string;
        amount: string;
        lockedValue: string;
    };
    assetMaxOptimizableValue: string | MaxOptimizableValueArgs;
}
