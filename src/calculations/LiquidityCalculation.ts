import { evaluate, compare } from 'mathjs';
import { LiquidityArgs } from '../interfaces/LiquidityInterfaces';
import { depositValue, borrowValue } from './AssetCalculations';

/**
 * Calculates the Account liquidity
 * This method performs exactly the same operations as in MOAR comptroller liquidity calculation
 * @return liquidity - liquidity of an Account
 * @param liquidityArgs - object containing required Account data
 */
 export function liquidity(liquidityArgs: LiquidityArgs): string {
    let sumCollateral = '0';
    let sumBorrowsPlusEffects = '0';

    liquidityArgs.assets.forEach((asset) => {
        if (asset.enteredMarket) {
            sumCollateral = evaluate(`${sumCollateral} + ${asset.collateralFactor} * ${depositValue({
                price: asset.underlyingPrice,
                cTokenBalance: asset.cTokenBalance,
                marketExchangeRate: asset.exchangeRate
            })}`);
            //todo: create separate file for C-OP related math
            asset.cProtections.forEach((cProtection) => {
                if (
                    isProtectionAlive(cProtection.expirationTimestamp, cProtection.maturityWindow) &&
                    compare(cProtection.lockedValue, 0) === 1
                ) {

                    sumCollateral = evaluate(`${sumCollateral} - (${cProtection.lockedValue} * ${asset.collateralFactor})`);
                    sumCollateral = evaluate(`${sumCollateral} + ${cProtection.lockedValue}`);

                    let markToMarket = '0';
                    if (compare(asset.underlyingPrice, cProtection.strike) === 1) {
                        const lockedAmount = evaluate(`${cProtection.lockedValue} / ${cProtection.strike}`);
                        markToMarket = evaluate(
                            `(${asset.underlyingPrice} - ${cProtection.strike}) * ${lockedAmount} * ${asset.collateralFactor}`
                        );
                    }
                    sumCollateral = evaluate(`${sumCollateral} + ${markToMarket}`);
                }
            });
            sumBorrowsPlusEffects = evaluate(
                `${sumBorrowsPlusEffects} + (${borrowValue({
                    price: asset.underlyingPrice,
                    storedBorrowBalance: asset.storedBorrowBalance,
                    marketBorrowIndex: asset.marketBorrowIndex,
                    accountBorrowIndex: asset.accountBorrowIndex
                })})`
            );
        }
    });
    return evaluate(`${sumCollateral} - ${sumBorrowsPlusEffects}`);
}

export function totalLiquidity(liquidityArgs: LiquidityArgs): string{
    const dataSetWithoutBorrows: LiquidityArgs = {assets: []}
    for(let i=0; i< liquidityArgs.assets.length; i++) {
        dataSetWithoutBorrows.assets.push(Object.assign({}, liquidityArgs.assets[i]))
        dataSetWithoutBorrows.assets[i].storedBorrowBalance = '0'
    }
    return liquidity(dataSetWithoutBorrows)
}

export function capacityUsed(liquidityArgs: LiquidityArgs): string{
    const totalLiquidityResult = totalLiquidity(liquidityArgs)
    return evaluate(`(${totalLiquidityResult} - ${liquidity(liquidityArgs)}) / ${totalLiquidityResult}`)
}

/**
 * Checks if the given CProtection is not outdated
 * @param expirationTimestamp - the cProtection expiration timestamp
 * @param maturityWindow - the maturity window of cProtection as defined in Comptroller
 * @return isAlive - boolean, true when the protection is not outdated
 */
export function isProtectionAlive(expirationTimestamp: string, maturityWindow: string): boolean {
    return compare(evaluate(`${expirationTimestamp} - ${maturityWindow}`), ~~(Date.now() / 1000)) === 1;
}