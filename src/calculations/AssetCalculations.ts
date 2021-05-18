import { mathjs, BigNumber, bignumber } from '../mathjs';
import {
    DepositArgs,
    BorrowArgs,
    DepositValueArgs,
    BorrowValueArgs,
    UtilizationArgs,
    SupplyRatePerBlockArgs,
    BorrowRatePerBlockArgs,
    BorrowApyArgs,
    SupplyApyArgs,
    NetApyArgs,
    MarketSizeArgs,
    MarketSizeValueArgs,
    MarketTotalBorrowedArgs,
    MarketTotalBorrowedValueArgs,
    LoanToValueArgs,
} from '../interfaces/AssetInterfaces';
import { liquidity } from './LiquidityCalculation';
import { LiquidityArgs } from '../interfaces/LiquidityInterfaces';

export function depositAmount(depositArgs: DepositArgs): string {
    const result = bignumber(depositArgs.cTokenBalance).mul(depositArgs.marketExchangeRate);
    return mathjs.format(result, { notation: 'fixed' });
}

export function depositValue(depositArgs: DepositValueArgs): string {
    const result = bignumber(depositAmount(depositArgs)).mul(depositArgs.price);
    return mathjs.format(result, { notation: 'fixed' });
}

export function borrowAmount(borrowArgs: BorrowArgs): string {
    let result: BigNumber;
    if (mathjs.compare(borrowArgs.accountBorrowIndex, 0) === 1) {
        result = bignumber(borrowArgs.storedBorrowBalance)
            .mul(borrowArgs.marketBorrowIndex)
            .div(borrowArgs.accountBorrowIndex);
    } else {
        result = bignumber('0');
    }
    return mathjs.format(result, { notation: 'fixed' });
}

export function borrowValue(borrowArgs: BorrowValueArgs): string {
    const result = bignumber(borrowAmount(borrowArgs)).mul(borrowArgs.price);
    return mathjs.format(result, { notation: 'fixed' });
}

export function totalDepositsValue(totalDepositsArgs: DepositValueArgs[]): string {
    let result = bignumber('0');
    for (let i = 0; i < totalDepositsArgs.length; i++) {
        result = result.add(depositValue(totalDepositsArgs[i]));
    }
    return mathjs.format(result, { notation: 'fixed' });
}

export function totalBorrowsValue(totalBorrowsArgs: BorrowValueArgs[]): string {
    let result = bignumber('0');
    for (let i = 0; i < totalBorrowsArgs.length; i++) {
        result = result.add(borrowValue(totalBorrowsArgs[i]));
    }
    return mathjs.format(result, { notation: 'fixed' });
}

export function utilization(utilArgs: UtilizationArgs): string {
    const result = bignumber(utilArgs.totalBorrows).div(
        bignumber(utilArgs.cash).add(utilArgs.totalBorrows).sub(utilArgs.reserves)
    );
    return mathjs.format(result, { notation: 'fixed' });
}

export function borrowRatePerBlock(interestRateArgs: BorrowRatePerBlockArgs): string {
    let result: BigNumber;
    if (typeof interestRateArgs.utilization === 'object') {
        interestRateArgs.utilization = utilization(interestRateArgs.utilization).toString();
    }
    if (mathjs.compare(interestRateArgs.utilization, interestRateArgs.interestModel.kink) <= 0) {
        result = bignumber(interestRateArgs.utilization)
            .mul(interestRateArgs.interestModel.multiplierPerBlock)
            .plus(interestRateArgs.interestModel.baseRatePerBlock);
    } else {
        result = bignumber(interestRateArgs.utilization)
            .sub(interestRateArgs.interestModel.kink)
            .mul(interestRateArgs.interestModel.jumpMultiplierPerBlock)
            .add(
                bignumber(interestRateArgs.interestModel.kink)
                    .mul(interestRateArgs.interestModel.multiplierPerBlock)
                    .add(interestRateArgs.interestModel.baseRatePerBlock)
            );
    }

    return mathjs.format(result, { notation: 'fixed' });
}

