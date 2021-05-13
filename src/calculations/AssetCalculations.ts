import { evaluate, compare } from 'mathjs';
import { DepositArgs, BorrowArgs, DepositValueArgs, BorrowValueArgs, UtilizationArgs, SupplyRatePerBlockArgs, BorrowRatePerBlockArgs, BorrowApyArgs, SupplyApyArgs, NetApyArgs } from '../interfaces/AssetInterfaces';

export function depositAmount(depositArgs: DepositArgs): string {
    return evaluate(`${depositArgs.cTokenBalance} * ${depositArgs.marketExchangeRate}`);
}

export function depositValue(depositArgs: DepositValueArgs): string {
    return evaluate(`${depositAmount(depositArgs)} * ${depositArgs.price}`);
}

export function borrowAmount(borrowArgs: BorrowArgs): string {
    return evaluate(`${borrowArgs.storedBorrowBalance} * ${borrowArgs.marketBorrowIndex} / ${borrowArgs.accountBorrowIndex}`);
}

export function borrowValue(borrowArgs: BorrowValueArgs): string {
    return evaluate(`${borrowAmount(borrowArgs)} * ${borrowArgs.price}`);
}

export function totalDepositsValue(totalDepositsArgs: DepositValueArgs[]): string {
    let result = '0';
    for(let i=0; i< totalDepositsArgs.length; i++) {
        result = evaluate(`${depositValue(totalDepositsArgs[i])} + ${result}`);
    }
    return result
}

export function totalBorrowsValue(totalBorrowsArgs: BorrowValueArgs[]): string {
    let result = '0';
    for(let i=0; i< totalBorrowsArgs.length; i++) {
        result = evaluate(`(${borrowValue(totalBorrowsArgs[i])}) + ${result}`);
    }
    return result
}

export function utilization(utilArgs: UtilizationArgs): string {
    return evaluate(`${utilArgs.totalBorrows} / (${utilArgs.cash} + ${utilArgs.totalBorrows} - ${utilArgs.reserves})`);
}

export function borrowRatePerBlock(interestRateArgs: BorrowRatePerBlockArgs): string{
    if(typeof interestRateArgs.utilization == 'object'){
        interestRateArgs.utilization = utilization(interestRateArgs.utilization)
    }
    if(compare(interestRateArgs.utilization, interestRateArgs.interestModel.kink) <= 0){
        return evaluate(`(${interestRateArgs.utilization} * ${interestRateArgs.interestModel.multiplierPerBlock} ) + ${interestRateArgs.interestModel.baseRatePerBlock}`)
    }
    else{
        return evaluate(`(${interestRateArgs.utilization} - ${interestRateArgs.interestModel.kink} ) * ${interestRateArgs.interestModel.jumpMultiplierPerBlock}
            + ((${interestRateArgs.interestModel.kink} * ${interestRateArgs.interestModel.multiplierPerBlock}) + ${interestRateArgs.interestModel.baseRatePerBlock})`)
    }
}

export function supplyRatePerBlock(supplyRateArgs: SupplyRatePerBlockArgs): string{
    if(typeof supplyRateArgs.utilization == 'object'){
        supplyRateArgs.utilization = utilization(supplyRateArgs.utilization)
    }
    return evaluate(`${supplyRateArgs.utilization } * ( ${borrowRatePerBlock(supplyRateArgs)} * (1 - ${supplyRateArgs.reserveFactor}))`)
}

export function borrowApy(borrowApyArgs: BorrowApyArgs): string{
    if(typeof borrowApyArgs.borrowRatePerYear == 'object'){
        borrowApyArgs.borrowRatePerYear = borrowRatePerBlock(borrowApyArgs.borrowRatePerYear)
    }
    return evaluate(`((${borrowApyArgs.borrowRatePerYear} * 5760 + 1) ^ 365) - 1`)
}

export function supplyApy(supplyApyArgs: SupplyApyArgs): string{
    if(typeof supplyApyArgs.supplyRatePerYear == 'object'){
        supplyApyArgs.supplyRatePerYear = supplyRatePerBlock(supplyApyArgs.supplyRatePerYear)
    }
    return evaluate(`((${supplyApyArgs.supplyRatePerYear} * 5760 + 1) ^ 365) - 1`)
}

export function netApy(netApyArgs: NetApyArgs): string{
    let borrows = '0'
    let deposits = '0'
    let totalDepositsValue = '0'
    for(let i=0; i< netApyArgs.borrows.length; i++) {
        if(typeof netApyArgs.borrows[i].borrowApy == 'object'){
            netApyArgs.borrows[i].borrowApy = borrowApy(netApyArgs.borrows[i].borrowApy as BorrowApyArgs)
        }
        if(typeof netApyArgs.borrows[i].value == 'object'){
            netApyArgs.borrows[i].value = borrowValue(netApyArgs.borrows[i].value as BorrowValueArgs)
        }
        borrows = evaluate(`${netApyArgs.borrows[i].borrowApy} * ${netApyArgs.borrows[i].value} + ${borrows}`)
    }
    for(let i=0; i< netApyArgs.deposits.length; i++) {
        if(typeof netApyArgs.deposits[i].supplyApy == 'object'){
            netApyArgs.deposits[i].supplyApy = supplyApy(netApyArgs.deposits[i].supplyApy as SupplyApyArgs)
        }
        if(typeof netApyArgs.deposits[i].value == 'object'){
            netApyArgs.deposits[i].value = depositValue(netApyArgs.deposits[i].value as DepositValueArgs)
        }
        deposits = evaluate(`${netApyArgs.deposits[i].supplyApy} * ${netApyArgs.deposits[i].value} + ${deposits}`)
        totalDepositsValue = evaluate(`${netApyArgs.deposits[i].value} + ${totalDepositsValue}`)
    }
    return evaluate(`(${deposits} - ${borrows}) / ${totalDepositsValue}`)
}

// export function marketSize(marketSizeArgs: MarketSizeArgs): string{

// }
