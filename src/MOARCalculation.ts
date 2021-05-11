import { CalculateLiquidityArgs } from "./MOARCalculationTypes";
import { evaluate, compare } from "mathjs";

/**
 * Calculates the Account liquidity
 * This method performs exactly the same operations as in MOAR comptroller liquidity calculation
 * @return liquidity - liquidity of an Account
 * @param liquidityArgs - object containing required Account data
 */
export function calculateLiquidity(liquidityArgs: CalculateLiquidityArgs): string {
    let sumCollateral = '0';
    let sumBorrowsPlusEffects = '0';

    liquidityArgs.assets.forEach(asset => {
        let tokensToDenom = evaluate(`${asset.collateralFactor} * ${asset.exchangeRate} * ${asset.underlyingPrice}`);
        sumCollateral = evaluate(`${sumCollateral} + ${tokensToDenom} * ${asset.cTokenBalance}`);

        asset.cProtections.forEach(cProtection => {
            if (isProtectionAlive(cProtection.expirationTimestamp, cProtection.maturityWindow) && compare(cProtection.lockedValue, 0) === 1) {
                sumCollateral = evaluate(`${sumCollateral} - (${cProtection.lockedValue} * ${asset.collateralFactor})`);
                sumCollateral = evaluate(`${sumCollateral} + ${cProtection.lockedValue}`);

                let markToMarket = '0';
                if (compare(asset.underlyingPrice, cProtection.strike) === 1) {
                    let lockedAmount = evaluate(`${cProtection.lockedValue} / ${cProtection.strike}`);
                    markToMarket = evaluate(`(${asset.underlyingPrice} - ${cProtection.strike}) * ${lockedAmount} * ${asset.collateralFactor}`);
                }
                sumCollateral = evaluate(`${sumCollateral} + ${markToMarket}`);
            }
        })
        sumBorrowsPlusEffects = evaluate(`${sumBorrowsPlusEffects} + (${asset.underlyingPrice} * ${asset.storedBorrowBalance})`);
    })
    return evaluate(`${sumCollateral} - ${sumBorrowsPlusEffects}`);
}

/**
 * Checks if the given CProtection is not outdated
 * @param expirationTimestamp - the cProtection expiration timestamp
 * @param maturityWindow - the maturity window of cProtection as defined in Comptroller
 * @return isAlive - boolean, true when the protection is not outdated
 */
export function isProtectionAlive(expirationTimestamp: string, maturityWindow: string): boolean {
    return compare(evaluate(`${expirationTimestamp} - ${maturityWindow}`), ~~(Date.now()/1000)) === 1;
}