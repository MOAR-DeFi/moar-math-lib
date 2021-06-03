import { mathjs, bignumber } from '../mathjs';
import { LiquidityArgs } from '../interfaces/LiquidityInterfaces';
import { depositValue, borrowValue } from './AssetCalculations';

/**
 * Calculates the Account liquidity
 * This method performs exactly the same operations as in MOAR comptroller liquidity calculation
 * @return liquidity - liquidity of an Account
 * @param liquidityArgs - object containing required Account data
 */
export function liquidity(liquidityArgs: LiquidityArgs): string {
    let sumCollateral = bignumber('0');
    let sumBorrowsPlusEffects = bignumber('0');

    liquidityArgs.assets.forEach((asset) => {
        if (asset.enteredMarket) {
            sumCollateral = bignumber(
                depositValue({
                    price: asset.underlyingPrice,
                    cTokenBalance: asset.cTokenBalance,
                    marketExchangeRate: asset.exchangeRate,
                })
            )
                .mul(asset.collateralFactor)
                .add(sumCollateral);

            // todo: create separate file for C-OP related math
            asset.cProtections.forEach((cProtection) => {
                if (
                    isProtectionAlive(cProtection.expirationTimestamp, cProtection.maturityWindow) &&
                    mathjs.compare(cProtection.lockedValue, 0) === 1
                ) {
                    sumCollateral = sumCollateral
                        .sub(bignumber(cProtection.lockedValue).mul(asset.collateralFactor))
                        .add(cProtection.lockedValue);

                    let markToMarket = bignumber('0');
                    if (mathjs.compare(asset.underlyingPrice, cProtection.strike) === 1) {
                        const lockedAmount = bignumber(cProtection.lockedValue).div(cProtection.strike);
                        markToMarket = bignumber(asset.underlyingPrice)
                            .sub(cProtection.strike)
                            .mul(lockedAmount)
                            .mul(asset.collateralFactor);
                    }
                    sumCollateral = sumCollateral.add(markToMarket);
                }
            });
        }
        sumBorrowsPlusEffects = sumBorrowsPlusEffects.add(
            borrowValue({
                price: asset.underlyingPrice,
                storedBorrowBalance: asset.storedBorrowBalance,
                marketBorrowIndex: asset.marketBorrowIndex,
                accountBorrowIndex: asset.accountBorrowIndex,
            })
        );
    });
    const result = sumCollateral.sub(sumBorrowsPlusEffects);
    return mathjs.format(result, { notation: 'fixed' });
}

export function totalLiquidity(liquidityArgs: LiquidityArgs): string {
    const dataSetWithoutBorrows: LiquidityArgs = { assets: [] };
    for (let i = 0; i < liquidityArgs.assets.length; i++) {
        dataSetWithoutBorrows.assets.push({ ...liquidityArgs.assets[i] });
        dataSetWithoutBorrows.assets[i].storedBorrowBalance = '0';
    }
    return liquidity(dataSetWithoutBorrows);
}

export function capacityUsed(liquidityArgs: LiquidityArgs): string {
    const totalLiquidityResult = totalLiquidity(liquidityArgs);
    const result = bignumber(totalLiquidityResult).sub(liquidity(liquidityArgs)).div(totalLiquidityResult);
    return mathjs.format(result, { notation: 'fixed' });
}

/**
 * Checks if the given CProtection is not outdated
 * @param expirationTimestamp - the cProtection expiration timestamp
 * @param maturityWindow - the maturity window of cProtection as defined in Comptroller
 * @return isAlive - boolean, true when the protection is not outdated
 */
export function isProtectionAlive(expirationTimestamp: string, maturityWindow: string): boolean {
    return Number(mathjs.compare(bignumber(expirationTimestamp).sub(maturityWindow), ~~(Date.now() / 1000))) === 1;
}
