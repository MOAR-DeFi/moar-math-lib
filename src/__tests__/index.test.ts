import {
    liquidity,
    utilization,
    borrowRatePerBlock,
    supplyApy,
    supplyRatePerBlock,
    borrowApy,
    netApy,
    capacityUsed,
    valueLockedByCopsAndBorrows,
    valueAvaliableToWithdraw,
    amountAvaliableToWithdraw,
    percentOf,
    min,
    max,
} from '../index';
import {
    calculateLiquidityBasicAccount,
    calculateLiquidityBasicAccountMultipleCOPsMultipleBorrows,
    calculateLiquidityBasicAccountNotEnteredMarkets,
    calculateLiquidityBasicAccountWithCOPMTM,
    calculateLiquidityBasicAccountWithCOPNotLocked,
    calculateLiquidityBasicAccountWithCOPs,
    calculateLiquidityBasicAccountWithCOPsWithBorrow,
    calculateLiquidityBasicAccountWithOutdatedCOP,
} from './testData';

describe('calculate liquidity', () => {
    it('calculates basic liquidy', () => {
        const result = liquidity(calculateLiquidityBasicAccount);
        expect(result).toEqual('3178');
    });

    it('calculates basic liquidy with no markets entered', () => {
        const result = liquidity(calculateLiquidityBasicAccountNotEnteredMarkets);
        expect(result).toEqual('0');
    });

    it('calculates liquidity with added cops', () => {
        const result = liquidity(calculateLiquidityBasicAccountWithCOPs);
        expect(result).toEqual('3928');
    });

    it('calculates liquidity with added cops but no locked value', () => {
        const result = liquidity(calculateLiquidityBasicAccountWithCOPNotLocked);
        expect(result).toEqual('3178');
    });

    it('calculates liquidity with added cop that is outdated', () => {
        const result = liquidity(calculateLiquidityBasicAccountWithOutdatedCOP);
        expect(result).toEqual('3178');
    });

    it('calculates liquidity with added cops with strike price lower than spot price', () => {
        const result = liquidity(calculateLiquidityBasicAccountWithCOPMTM);
        expect(result).toEqual('5011.333333333333333333333333333333333333333333333333333333333333');
    });

    it('calculates liquidity with added cops and with borrow', () => {
        const result = liquidity(calculateLiquidityBasicAccountWithCOPsWithBorrow);
        expect(result).toEqual('3808');
    });

    it('calculates liquidity with added cops and with many borrows', () => {
        const result = liquidity(calculateLiquidityBasicAccountMultipleCOPsMultipleBorrows);
        expect(result).toEqual('19438');
    });
});

describe('calculate assets', () => {
    it('calculates basic utilization', () => {
        const result = utilization({
            cash: '1.9',
            totalBorrows: '0.20000086',
            reserves: '0.00000017',
        });
        expect(result).toEqual('0.09523847346926347914676161368308883746128673891054769129623476457');
    });

    it('calculates basic borrowRatePerBlock', () => {
        const result = borrowRatePerBlock({
            utilization: {
                cash: '1.9',
                totalBorrows: '0.20000086',
                reserves: '0.00000017',
            },
            interestModel: {
                baseRatePerBlock: '0',
                multiplierPerBlock: '0.000000156047002019',
                jumpMultiplierPerBlock: '0.000000176390785701',
                kink: '0.8',
            },
        });
        expect(result).toEqual('0.00000001486167826174463606485767392771666184547777458111216144409933503');
    });

    it('calculates basic supplyRatePerBlock', () => {
        const result = supplyRatePerBlock({
            reserveFactor: '0.2',
            utilization: {
                cash: '1.9',
                totalBorrows: '0.20000086',
                reserves: '0.00000017',
            },
            interestModel: {
                baseRatePerBlock: '0',
                multiplierPerBlock: '0.000000156047002019',
                jumpMultiplierPerBlock: '0.000000176390785701',
                kink: '0.8',
            },
        });
        expect(result).toEqual('0.000000001132322840671917041459086592259323574003108361686708605901918606');
    });

    it('calculates basic borrowApy', () => {
        const result = borrowApy({
            borrowRatePerYear: {
                utilization: {
                    cash: '1.9',
                    totalBorrows: '0.20000086',
                    reserves: '0.00000017',
                },
                interestModel: {
                    baseRatePerBlock: '0',
                    multiplierPerBlock: '0.000000156047002019',
                    jumpMultiplierPerBlock: '0.000000176390785701',
                    kink: '0.8',
                },
            },
        });
        expect(result).toEqual('0.03173706756732639262273562318138959109128347595421286615485614');
    });

    it('calculates basic supplyApy', () => {
        const result = supplyApy({
            supplyRatePerYear: {
                reserveFactor: '0.2',
                utilization: {
                    cash: '1.9',
                    totalBorrows: '0.20000086',
                    reserves: '0.00000017',
                },
                interestModel: {
                    baseRatePerBlock: '0',
                    multiplierPerBlock: '0.000000156047002019',
                    jumpMultiplierPerBlock: '0.000000176390785701',
                    kink: '0.8',
                },
            },
        });
        expect(result).toEqual('0.002383423625891062052820507434919906886279626780808688715062579');
    });

    it('calculates basic netApy', () => {
        const result = netApy({
            deposits: [
                {
                    supplyApy: '0.2207',
                    value: '26.26',
                },
            ],
            borrows: [
                {
                    borrowApy: '0.1537',
                    value: '4.80',
                },
                {
                    borrowApy: '0.1698',
                    value: '5',
                },
            ],
        });
        expect(result).toEqual('0.1602750190403655750190403655750190403655750190403655750190403656');
    });

    it('calculates basic capacityUsed', () => {
        const result = capacityUsed(calculateLiquidityBasicAccountMultipleCOPsMultipleBorrows);
        expect(result).toEqual('0.01068811074918566775244299674267100977198697068403908794788273616');
    });

    it('calculates basic valueLockedByCopsAndBorrows', () => {
        const result = valueLockedByCopsAndBorrows(calculateLiquidityBasicAccountMultipleCOPsMultipleBorrows, 0);
        expect(result).toEqual('1500');
    });

    it('calculates basic valueAvaliableToWithdraw', () => {
        const result = valueAvaliableToWithdraw(calculateLiquidityBasicAccountMultipleCOPsMultipleBorrows, 0);
        expect(result).toEqual('3000');
    });

    it('calculates basic amountAvaliableToWithdraw', () => {
        const result = amountAvaliableToWithdraw(calculateLiquidityBasicAccountMultipleCOPsMultipleBorrows, 0);
        expect(result).toEqual('2');
    });

    it('calculates basic percentOf', () => {
        const result = percentOf('15', '60');
        expect(result).toEqual('25');
    });

    it('calculates basic min', () => {
        const result = min(['-14', '0', '45.5']);
        expect(result).toEqual('-14');
    });

    it('calculates basic max', () => {
        const result = max(['-14', '0', '45.5']);
        expect(result).toEqual('45.5');
    });
});