export function supplyRatePerBlock(supplyRateArgs: SupplyRatePerBlockArgs): string {
    if (typeof supplyRateArgs.utilization === 'object') {
        supplyRateArgs.utilization = utilization(supplyRateArgs.utilization).toString();
    }
    const result = bignumber('1')
        .sub(supplyRateArgs.reserveFactor)
        .mul(borrowRatePerBlock(supplyRateArgs))
        .mul(supplyRateArgs.utilization);

    return mathjs.format(result, { notation: 'fixed' });
}

export function borrowApy(borrowApyArgs: BorrowApyArgs): string {
    if (typeof borrowApyArgs.borrowRatePerYear === 'object') {
        borrowApyArgs.borrowRatePerYear = borrowRatePerBlock(borrowApyArgs.borrowRatePerYear).toString();
    }
    const result = bignumber(borrowApyArgs.borrowRatePerYear).mul('5760').add('1').pow('365').sub('1');
    return mathjs.format(result, { notation: 'fixed' });
}

export function supplyApy(supplyApyArgs: SupplyApyArgs): string {
    if (typeof supplyApyArgs.supplyRatePerYear === 'object') {
        supplyApyArgs.supplyRatePerYear = supplyRatePerBlock(supplyApyArgs.supplyRatePerYear).toString();
    }
    const result = bignumber(supplyApyArgs.supplyRatePerYear).mul('5760').add('1').pow('365').sub('1');
    return mathjs.format(result, { notation: 'fixed' });
}

export function netApy(netApyArgs: NetApyArgs): string {
    let borrows = bignumber('0');
    let deposits = bignumber('0');
    let allDepositsValue = bignumber('0');
    for (let i = 0; i < netApyArgs.borrows.length; i++) {
        if (typeof netApyArgs.borrows[i].borrowApy === 'object') {
            netApyArgs.borrows[i].borrowApy = borrowApy(netApyArgs.borrows[i].borrowApy as BorrowApyArgs).toString();
        }
        if (typeof netApyArgs.borrows[i].value === 'object') {
            netApyArgs.borrows[i].value = borrowValue(netApyArgs.borrows[i].value as BorrowValueArgs).toString();
        }
        borrows = bignumber(netApyArgs.borrows[i].borrowApy as string)
            .mul(netApyArgs.borrows[i].value as string)
            .add(borrows);
    }
    for (let i = 0; i < netApyArgs.deposits.length; i++) {
        if (typeof netApyArgs.deposits[i].supplyApy === 'object') {
            netApyArgs.deposits[i].supplyApy = supplyApy(netApyArgs.deposits[i].supplyApy as SupplyApyArgs).toString();
        }
        if (typeof netApyArgs.deposits[i].value === 'object') {
            netApyArgs.deposits[i].value = depositValue(netApyArgs.deposits[i].value as DepositValueArgs).toString();
        }
        deposits = bignumber(netApyArgs.deposits[i].supplyApy as string)
            .mul(netApyArgs.deposits[i].value as string)
            .add(deposits);

        allDepositsValue = allDepositsValue.add(netApyArgs.deposits[i].value as string);
    }
    const result = deposits.sub(borrows).div(allDepositsValue);
    return mathjs.format(result, { notation: 'fixed' });
}

export function marketSize(marketSizeArgs: MarketSizeArgs): string {
    const result = bignumber(marketSizeArgs.exchangeRate).mul(marketSizeArgs.totalSupply);
    return mathjs.format(result, { notation: 'fixed' });
}

export function marketSizeValue(marketSizeArgs: MarketSizeValueArgs): string {
    const result = bignumber(marketSize(marketSizeArgs)).mul(marketSizeArgs.price);
    return mathjs.format(result, { notation: 'fixed' });
}

export function allMarketsSizeValue(marketSizeArgs: MarketSizeValueArgs[]): string {
    let result = bignumber('0');
    for (let i = 0; i < marketSizeArgs.length; i++) {
        result = result.add(marketSizeValue(marketSizeArgs[i]));
    }
    return mathjs.format(result, { notation: 'fixed' });
}

