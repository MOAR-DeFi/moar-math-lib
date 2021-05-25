import { mathjs, bignumber } from '../mathjs';
import { CopMaxLockableValueArgs, CopTotalValueArgs } from '../interfaces/CopInterfaces';
import { maxOptimizableValue } from './AssetCalculations';
import { min } from './GenericCalculations';

export function copTotalValue(copTotalValueArgs: CopTotalValueArgs): string {
    const result = bignumber(copTotalValueArgs.strike).mul(copTotalValueArgs.amount);
    return mathjs.format(result, { notation: 'fixed' });
}

export function copMaxLockableValue(args: CopMaxLockableValueArgs): string {
    if (typeof args.assetMaxOptimizableValue === 'object') {
        args.assetMaxOptimizableValue = maxOptimizableValue(args.assetMaxOptimizableValue).toString();
    }
    return min([
        bignumber(
            copTotalValue({
                strike: args.cop.strike,
                amount: args.cop.amount,
            })
        )
            .sub(args.cop.lockedValue)
            .toString(),
        args.assetMaxOptimizableValue,
    ]);
}
