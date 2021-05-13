import { liquidity, utilization, borrowRatePerBlock, supplyApy, supplyRatePerBlock, borrowApy, netApy, capacityUsed } from '../index';
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
        expect(result).toEqual(3178);
    });

    it('calculates basic liquidy with no markets entered', () => {
        const result = liquidity(calculateLiquidityBasicAccountNotEnteredMarkets);
        expect(result).toEqual(0);
    });

    it('calculates liquidity with added cops', () => {
        const result = liquidity(calculateLiquidityBasicAccountWithCOPs);
        expect(result).toEqual(3928);
    });

    it('calculates liquidity with added cops but no locked value', () => {
        const result = liquidity(calculateLiquidityBasicAccountWithCOPNotLocked);
        expect(result).toEqual(3178);
    });

    it('calculates liquidity with added cop that is outdated', () => {
        const result = liquidity(calculateLiquidityBasicAccountWithOutdatedCOP);
        expect(result).toEqual(3178);
    });

    it('calculates liquidity with added cops with strike price lower than spot price', () => {
        const result = liquidity(calculateLiquidityBasicAccountWithCOPMTM);
        expect(result).toEqual(5011.333333333333);
    });

    it('calculates liquidity with added cops and with borrow', () => {
        const result = liquidity(calculateLiquidityBasicAccountWithCOPsWithBorrow);
        expect(result).toEqual(3808);
    });

    it('calculates liquidity with added cops and with many borrows', () => {
        const result = liquidity(calculateLiquidityBasicAccountMultipleCOPsMultipleBorrows);
        expect(result).toEqual(19438);
    });
});

describe('calculate assets', () => {
    it('calculates basic utilization', () => {
        const result = utilization({
            cash: '1.9',
            totalBorrows: '0.20000086',
            reserves: '0.00000017',
        });
        expect(result).toEqual(0.09523847346926348);
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
                kink: '0.8'
            }
        });
        expect(result).toEqual(1.4861678261744636e-8);
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
                kink: '0.8'
            }
        });
        expect(result).toEqual(1.132322840671917e-9);
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
                    kink: '0.8'
                }
            }
        });
        expect(result).toEqual(0.03173706756738337);
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
                    kink: '0.8'
                }
            }
        });
        expect(result).toEqual(0.0023834236258646335);
    });

    it('calculates basic netApy', () => {
        const result = netApy({
            deposits: [{
                supplyApy: '0.2207',
                value: '26.26'
            }],
            borrows: [{
                borrowApy: '0.1537',
                value: '4.80'
            },{
                borrowApy: '0.1698',
                value: '5'
            }]
        });
        expect(result).toEqual(0.1602750190403656);
    });

    it('calculates basic capacityUsed', () => {
        const result = capacityUsed(calculateLiquidityBasicAccountMultipleCOPsMultipleBorrows);
        expect(result).toEqual(0.010688110749185667);
    });
    
});