export function marketTotalBorrowed(marketTotalBorrowedArgs: MarketTotalBorrowedArgs): string {
    const result = bignumber(marketTotalBorrowedArgs.totalBorrows);
    return mathjs.format(result, { notation: 'fixed' });
}

export function marketTotalBorrowedValue(marketTotalBorrowedArgs: MarketTotalBorrowedValueArgs): string {
    const result = bignumber(marketTotalBorrowed(marketTotalBorrowedArgs)).mul(marketTotalBorrowedArgs.price);
    return mathjs.format(result, { notation: 'fixed' });
}

export function allMarketsBorrowedValue(marketTotalBorrowedArgs: MarketTotalBorrowedValueArgs[]): string {
    let result = bignumber('0');
    for (let i = 0; i < marketTotalBorrowedArgs.length; i++) {
        result = result.add(marketTotalBorrowedValue(marketTotalBorrowedArgs[i]));
    }
    return mathjs.format(result, { notation: 'fixed' });
}

export function loanToValue(loanToValueArgs: LoanToValueArgs): string {
    if (typeof loanToValueArgs.totalBorrows === 'object') {
        loanToValueArgs.totalBorrows = totalBorrowsValue(loanToValueArgs.totalBorrows).toString();
    }
    if (typeof loanToValueArgs.liquidity === 'object') {
        loanToValueArgs.liquidity = liquidity(loanToValueArgs.liquidity).toString();
    }
    const result = bignumber(loanToValueArgs.totalBorrows).div(loanToValueArgs.liquidity);
    return mathjs.format(result, { notation: 'fixed' });
}

export function amountAvaliableToWithdraw(avaliableToWithdrawArgs: LiquidityArgs, assetIndex: number): string {
    const result = bignumber(valueAvaliableToWithdraw(avaliableToWithdrawArgs, assetIndex)).div(
        avaliableToWithdrawArgs.assets[assetIndex].underlyingPrice
    );
    return mathjs.format(result, { notation: 'fixed' });
}

export function valueAvaliableToWithdraw(avaliableToWithdrawArgs: LiquidityArgs, assetIndex: number): string {
    const assetValue = depositValue({
        cTokenBalance: avaliableToWithdrawArgs.assets[assetIndex].cTokenBalance,
        marketExchangeRate: avaliableToWithdrawArgs.assets[assetIndex].exchangeRate,
        price: avaliableToWithdrawArgs.assets[assetIndex].underlyingPrice,
    });
    const result = bignumber(assetValue).sub(valueLockedByCopsAndBorrows(avaliableToWithdrawArgs, assetIndex));
    return mathjs.format(result, { notation: 'fixed' });
}

export function valueLockedByCopsAndBorrows(valueLockedArgs: LiquidityArgs, assetIndex: number): string {
    const availableLiquidityBalance = liquidity(valueLockedArgs);
    const assetClear = { ...valueLockedArgs.assets[assetIndex] };
    const assetValue = depositValue({
        cTokenBalance: assetClear.cTokenBalance,
        marketExchangeRate: assetClear.exchangeRate,
        price: assetClear.underlyingPrice,
    });
    assetClear.storedBorrowBalance = '0';
    const assetLiquidityClear = liquidity({ assets: [assetClear] });

    let minimalShareLock = bignumber(availableLiquidityBalance).sub(assetLiquidityClear).mul('-1');
    if (minimalShareLock.comparedTo('0') === -1) {
        minimalShareLock = bignumber('0');
    }
    if (minimalShareLock.comparedTo(assetValue) === 1) {
        minimalShareLock = bignumber(assetValue);
    }
    let lockedByCops = bignumber('0');
    for (let i = 0; i < assetClear.cProtections.length; i++) {
        lockedByCops = lockedByCops.add(assetClear.cProtections[i].lockedValue);
    }

    let result = lockedByCops;
    if (result.comparedTo(minimalShareLock) === -1) {
        result = minimalShareLock;
    }

    return mathjs.format(result, { notation: 'fixed' });
}
